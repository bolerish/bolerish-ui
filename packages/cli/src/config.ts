import { access, readFile, writeFile } from "node:fs/promises";
import { isAbsolute, join, relative, resolve } from "node:path";

import { createPathsMatcher, parseTsconfig } from "get-tsconfig";
import { parse, type ParseError } from "jsonc-parser";

export const configFileName = ".nuee.json";

export type NueeTheme = {
  density?: "default" | "compact" | number;
  unit?: "rem" | "px";
  motion?: "system" | "off";
  fonts?: { body?: string; heading?: string };
};

export type NueeConfig = {
  theme?: NueeTheme;
  version?: string;
  components?: Record<string, string | null>;
  accessibility: {
    respectReducedMotion: boolean;
  };
  aliases: {
    ui: string;
    styles: string;
  };
};

export const defaultConfig: NueeConfig = {
  accessibility: {
    respectReducedMotion: true,
  },
  aliases: {
    ui: "@/components/ui",
    styles: "@/styles",
  },
};

function getAliasPrefix(paths: Record<string, string[]> | undefined) {
  if (!paths) return undefined;

  for (const [pattern, targetList] of Object.entries(paths)) {
    if (!pattern.endsWith("*")) continue;

    const hasProjectRootTarget = targetList.some((target) =>
      ["*", "./*", "src/*", "./src/*"].includes(target.replaceAll("\\", "/")),
    );
    if (hasProjectRootTarget) return pattern.slice(0, -1);
  }

  return undefined;
}

export async function hasConfig(projectDirectory: string) {
  try {
    await access(resolve(projectDirectory, configFileName));
    return true;
  } catch (error) {
    if (!isNotFoundError(error)) throw error;
    try {
      await access(resolve(projectDirectory, "nuee.json"));
    } catch (legacyError) {
      if (!isNotFoundError(legacyError)) throw legacyError;
      return false;
    }
    throw new Error(
      "Rename nuee.json to .nuee.json, then run `nuee init --force` to enable completions.",
    );
  }
}

function ensureRelativePath(projectDirectory: string, path: string, name: string) {
  const absolutePath = resolve(projectDirectory, path);
  const relativePath = relative(projectDirectory, absolutePath);
  if (isAbsolute(relativePath) || relativePath.startsWith("..")) {
    throw new Error(`${name} must be inside the project directory.`);
  }
}

export function validateConfig(config: unknown): NueeConfig {
  if (typeof config !== "object" || config === null || Array.isArray(config)) {
    throw new Error("Configure .nuee.json as an object.");
  }
  const candidate = config as {
    accessibility?: { respectReducedMotion?: unknown };
    aliases?: unknown;
    version?: unknown;
    components?: unknown;
    paths?: { ui?: unknown; tokens?: unknown };
    tokens?: unknown;
    theme?: unknown;
  };
  if (candidate.paths || candidate.tokens) {
    throw new Error(
      "This .nuee.json uses an older format. Run `nuee init --force` to create alias-based configuration.",
    );
  }
  if (!candidate.aliases || typeof candidate.aliases !== "object") {
    throw new Error("Configure aliases.");
  }
  const aliases = candidate.aliases as { ui?: unknown; styles?: unknown };
  if (typeof aliases.ui !== "string" || !aliases.ui.trim()) {
    throw new Error("Configure aliases.ui.");
  }
  if (typeof aliases.styles !== "string" || !aliases.styles.trim()) {
    throw new Error("Configure aliases.styles.");
  }
  if (
    candidate.accessibility !== undefined &&
    (candidate.accessibility === null ||
      typeof candidate.accessibility !== "object" ||
      typeof candidate.accessibility.respectReducedMotion !== "boolean")
  ) {
    throw new Error("Configure accessibility.respectReducedMotion as a boolean.");
  }
  if (
    candidate.version !== undefined &&
    (typeof candidate.version !== "string" || !candidate.version.trim())
  ) {
    throw new Error("Configure version as a non-empty string.");
  }
  if (
    candidate.components !== undefined &&
    (candidate.components === null ||
      typeof candidate.components !== "object" ||
      Array.isArray(candidate.components) ||
      Object.entries(candidate.components).some(
        ([name, version]) =>
          !name.trim() || (version !== null && (typeof version !== "string" || !version.trim())),
      ))
  ) {
    throw new Error("Configure components as component names mapped to versions or null.");
  }
  let theme: NueeTheme | undefined;
  if (candidate.theme !== undefined) {
    if (!candidate.theme || typeof candidate.theme !== "object" || Array.isArray(candidate.theme)) {
      throw new Error("Configure theme as an object.");
    }
    const value = candidate.theme as Record<string, unknown>;
    if (
      value.density !== undefined &&
      value.density !== "default" &&
      value.density !== "compact" &&
      !(
        typeof value.density === "number" &&
        Number.isFinite(value.density) &&
        value.density > 0 &&
        value.density <= 2
      )
    ) {
      throw new Error(
        "Configure theme.density as default, compact or a number greater than 0 and at most 2.",
      );
    }
    if (value.unit !== undefined && value.unit !== "rem" && value.unit !== "px") {
      throw new Error("Configure theme.unit as rem or px.");
    }
    if (value.motion !== undefined && value.motion !== "system" && value.motion !== "off") {
      throw new Error("Configure theme.motion as system or off.");
    }
    let fonts: NueeTheme["fonts"];
    if (value.fonts !== undefined) {
      if (!value.fonts || typeof value.fonts !== "object" || Array.isArray(value.fonts)) {
        throw new Error("Configure theme.fonts as an object.");
      }
      fonts = {};
      const entries = value.fonts as Record<string, unknown>;
      for (const role of ["body", "heading"] as const) {
        const font = entries[role];
        if (font === undefined) continue;
        if (typeof font !== "string" || !font.trim() || /(?:[{};\n\r]|\/\*|\*\/)/.test(font)) {
          throw new Error(`Configure theme.fonts.${role} as a CSS font-family list.`);
        }
        fonts[role] = font.trim();
      }
    }
    theme = {
      ...(value.unit !== undefined ? { unit: value.unit as NueeTheme["unit"] } : {}),
      ...(value.density !== undefined ? { density: value.density as NueeTheme["density"] } : {}),
      ...(value.motion !== undefined ? { motion: value.motion as NueeTheme["motion"] } : {}),
      ...(fonts !== undefined ? { fonts } : {}),
    };
  }
  const respectReducedMotion =
    typeof candidate.accessibility?.respectReducedMotion === "boolean"
      ? candidate.accessibility.respectReducedMotion
      : true;

  return {
    ...(candidate.version !== undefined ? { version: candidate.version as string } : {}),
    ...(candidate.components !== undefined
      ? { components: candidate.components as Record<string, string | null> }
      : {}),
    ...(theme !== undefined ? { theme } : {}),
    accessibility: {
      respectReducedMotion,
    },
    aliases: {
      ui: aliases.ui,
      styles: aliases.styles,
    },
  };
}

