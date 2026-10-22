import { registryItems } from "@bolerish/registry";

function getComponentNames() {
  return Object.keys(registryItems).sort();
}

export function list() {
  console.log(getComponentNames().join("\n"));
}

export function docs(componentName: string | undefined) {
  if (!componentName) {
    list();
    return;
  }

  const item = registryItems[componentName as keyof typeof registryItems];
  if (!item) throw new Error(`Unknown component: ${componentName}`);

  console.log(`${componentName}\n`);
  console.log(`Install: pnpm dlx @bolerish/ui add ${componentName}`);
  console.log(`Files:\n${item.files.map((file) => `  ${file}`).join("\n")}`);
  console.log(
    `Dependencies:\n${item.dependencies.map((dependency) => `  ${dependency}`).join("\n")}`,
  );
  if (item.registryDependencies.length) {
    console.log(
      `Also installs:\n${item.registryDependencies.map((dependency) => `  ${dependency}`).join("\n")}`,
    );
  }
}
