import assert from "node:assert/strict";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";

import { defaultConfig, hasConfig, readConfig, writeConfig } from "../dist/config.js";

test("new configuration uses the bolerish name and schema", async () => {
  const directory = await mkdtemp(join(tmpdir(), "bolerish-brand-"));
  try {
    const path = await writeConfig(directory, defaultConfig);
    assert.equal(path, join(directory, ".bolerish.json"));
    const config = JSON.parse(await readFile(path, "utf8"));
    assert.equal(config.$schema, "./node_modules/@bolerish/ui/configuration_schema.json");
  } finally {
    await rm(directory, { recursive: true });
  }
});

test("legacy configuration remains readable and is not overwritten during migration", async () => {
  for (const filename of [".nuee.json", "nuee.json"]) {
    const directory = await mkdtemp(join(tmpdir(), "bolerish-legacy-"));
    try {
      const config = {
        ...defaultConfig,
        theme: { density: 0.875, fonts: { body: "Arial" } },
        version: "0.8.1",
      };
      const original = JSON.stringify(config);
      await writeFile(join(directory, filename), original);
      assert.equal(await hasConfig(directory), true);
      assert.deepEqual(await readConfig(directory), config);
      await writeConfig(directory, { ...config, theme: { motion: "off" } });
      assert.equal(await readFile(join(directory, filename), "utf8"), original);
      assert.deepEqual((await readConfig(directory)).theme, { motion: "off" });
    } finally {
      await rm(directory, { recursive: true });
    }
  }
});
