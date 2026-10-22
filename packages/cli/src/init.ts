import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join, relative, sep } from "node:path";
import { createInterface } from "node:readline/promises";

import { getFoundationFiles, registryVersion } from "@bolerish/registry";

import type { CliOptions } from "./arguments.js";
import {
  defaultConfig,
  getDefaultAliases,
  hasConfig,
  readConfig,
  type BolerishConfig,
  resolveConfigAlias,
  writeConfig,
} from "./config.js";
import { getMissingDependencies, installDependencies } from "./dependencies.js";
import { configureVite } from "./source.js";
import { prepareThemeFiles } from "./theme.js";

async function ask(
  question: string,
  defaultValue: string,
  readline: ReturnType<typeof createInterface>,
) {
  const answer = await readline.question(`${question} (${defaultValue}) `);
  return answer.trim() || defaultValue;
}

async function findViteConfig(projectDirectory: string) {
  const configFileNames = [
    "vite.config.ts",
    "vite.config.mts",
    "vite.config.js",
    "vite.config.mjs",
  ];

  for (const fileName of configFileNames) {
    const path = join(projectDirectory, fileName);
    try {
      return { path, source: await readFile(path, "utf8") };
    } catch (error) {
      if (
        typeof error === "object" &&
        error !== null &&
        "code" in error &&
        error.code === "ENOENT"
      ) {
        continue;
      }
      throw error;
    }
  }

  return undefined;
}

function getRelativeImportPath(from: string, to: string) {
  const path = relative(dirname(from), to).split(sep).join("/");
  return path.startsWith(".") ? path : `./${path}`;
}

type PlannedFile = { path: string; source: string; flag: "w" | "wx" };

async function prepareFoundationFiles(tokenDirectory: string, refreshLegacyTokens: boolean) {
  const files: PlannedFile[] = [];
  let isCurrentVersion = true;
  for (const file of await getFoundationFiles()) {
    const path = join(tokenDirectory, file.name);
    let currentSource: string;
    try {
      currentSource = await readFile(path, "utf8");
    } catch (error) {
      if (
        typeof error !== "object" ||
        error === null ||
        !("code" in error) ||
        error.code !== "ENOENT"
      )
        throw error;
      let source = file.content;
      if (file.name.startsWith("tokens/")) {
        try {
          source = await readFile(join(tokenDirectory, file.name.slice("tokens/".length)), "utf8");
          if (
            refreshLegacyTokens &&
            file.name === "tokens/semantic.stylex.ts" &&
            source.includes('bgCanvas: "initial"') &&
            source.includes('overlay: "initial"')
          )
            source = file.content;
          if (source !== file.content) isCurrentVersion = false;
        } catch (legacyError) {
          if (
            typeof legacyError !== "object" ||
            legacyError === null ||
            !("code" in legacyError) ||
            legacyError.code !== "ENOENT"
          )
            throw legacyError;
        }
      }
      files.push({ path, source, flag: "wx" });
      continue;
    }
    if (
      refreshLegacyTokens &&
      file.name === "tokens/semantic.stylex.ts" &&
      currentSource.includes('bgCanvas: "initial"') &&
      currentSource.includes('overlay: "initial"')
    ) {
      files.push({ path, source: file.content, flag: "w" });
    } else if (currentSource !== file.content) {
      isCurrentVersion = false;
    }
  }
  return { files, isCurrentVersion };
}

async function prepareResetImport(
  projectDirectory: string,
  tokenDirectory: string,
): Promise<PlannedFile | undefined> {
  const path = join(projectDirectory, "src/index.css");
  const resetImport = `@import "${getRelativeImportPath(path, join(tokenDirectory, "reset.css"))}";`;
  const preferencesImport = `@import "${getRelativeImportPath(path, join(tokenDirectory, "preferences.css"))}";`;
  let source: string;
  try {
    source = await readFile(path, "utf8");
  } catch (error) {
    if (
      typeof error !== "object" ||
      error === null ||
      !("code" in error) ||
      error.code !== "ENOENT"
    )
      throw error;
    return { path, source: `${resetImport}\n${preferencesImport}\n`, flag: "wx" };
  }
  const missing = [resetImport, preferencesImport].filter((line) => !source.includes(line));
  if (!missing.length) return undefined;
  return { path, source: `${missing.join("\n")}\n\n${source}`, flag: "w" };
}

