import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";

import { registryItems } from "../src/items.ts";

const outputDirectory = "dist/items";
const uiSourceDirectory = "../ui/src";
const tokenSourceDirectory = "../tokens/src";
const tokenOutputDirectory = "dist/tokens";
const styleOutputDirectory = "dist/styles";

await rm(outputDirectory, { force: true, recursive: true });
await mkdir(outputDirectory, { recursive: true });
await rm(tokenOutputDirectory, { force: true, recursive: true });
await mkdir(tokenOutputDirectory, { recursive: true });
await rm(styleOutputDirectory, { force: true, recursive: true });
await mkdir(styleOutputDirectory, { recursive: true });

for (const [name, item] of Object.entries(registryItems)) {
  const files = await Promise.all(
    item.files.map(async (path) => ({
      content: await readFile(join(uiSourceDirectory, path), "utf8"),
      path,
    })),
  );
  const componentFile = files.find((file) => file.path === `${name}.tsx`);
  const primaryExport = componentFile?.content.match(
    /export\s+(?:async\s+)?(?:function|const|class)\s+([A-Za-z0-9]+)/,
  )?.[1];

  if (!primaryExport) {
    throw new Error(`Could not determine the primary export for ${name}.`);
  }

  await writeFile(
    join(outputDirectory, `${name}.json`),
    `${JSON.stringify(
      {
        name,
        primaryExport,
        ...item,
        dependencies: item.dependencies.filter((dependency) => dependency !== "@nuee/tokens"),
        files,
      },
      null,
      2,
    )}\n`,
  );
}

for (const name of [
  "color-palette.stylex.ts",
  "semantic.stylex.ts",
  "themes.stylex.ts",
  "density.stylex.ts",
]) {
  await writeFile(
    join(tokenOutputDirectory, name),
    await readFile(join(tokenSourceDirectory, name), "utf8"),
  );
}

await writeFile(
  join(styleOutputDirectory, "reset.css"),
  await readFile(join(uiSourceDirectory, "styles/reset.css"), "utf8"),
);
