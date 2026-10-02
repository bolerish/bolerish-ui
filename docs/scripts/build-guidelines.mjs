import { mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";

const source = new URL("../src/foundations/", import.meta.url);
const output = new URL("../public/", import.meta.url);
const checking = process.argv.includes("--check");
async function emitFile(path, content) {
  if (checking) {
    const actual = await readFile(path, "utf8");
    if (actual !== content) throw new Error(`Generated documentation is stale: ${path.pathname}`);
    return;
  }
  await writeFile(path, content);
}

const order = JSON.parse(await readFile(new URL("order.json", source), "utf8"));
const patterns = new URL("../src/patterns/", import.meta.url);
const patternOrder = JSON.parse(await readFile(new URL("order.json", patterns), "utf8"));
const components = new URL("../src/components/", import.meta.url);
const componentNames = (await readdir(components)).sort();
const links = [];
const apiOutput = new URL("api/", output);
if (!checking) await rm(apiOutput, { recursive: true, force: true });
if (!checking) await mkdir(apiOutput, { recursive: true });
const sourceLinks = [];
for (const [label, directory, names] of [
  [
    "tokens",
    new URL("../../packages/tokens/src/", import.meta.url),
    ["semantic.stylex.ts", "density.stylex.ts", "themes.stylex.ts"],
  ],
  [
    "configuration",
    new URL("../../packages/cli/src/", import.meta.url),
    ["config.ts", "theme.ts", "init.ts"],
  ],
  [
    "shared-types",
    new URL("../../packages/ui/src/", import.meta.url),
    ["control-layout.ts", "typography.ts"],
  ],
]) {
  for (const name of names) {
    const content = await readFile(new URL(name, directory), "utf8");
    const fileName = `${label}-${name}.md`;
    await emitFile(
      new URL(fileName, apiOutput),
      `# ${name}\n\nGenerated from the current Nuée checkout. Installed local source takes precedence.\n\n\`\`\`ts\n${content}\`\`\`\n`,
    );
    sourceLinks.push(`- [${label}: ${name}](./api/${fileName})`);
  }
}
const installation = await readFile(new URL("../../README.md", import.meta.url), "utf8");
await emitFile(new URL("installation.md", output), installation);
const catalog = [];

if (!checking) await rm(new URL("guidelines/", output), { recursive: true, force: true });
if (!checking) await mkdir(new URL("guidelines/", output), { recursive: true });
for (const locale of ["ko", "en"]) {
  const suffix = locale === "ko" ? "" : ".en";
  const entries = [];
  for (const { slug } of order) {
    const content = await readFile(new URL(`${slug}/guidelines${suffix}.md`, source), "utf8");
    const title = content.split("\n")[0].slice(2);
    entries.push(content);
    links.push(`- [${title} (${locale})](./guidelines/${slug}${suffix}.md)`);
    await emitFile(new URL(`guidelines/${slug}${suffix}.md`, output), content);
  }
  for (const { slug } of patternOrder) {
    const overview = await readFile(new URL(`${slug}/overview${suffix}.md`, patterns), "utf8");
    const detail = await readFile(new URL(`${slug}/guidelines${suffix}.md`, patterns), "utf8");
    const content = `${overview.trim()}\n\n${detail}`;
    const title = content.split("\n")[0].slice(2);
    entries.push(content);
    links.push(`- [${title} (${locale})](./guidelines/pattern-${slug}${suffix}.md)`);
    await emitFile(new URL(`guidelines/pattern-${slug}${suffix}.md`, output), content);
  }
  for (const slug of componentNames) {
    const overview = await readFile(new URL(`${slug}/overview${suffix}.md`, components), "utf8");
    const files = await readdir(new URL(`${slug}/`, components));
    const detailName = `guidelines${suffix}.md`;
    const detail = files.includes(detailName)
      ? await readFile(new URL(`${slug}/${detailName}`, components), "utf8")
      : "";
    const content = [overview.trim(), detail.trim()].filter(Boolean).join("\n\n") + "\n";
    const title = overview.split("\n")[0].slice(2);
    const componentSource = await readFile(
      new URL(`../../packages/ui/src/${slug}.tsx`, import.meta.url),
      "utf8",
    );
    const apiFile = `${slug}${suffix}.md`;
    const reference = `${content}\n## Installed API reference\n\nThis source is exported from the current checkout. Read your installed local props before using it; imports are rewritten by the CLI.\n\n\`\`\`tsx\n${componentSource}\`\`\`\n`;
    await emitFile(new URL(apiFile, apiOutput), reference);
    sourceLinks.push(`- [${title} API (${locale})](./api/${apiFile})`);
    if (locale === "en")
      catalog.push(
        `- [${slug}](../api/${apiFile}): ${
          overview
            .trim()
            .split("\n")
            .find((line, index) => index > 0 && line.trim()) ?? title
        }`,
      );
    entries.push(content);
    links.push(`- [${title} (${locale})](./guidelines/${slug}${suffix}.md)`);
    await emitFile(new URL(`guidelines/${slug}${suffix}.md`, output), content);
  }
  await emitFile(new URL(`llms-full${suffix}.txt`, output), entries.join("\n\n---\n\n"));
}
await emitFile(
  new URL("llms.txt", output),
  [
    "# nuée",
    "",
    "> Read these rules before composing screens with nuée. Verify component APIs against the installed source.",
    "",
    "- [Installation and appearance defaults](./installation.md)",
    "- [Generated agent skill](./agent/SKILL.md)",
    "- [전체 규칙 (한국어)](./llms-full.txt)",
    "- [Complete guidelines (English)](./llms-full.en.txt)",
    ...links,
    "",
    "## Exact API, token and configuration source",
    ...sourceLinks,
    "",
  ].join("\n"),
);
if (!checking) await mkdir(new URL("agent/", output), { recursive: true });
await emitFile(
  new URL("agent/SKILL.md", output),
  [
    "---",
    "name: nuee",
    "description: Use installed Nuée React and StyleX components before building custom UI. Read local source contracts and generated references for controls, spacing, density, fonts and motion.",
    "---",
    "",
    "# Nuée",
    "",
    "Generated from canonical component documentation. Do not edit this file by hand.",
    "",
    "1. Read the app's nuee.json aliases and component versions. Nuée installs local source; do not assume @nuee/ui is a runtime dependency.",
    "2. Check the catalog before writing a new control. Read the linked reference and the installed props; never infer shadcn/Base UI size, variant or style APIs.",
    "Preserve installed use client directives for interactive components in RSC apps; do not move DOM effects to server execution.",
    "3. Use the [installation guide](../installation.md) and [configuration source](../api/configuration-config.ts.md) for theme defaults. Runtime user fonts and motion take precedence; respect OS reduced motion.",
    "4. Read [spacing](../guidelines/spacing.en.md) and [state](../guidelines/state.en.md) before composing the UI. Keep product data and domain layout in the app.",
    "5. Verify local TypeScript, CSS compilation and the actual consumer interaction. Finding a reference does not prove installed-version compatibility.",
    "",
    "## Components",
    "",
    ...catalog,
    "",
  ].join("\n"),
);
console.log(
  checking
    ? "Generated Nuée documentation is current."
    : "Exported nuée guidelines in Korean and English.",
);
