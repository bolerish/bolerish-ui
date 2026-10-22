import { mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";

const source = new URL("../src/foundations/", import.meta.url);
const output = new URL("../public/", import.meta.url);
const checking = process.argv.includes("--check");
if (!checking) await rm(new URL("llms-full.en.txt", output), { force: true });
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
    ["styles/control-layout.ts", "typography.ts", "theme.ts"],
  ],
]) {
  for (const name of names) {
    const content = await readFile(new URL(name, directory), "utf8");
    const fileName = `${label}-${name.split("/").at(-1)}.md`;
    await emitFile(
      new URL(fileName, apiOutput),
      `# ${name}\n\nGenerated from the current @bolerish/ui checkout. The installed package declarations take precedence; copied source takes precedence only for the optional source-copy path.\n\n\`\`\`ts\n${content}\`\`\`\n`,
    );
    sourceLinks.push(`- [${label}: ${name}](./api/${fileName})`);
  }
}
const installation = await readFile(new URL("../../README.md", import.meta.url), "utf8");
await emitFile(new URL("installation.md", output), installation);
const catalog = [];
catalog.push(
  "- [p](../api/paragraph.en.md): Compatibility alias for Paragraph. Use Paragraph in new code.",
);

if (!checking) await rm(new URL("guidelines/", output), { recursive: true, force: true });
if (!checking) await mkdir(new URL("guidelines/", output), { recursive: true });
for (const locale of ["ko", "en"]) {
  const suffix = locale === "ko" ? "" : ".en";
  const entries = [];
  for (const { slug } of order) {
    const content = await readFile(new URL(`${slug}/guidelines${suffix}.md`, source), "utf8");
    const title = content.split("\n")[0].slice(2);
    entries.push(content);
    if (locale === "en") links.push(`- [${title}](./guidelines/${slug}${suffix}.md)`);
    await emitFile(new URL(`guidelines/${slug}${suffix}.md`, output), content);
  }
  for (const { slug } of patternOrder) {
    const overview = await readFile(new URL(`${slug}/overview${suffix}.md`, patterns), "utf8");
    const detail = await readFile(new URL(`${slug}/guidelines${suffix}.md`, patterns), "utf8");
    const content = `${overview.trim()}\n\n${detail}`;
    const title = content.split("\n")[0].slice(2);
    entries.push(content);
    if (locale === "en") links.push(`- [${title}](./guidelines/pattern-${slug}${suffix}.md)`);
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
    const reference = `${content}\n## Installed API reference\n\nThis source is exported from the current checkout. Read the declarations in your installed package before using it. The optional CLI rewrites imports only when copying source.\n\n\`\`\`tsx\n${componentSource}\`\`\`\n`;
    await emitFile(new URL(apiFile, apiOutput), reference);
    if (locale === "en") sourceLinks.push(`- [${title} API](./api/${apiFile})`);
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
    if (locale === "en") links.push(`- [${title}](./guidelines/${slug}${suffix}.md)`);
    await emitFile(new URL(`guidelines/${slug}${suffix}.md`, output), content);
  }
  if (locale === "en") {
    const full = entries.join("\n\n---\n\n");
    await emitFile(new URL("llms-full.txt", output), full);
  }
}
await emitFile(
  new URL("llms.txt", output),
  [
    "# @bolerish/ui",
    "",
    "> Read these rules before composing screens with @bolerish/ui. Verify component APIs against the installed source.",
    "",
    "- [Installation and appearance defaults](./installation.md)",
    "- [Generated agent skill](./agent/SKILL.md)",
    "- [Complete guidelines](./llms-full.txt)",
    "- [LLM usage guide](./bolerish-for-llms.md)",
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
    "name: bolerish",
    "description: Use installed @bolerish/ui React and StyleX components before building custom UI. Read local source contracts and generated references for controls, spacing, density, fonts and motion.",
    "---",
    "",
    "# @bolerish/ui",
    "",
    "Generated from canonical component documentation. Do not edit this file by hand.",
    "",
    "1. Import installed components from @bolerish/ui and load @bolerish/ui/global.css once. Use themeClassNames from @bolerish/ui/theme for precompiled light/dark themes. No StyleX compiler is needed for this path. Read .bolerish.json only when the app uses optional copied source.",
    "2. Check the catalog before writing a new control. Read the linked reference and the installed props; never infer shadcn/Base UI size, variant or style APIs.",
    "Preserve installed use client directives for interactive components in RSC apps; do not move DOM effects to server execution.",
    "3. Use the [installation guide](../installation.md) for package themes and optional StyleX extensions. The [configuration source](../api/configuration-config.ts.md) applies only to source copying. Runtime end-user fonts and motion take precedence; respect OS reduced motion unless the end user explicitly selects on.",
    "4. Read [spacing](../guidelines/spacing.en.md) and [state](../guidelines/state.en.md) before composing the UI. Keep product data and domain layout in the app.",
    "5. Verify local TypeScript, CSS compilation and the actual consumer interaction. Finding a reference does not prove installed-version compatibility.",
    "",
    "## Components",
    "",
    ...catalog,
    "",
  ].join("\n"),
);
await emitFile(
  new URL("bolerish-for-llms.md", output),
  `# @bolerish/ui usage guide for coding agents\n\nGenerated from canonical English documentation and current source.\n\nRead the [agent workflow](./agent/SKILL.md), [installation guide](./installation.md) and [complete guidelines](./llms-full.txt). Check the installed source before using any props; the package ships compiled components and CSS, with themeClassNames exported from @bolerish/ui/theme. Source copying through the CLI is optional. Local edits and runtime user preferences take precedence over generated defaults.\n\nUse the [spacing roles](./guidelines/spacing.en.md), [configuration source](./api/configuration-config.ts.md) and exact component API references linked from [the index](./llms.txt). Preserve keyboard access, focus and disabled boundaries. Respect OS reduced motion unless the end user explicitly selects on.\n`,
);
console.log(
  checking
    ? "Generated @bolerish/ui documentation is current."
    : "Exported localized user guidelines and canonical English agent references.",
);
