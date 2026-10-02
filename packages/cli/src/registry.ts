import {
  dependencyVersions,
  registryVersion,
  getRegistryItem,
  parseRegistryItem,
  type RegistryItem,
} from "@nuee/registry";

async function readRegistryItem(name: string): Promise<RegistryItem> {
  if (!URL.canParse(name)) return getRegistryItem(name);
  const response = await fetch(name);
  if (!response.ok) throw new Error(`Could not load the registry: ${response.status}`);
  const value: unknown = await response.json();
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error("This is not a valid @nuee/ui registry item.");
  }
  const candidate = value as Record<string, unknown>;
  const item = {
    ...candidate,
    name: candidate.name === undefined ? name : candidate.name,
    primaryExport:
      candidate.primaryExport === undefined
        ? (candidate.name ?? "Component")
        : candidate.primaryExport,
    registryDependencies:
      candidate.registryDependencies === undefined ? [] : candidate.registryDependencies,
  };
  return parseRegistryItem(item);
}

export async function resolveComponent(name: string) {
  const visited = new Set<string>();
  const components = new Set<string>();
  const componentVersions: Record<string, string | null> = {};
  const dependencies = new Set<string>();
  const files = new Map<string, RegistryItem["files"][number]>();
  const root = await readRegistryItem(name);

  async function visit(key: string, item?: RegistryItem) {
    if (visited.has(key)) return;
    visited.add(key);
    const current = item ?? (await readRegistryItem(key));
    components.add(current.name);
    componentVersions[current.name] = URL.canParse(key) ? null : registryVersion;
    for (const file of current.files) files.set(file.path, file);
    for (const dependency of current.dependencies) dependencies.add(dependency);
    for (const dependency of current.registryDependencies) await visit(dependency);
  }
  await visit(name, root);
  return {
    components: [...components],
    componentVersions,
    files: [...files.values()],
    externalDependencies: [...dependencies].map(
      (dependency) =>
        `${dependency}@${(dependencyVersions as Record<string, string>)[dependency] ?? "latest"}`,
    ),
    primaryExport: root.primaryExport,
  };
}
