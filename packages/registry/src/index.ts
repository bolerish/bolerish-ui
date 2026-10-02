import { readFile } from "node:fs/promises";

export const registryVersion: string = JSON.parse(
  await readFile(new URL("../package.json", import.meta.url), "utf8"),
).version;

export { registryItems } from "./items.js";

export type RegistryFile = {
  content: string;
  path: string;
};

export type RegistryItem = {
  dependencies: readonly string[];
  files: readonly RegistryFile[];
  name: string;
  primaryExport: string;
  registryDependencies: readonly string[];
};

export type TokenFile = {
  content: string;
  name: string;
};

export type FoundationFile = {
  content: string;
  name: string;
};

export function parseRegistryItem(value: unknown): RegistryItem {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    throw new Error("Invalid registry item: expected an object.");
  }
  const item = value as Record<string, unknown>;
  const { name, primaryExport } = item;
  if (typeof name !== "string" || name.length === 0) {
    throw new Error("Invalid registry item: name must be a non-empty string.");
  }
  if (typeof primaryExport !== "string" || primaryExport.length === 0) {
    throw new Error("Invalid registry item: primaryExport must be a non-empty string.");
  }
  const dependencies = parseDependencies(item.dependencies, "dependencies");
  const registryDependencies = parseDependencies(item.registryDependencies, "registryDependencies");
  if (!Array.isArray(item.files)) {
    throw new Error("Invalid registry item: files must be an array.");
  }
  const files = item.files.map((file: unknown, index): RegistryFile => {
    if (typeof file !== "object" || file === null || Array.isArray(file)) {
      throw new Error(`Invalid registry item: files[${index}] must be an object.`);
    }
    const entry = file as Record<string, unknown>;
    if (typeof entry.path !== "string") {
      throw new Error(`Invalid registry item: files[${index}].path must be a string.`);
    }
    if (typeof entry.content !== "string") {
      throw new Error(`Invalid registry item: files[${index}].content must be a string.`);
    }
    return { path: entry.path, content: entry.content };
  });
  return {
    name,
    primaryExport,
    dependencies,
    registryDependencies,
    files,
  };
}

function parseDependencies(
  value: unknown,
  field: "dependencies" | "registryDependencies",
): string[] {
  if (!Array.isArray(value)) {
    throw new Error(`Invalid registry item: ${field} must be an array.`);
  }
  return value.map((entry: unknown, index) => {
    if (typeof entry !== "string" || entry.length === 0) {
      throw new Error(`Invalid registry item: ${field}[${index}] must be a non-empty string.`);
    }
    return entry;
  });
}

export function isRegistryItem(value: unknown): value is RegistryItem {
  try {
    parseRegistryItem(value);
    return true;
  } catch {
    return false;
  }
}

export async function getRegistryItem(name: string): Promise<RegistryItem> {
  const file = new URL(`./items/${name}.json`, import.meta.url);

  try {
    const item: unknown = JSON.parse(await readFile(file, "utf8"));
    return parseRegistryItem(item);
  } catch (error) {
    if (typeof error === "object" && error !== null && "code" in error && error.code === "ENOENT") {
      throw new Error(`Unknown component: ${name}`);
    }
    throw error;
  }
}

export async function getTokenFiles(): Promise<TokenFile[]> {
  const names = [
    "color-palette.stylex.ts",
    "semantic.stylex.ts",
    "themes.stylex.ts",
    "density.stylex.ts",
  ];

  return Promise.all(
    names.map(async (name) => ({
      content: await readFile(new URL(`./tokens/${name}`, import.meta.url), "utf8"),
      name,
    })),
  );
}

export async function getFoundationFiles(): Promise<FoundationFile[]> {
  const tokenFiles = await getTokenFiles();
  const resetFile = {
    content: await readFile(new URL("./styles/reset.css", import.meta.url), "utf8"),
    name: "reset.css",
  };

  return [...tokenFiles.map((file) => ({ ...file, name: `tokens/${file.name}` })), resetFile];
}

export const dependencyVersions = {
  "@base-ui/react": "^1.7.0",
  "@daypicker/react": "^10.0.1",
  "@phosphor-icons/react": "^2.1.10",
  "@stylexjs/stylex": "^0.19.0",
  "embla-carousel-react": "^8.6.0",
};
