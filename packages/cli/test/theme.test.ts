import assert from "node:assert/strict";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";

import { add } from "../dist/add.js";
import { defaultConfig, readConfig, validateConfig, writeConfig } from "../dist/config.js";
import { init } from "../dist/init.js";
import { getThemeFiles } from "../dist/theme.js";

test("theme configuration validates modes and font-family lists, retaining legacy values", () => {
  assert.equal(validateConfig(defaultConfig).theme, undefined);
  const theme = {
    density: "compact",
    motion: "off",
    fonts: { body: '"Inter", sans-serif', heading: "Georgia, serif" },
  } as const;
  assert.deepEqual(validateConfig({ ...defaultConfig, theme }).theme, theme);
  for (const invalid of [
    null,
    [],
    { density: "tiny" },
    { motion: true },
    { fonts: null },
    { fonts: { body: "" } },
    { fonts: { heading: "x; color:red" } },
    { fonts: { body: "*/" } },
  ]) {
    assert.throws(() => validateConfig({ ...defaultConfig, theme: invalid }));
  }
});

test("initialization generates compact defaults, refreshes untouched output and preserves edits", async () => {
  const directory = await mkdtemp(join(tmpdir(), "nuee-theme-"));
  try {
    const theme = {
      density: "compact",
      motion: "off",
      fonts: { body: "Arial, sans-serif", heading: "Georgia, serif" },
    } as const;
    await writeConfig(directory, {
      ...defaultConfig,
      theme,
      accessibility: { respectReducedMotion: false },
    });
    await init(directory, { defaults: true, force: true, "skip-dependencies": true });
    assert.deepEqual((await readConfig(directory)).theme, theme);
    assert.equal((await readConfig(directory)).accessibility.respectReducedMotion, false);
    for (const file of getThemeFiles(theme))
      assert.equal(await readFile(join(directory, "src/styles", file.name), "utf8"), file.content);
    const stylesheet = join(directory, "src/styles/preferences.css");
    const source = await readFile(stylesheet, "utf8");
    assert.match(source, /--nuee-font-heading: Georgia, serif/);
    assert.match(source, /:root:not\(\[data-nuee-motion\]\)/);
    assert.match(source, /prefers-reduced-motion: reduce/);
    await add(directory, "dialog", { "skip-dependencies": true });
    assert.match(
      await readFile(join(directory, "src/components/ui/dialog.tsx"), "utf8"),
      /prefers-reduced-motion/,
    );
    await writeFile(stylesheet, source + "/* consumer edit */\n");
    await writeConfig(directory, {
      ...defaultConfig,
      theme: { density: "default", motion: "system" },
    });
    await init(directory, { defaults: true, force: true, "skip-dependencies": true });
    assert.equal(await readFile(stylesheet, "utf8"), source + "/* consumer edit */\n");
    assert.match(
      await readFile(join(directory, "src/styles/settings.stylex.ts"), "utf8"),
      /densityStyles.default/,
    );
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});

test("length units and numeric density validate and generate without changing legacy output", () => {
  for (const unit of ["rem", "px"] as const) {
    const theme = { unit, density: 0.9 };
    assert.deepEqual(validateConfig({ ...defaultConfig, theme }).theme, theme);
    const files = getThemeFiles(theme);
    assert.match(files[0].content, /"--nuee-density": 0.9/);
    assert.ok(files[1].content.includes(`--nuee-unit: ${unit === "px" ? "16px" : "1rem"}`));
  }
  for (const theme of [
    { unit: "em" },
    { density: 0 },
    { density: -1 },
    { density: Infinity },
    { density: 2.1 },
  ]) {
    assert.throws(() => validateConfig({ ...defaultConfig, theme }));
  }
  assert.doesNotMatch(getThemeFiles()[1].content, /--nuee-unit/);
});
