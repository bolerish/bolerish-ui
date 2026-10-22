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

test("canonical agent entry points use English and link English references", async () => {
  for (const name of [
    "llms.txt",
    "llms-full.txt",
    "agent/SKILL.md",
    "bolerish-for-llms.md",
    "installation.md",
  ]) {
    const content = await readFile(new URL(name, root), "utf8");
    assert.doesNotMatch(content, /[가-힣]/, name);
  }
  const index = await readFile(new URL("llms.txt", root), "utf8");
  assert.doesNotMatch(index, /\.\/guidelines\/[^)]+(?<!\.en)\.md\)/);
});