export async function prepareInitialization(projectDirectory: string, options: CliOptions) {
  if ((await hasConfig(projectDirectory)) && !options.force) {
    throw new Error("A configuration already exists. Use --force to migrate or refresh it.");
  }

  let previousConfig: BolerishConfig | undefined;
  if (await hasConfig(projectDirectory)) {
    try {
      previousConfig = await readConfig(projectDirectory);
    } catch (error) {
      if (!(error instanceof Error) || !error.message.includes("uses an older format")) throw error;
    }
  }

  const isInteractive = process.stdin.isTTY && process.stdout.isTTY && !options.defaults;
  const readline = isInteractive
    ? createInterface({ input: process.stdin, output: process.stdout })
    : null;

  try {
    const defaultAliases = await getDefaultAliases(projectDirectory);
    const uiAlias =
      options.ui ??
      previousConfig?.aliases.ui ??
      (readline
        ? await ask("Enter the UI import alias.", defaultAliases.ui, readline)
        : defaultAliases.ui);
    const stylesAlias =
      options.styles ??
      previousConfig?.aliases.styles ??
      options.tokens ??
      (readline
        ? await ask("Enter the styles import alias.", defaultAliases.styles, readline)
        : defaultAliases.styles);
    const tokenDirectory = await resolveConfigAlias(
      projectDirectory,
      stylesAlias,
      "aliases.styles",
    );
    await resolveConfigAlias(projectDirectory, uiAlias, "aliases.ui");
    const viteConfig = options.vite ? await findViteConfig(projectDirectory) : undefined;
    if (options.vite && !viteConfig) {
      throw new Error("Could not find a Vite config file.");
    }
    const configuredVite = viteConfig ? configureVite(viteConfig.source) : undefined;
    const foundation = await prepareFoundationFiles(tokenDirectory, Boolean(options.force));
    const files = [
      ...foundation.files,
      ...(await prepareThemeFiles(tokenDirectory, previousConfig?.theme)),
    ];
    let version: string | undefined;
    if (foundation.isCurrentVersion) {
      version = registryVersion;
    } else if (foundation.files.length === 0 && previousConfig?.aliases.styles === stylesAlias) {
      version = previousConfig.version;
    }
    if (viteConfig && configuredVite !== undefined) {
      const resetFile = await prepareResetImport(projectDirectory, tokenDirectory);
      if (resetFile) files.push(resetFile);
      files.push({ path: viteConfig.path, source: configuredVite, flag: "w" });
    }
    const runtimeDependencies = await getMissingDependencies(projectDirectory, [
      "@stylexjs/stylex",
    ]);
    const buildDependencies = await getMissingDependencies(projectDirectory, [
      "@stylexjs/unplugin",
    ]);
    return {
      files,
      runtimeDependencies: options["skip-dependencies"] ? [] : runtimeDependencies,
      buildDependencies: options["skip-dependencies"] || !options.vite ? [] : buildDependencies,
      config: {
        ...(version !== undefined ? { version } : {}),
        ...(previousConfig?.aliases.ui === uiAlias && previousConfig.components
          ? { components: previousConfig.components }
          : {}),
        ...(previousConfig?.theme ? { theme: previousConfig.theme } : {}),
        accessibility: previousConfig?.accessibility ?? defaultConfig.accessibility,
        aliases: { ui: uiAlias, styles: stylesAlias },
      },
    };
  } finally {
    readline?.close();
  }
}

export async function applyInitialization(
  projectDirectory: string,
  plan: Awaited<ReturnType<typeof prepareInitialization>>,
) {
  await installDependencies(projectDirectory, plan.runtimeDependencies);
  await installDependencies(projectDirectory, plan.buildDependencies, true);
  for (const file of plan.files) {
    await mkdir(dirname(file.path), { recursive: true });
    await writeFile(file.path, file.source, { encoding: "utf8", flag: file.flag });
  }
  await writeConfig(projectDirectory, plan.config);
}

export async function init(projectDirectory: string, options: CliOptions, shouldLog = true) {
  const plan = await prepareInitialization(projectDirectory, options);
  await applyInitialization(projectDirectory, plan);
  if (shouldLog) console.log("✔ Initialized bolerish/ui.");
}