function isNotFoundError(error: unknown) {
  return typeof error === "object" && error !== null && "code" in error && error.code === "ENOENT";
}

export async function readConfig(projectDirectory: string) {
  await hasConfig(projectDirectory);
  const configPath = resolve(projectDirectory, configFileName);

  try {
    const config = JSON.parse(await readFile(configPath, "utf8"));
    return validateConfig(config);
  } catch (error) {
    if (isNotFoundError(error)) {
      throw new Error(".nuee.json was not found. Run `nuee init` first.");
    }
    throw error;
  }
}

export async function writeConfig(projectDirectory: string, config: NueeConfig) {
  const validatedConfig = validateConfig(config);
  const configPath = resolve(projectDirectory, configFileName);
  await writeFile(
    configPath,
    `${JSON.stringify({ $schema: "./node_modules/@nuee/ui/configuration_schema.json", ...validatedConfig }, null, 2)}\n`,
    "utf8",
  );
  return configPath;
}

export function resolveConfigPath(projectDirectory: string, path: string, name: string) {
  ensureRelativePath(projectDirectory, path, name);
  return resolve(projectDirectory, path);
}

async function readTsConfig(projectDirectory: string) {
  for (const fileName of ["tsconfig.json", "jsconfig.json"]) {
    const path = resolve(projectDirectory, fileName);
    try {
      const source = await readFile(path, "utf8");
      const errors: ParseError[] = [];
      const value: unknown = parse(source, errors, { allowTrailingComma: true });
      if (errors.length || !value || typeof value !== "object" || Array.isArray(value)) {
        throw new Error(`Invalid configuration: ${fileName}`);
      }
      return { path, config: parseTsconfig(path) };
    } catch (error) {
      if (!isNotFoundError(error)) throw error;
    }
  }
  return undefined;
}

export async function getDefaultAliases(projectDirectory: string) {
  const tsConfig = await readTsConfig(projectDirectory);
  const aliasPrefix = getAliasPrefix(tsConfig?.config.compilerOptions?.paths);
  if (!aliasPrefix) return defaultConfig.aliases;

  return {
    styles: `${aliasPrefix}styles`,
    ui: `${aliasPrefix}components/ui`,
  };
}

export async function resolveConfigAlias(projectDirectory: string, alias: string, name: string) {
  const tsConfig = await readTsConfig(projectDirectory);
  const paths = tsConfig?.config.compilerOptions?.paths;
  // Only explicit paths mappings override the conventional @/src fallback.
  const hasMatchingPath =
    paths &&
    Object.keys(paths).some((pattern) => {
      const wildcard = pattern.indexOf("*");
      if (wildcard === -1) return pattern === alias;
      return (
        alias.startsWith(pattern.slice(0, wildcard)) && alias.endsWith(pattern.slice(wildcard + 1))
      );
    });
  if (tsConfig && hasMatchingPath) {
    const targets = createPathsMatcher(tsConfig)?.(alias);
    if (targets?.[0]) return resolveConfigPath(projectDirectory, targets[0], name);
  } else if (alias.startsWith("@/")) {
    return resolveConfigPath(projectDirectory, join("src", alias.slice(2)), name);
  }
  throw new Error(
    `Could not resolve ${name} (${alias}). Add it to tsconfig.json or jsconfig.json compilerOptions.paths.`,
  );
}

export async function resolveTokenAlias(projectDirectory: string, stylesAlias: string) {
  const directory = await resolveConfigAlias(projectDirectory, stylesAlias, "aliases.styles");
  for (const child of ["tokens", ""]) {
    try {
      await access(join(directory, child, "semantic.stylex.ts"));
      return child ? `${stylesAlias}/${child}` : stylesAlias;
    } catch (error) {
      if (!isNotFoundError(error)) throw error;
    }
  }
  return `${stylesAlias}/tokens`;
}
