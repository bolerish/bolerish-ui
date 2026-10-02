import { mkdir, readFile, writeFile } from "node:fs/promises";
import { basename, dirname, isAbsolute, relative, resolve } from "node:path";
import { createInterface } from "node:readline/promises";

import {
  defaultConfig,
  getDefaultAliases,
  hasConfig,
  readConfig,
  writeConfig,
  resolveConfigAlias,
} from "./config.js";
export { getMissingDependencies } from "./dependencies.js";
import type { CliOptions } from "./arguments.js";
import { getMissingDependencies, installDependencies } from "./dependencies.js";
import { applyInitialization, prepareInitialization } from "./init.js";
import { resolveComponent } from "./registry.js";
import { parseSource, removeReducedMotionStyles } from "./source.js";

export type AddOptions = CliOptions & {
  /** @deprecated Use skip-dependencies. */
  skipDependencyInstall?: boolean;
};

function isNotFoundError(error: unknown) {
  return typeof error === "object" && error !== null && "code" in error && error.code === "ENOENT";
}

async function askYesNo(question: string, defaultValue: boolean) {
  if (!process.stdin.isTTY || !process.stdout.isTTY) return defaultValue;

  const readline = createInterface({ input: process.stdin, output: process.stdout });
  const defaultLabel = defaultValue ? "Y/n" : "y/N";

  try {
    const answer = (await readline.question(`${question} (${defaultLabel}) `)).trim().toLowerCase();
    if (!answer) return defaultValue;
    return answer === "y" || answer === "yes";
  } finally {
    readline.close();
  }
}

async function writeSource(source: string, targetPath: string) {
  try {
    const currentSource = await readFile(targetPath, "utf8");
    if (currentSource === source) return;
  } catch (error) {
    if (!isNotFoundError(error)) throw error;
  }

  await mkdir(dirname(targetPath), { recursive: true });
  await writeFile(targetPath, source, "utf8");
}

function resolveTargetPath(uiDirectory: string, filePath: string) {
  if (isAbsolute(filePath)) throw new Error(`Registry file path must be relative: ${filePath}`);

  const targetPath = resolve(uiDirectory, filePath);
  const relativePath = relative(uiDirectory, targetPath);
  if (relativePath === ".." || relativePath.startsWith(`..${"/"}`) || isAbsolute(relativePath)) {
    throw new Error(`Registry file path must stay inside the UI directory: ${filePath}`);
  }

  return targetPath;
}

function replaceTokenImport(source: string, stylesAlias: string) {
  return source.replaceAll("@nuee/tokens/semantic.stylex", `${stylesAlias}/semantic.stylex`);
}

export async function add(
  projectDirectory: string,
  componentNames: string | readonly string[],
  options: AddOptions = {},
) {
  const componentNameList = [
    ...new Set(typeof componentNames === "string" ? [componentNames] : componentNames),
  ];
  if (componentNameList.length === 0 || componentNameList.some((componentName) => !componentName)) {
    throw new Error("Enter at least one component name to add.");
  }

  const shouldInitialize = !(await hasConfig(projectDirectory));
  let config;
  if (shouldInitialize) {
    const defaultAliases = await getDefaultAliases(projectDirectory);
    config = {
      ...defaultConfig,
      aliases: {
        ui: options.ui ?? defaultAliases.ui,
        styles: options.styles ?? options.tokens ?? defaultAliases.styles,
      },
    };
  } else {
    config = await readConfig(projectDirectory);
  }
  const resolvedList = await Promise.all(componentNameList.map(resolveComponent));
  await resolveConfigAlias(projectDirectory, config.aliases.styles, "aliases.styles");
  const uiDirectory = await resolveConfigAlias(projectDirectory, config.aliases.ui, "aliases.ui");
  const sources: { source: string; targetPath: string }[] = [];
  for (const resolved of resolvedList) {
    for (const file of resolved.files) {
      const isScript = /\.[cm]?[jt]sx?$/.test(file.path);
      let source = replaceTokenImport(file.content, config.aliases.styles);
      if (isScript && !config.accessibility.respectReducedMotion && !config.theme) {
        source = removeReducedMotionStyles(source);
      }
      if (isScript) parseSource(source);
      sources.push({ source, targetPath: resolveTargetPath(uiDirectory, file.path) });
    }
  }
  const externalDependencies = await getMissingDependencies(projectDirectory, [
    ...new Set(resolvedList.flatMap((resolved) => resolved.externalDependencies)),
  ]);
  const skipDependencies = options.skipDependencyInstall || options["skip-dependencies"];
  const initialization = shouldInitialize
    ? await prepareInitialization(projectDirectory, {
        ...options,
        defaults: true,
        ui: config.aliases.ui,
        styles: config.aliases.styles,
        "skip-dependencies": skipDependencies,
      })
    : undefined;
  const overwriteFileNames: string[] = [];

  for (const { source, targetPath } of sources) {
    try {
      if ((await readFile(targetPath, "utf8")) !== source)
        overwriteFileNames.push(basename(targetPath));
    } catch (error) {
      if (!isNotFoundError(error)) throw error;
    }
  }

  if (overwriteFileNames.length > 0 && !options["dry-run"]) {
    const fileLabel = overwriteFileNames.join(", ");
    const shouldOverwrite = await askYesNo(
      `Overwrite ${overwriteFileNames.length} existing file${overwriteFileNames.length === 1 ? "" : "s"} (${fileLabel})?`,
      false,
    );
    if (!shouldOverwrite) throw new Error("Component installation canceled.");
  }

  if (initialization && !options["dry-run"]) {
    await applyInitialization(projectDirectory, initialization);
  }
  for (const { source, targetPath } of sources) {
    if (options["dry-run"]) continue;
    await writeSource(source, targetPath);
  }

  const shouldInstallDependencies =
    externalDependencies.length > 0 && !skipDependencies && !options["dry-run"];

  if (shouldInstallDependencies) {
    await installDependencies(projectDirectory, externalDependencies);
  }

  const primaryExportList = resolvedList.map((resolved) => resolved.primaryExport);
  if (options["dry-run"]) {
    console.log(`✔ Would add ${primaryExportList.join(", ")}.`);
    return;
  }

  await writeConfig(projectDirectory, {
    ...(initialization?.config ?? config),
    components: Object.assign(
      {},
      config.components,
      ...resolvedList.map((item) => item.componentVersions),
    ),
  });

  console.log(`✔ Added ${primaryExportList.join(", ")}.`);
}
