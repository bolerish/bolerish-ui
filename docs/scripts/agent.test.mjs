import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";
import test from "node:test";

import { registryItems } from "../../packages/registry/dist/index.js";

const root = new URL("../public/", import.meta.url);

test("agent catalog covers the registry and all its linked references exist", async () => {
  const catalog = await readFile(new URL("agent/SKILL.md", root), "utf8");
  for (const name of Object.keys(registryItems))
    assert.ok(catalog.includes(`- [${name}](`), `Missing ${name}`);
  for (const name of ["llms.txt", "agent/SKILL.md"]) {
    const file = new URL(name, root);
    const content = await readFile(file, "utf8");
    for (const match of content.matchAll(/\]\(([^)]+)\)/g)) {
      if (/^https?:/.test(match[1])) continue;
      await access(new URL(match[1], file));
    }
  }
});

test("input reference and configuration source contain the current canonical declarations", async () => {
  for (const [reference, source] of [
    ["api/input.en.md", "../../packages/ui/src/input.tsx"],
    ["api/configuration-config.ts.md", "../../packages/cli/src/config.ts"],
    ["api/tokens-semantic.stylex.ts.md", "../../packages/tokens/src/semantic.stylex.ts"],
  ]) {
    const actual = await readFile(new URL(reference, root), "utf8");
    const canonical = await readFile(new URL(source, import.meta.url), "utf8");
    assert.ok(actual.includes(canonical), reference);
  }
  const reference = await readFile(new URL("api/input.en.md", root), "utf8");
  assert.match(reference, /variant\?: "outline" \| "inline"/);
});

test("canonical agent entry points use English and link English references", async () => {
  for (const name of [
    "llms.txt",
    "llms-full.txt",
    "llms-full.en.txt",
    "agent/SKILL.md",
    "bolerish-for-llms.md",
    "installation.md",
  ]) {
    const content = await readFile(new URL(name, root), "utf8");
    assert.doesNotMatch(content, /[가-힣]/, name);
  }
  const index = await readFile(new URL("llms.txt", root), "utf8");
  assert.doesNotMatch(index, /\.\/guidelines\/[^)]+(?<!\.en)\.md\)/);
  assert.equal(
    await readFile(new URL("llms-full.txt", root), "utf8"),
    await readFile(new URL("llms-full.en.txt", root), "utf8"),
  );
});
