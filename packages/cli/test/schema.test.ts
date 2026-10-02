import assert from "node:assert/strict";
import { mkdtemp, readFile, rename, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";

import { defaultConfig, hasConfig, readConfig, writeConfig } from "../dist/config.js";
import { init } from "../dist/init.js";

test("configuration links local completion values and retains the schema on rewrites", async () => {
  const directory = await mkdtemp(join(tmpdir(), "nuee-schema-"));
  try {
    await init(directory, { defaults: true, "skip-dependencies": true }, false);
    const config = JSON.parse(await readFile(join(directory, ".nuee.json"), "utf8"));
    assert.equal(config.$schema, "./.nuee.schema.json");
    const schema = JSON.parse(await readFile(join(directory, config.$schema), "utf8"));
    assert.deepEqual(schema.properties.theme.properties.motion.enum, ["system", "off"]);
    assert.deepEqual(schema.properties.theme.properties.unit.enum, ["rem", "px"]);
    assert.deepEqual(schema.properties.theme.properties.density.anyOf[0].enum, [
      "default",
      "compact",
    ]);
    await writeConfig(directory, { ...defaultConfig, theme: { motion: "off" } });
    assert.equal((await readConfig(directory)).theme?.motion, "off");
    assert.equal(
      JSON.parse(await readFile(join(directory, ".nuee.json"), "utf8")).$schema,
      config.$schema,
    );
  } finally {
    await rm(directory, { recursive: true });
  }
});

test("legacy filename requires an explicit rename instead of silently resetting configuration", async () => {
  const directory = await mkdtemp(join(tmpdir(), "nuee-legacy-"));
  const source = JSON.stringify({ ...defaultConfig, theme: { motion: "off" } });
  try {
    await writeFile(join(directory, "nuee.json"), source);
    await assert.rejects(hasConfig(directory), /Rename nuee.json to .nuee.json/);
    await assert.rejects(readConfig(directory), /Rename nuee.json to .nuee.json/);
    await assert.rejects(init(directory, { defaults: true, force: true }), /Rename nuee.json/);
    assert.equal(await readFile(join(directory, "nuee.json"), "utf8"), source);
    await rename(join(directory, "nuee.json"), join(directory, ".nuee.json"));
    await init(directory, { defaults: true, force: true, "skip-dependencies": true }, false);
    assert.equal((await readConfig(directory)).theme?.motion, "off");
    assert.equal(
      JSON.parse(await readFile(join(directory, ".nuee.json"), "utf8")).$schema,
      "./.nuee.schema.json",
    );
  } finally {
    await rm(directory, { recursive: true });
  }
});
