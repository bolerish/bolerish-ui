import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { copyFile, mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";

import { oklchToHex } from "./palette-color.mjs";

test("OKLCH converts known sRGB colors and alpha to HEX", () => {
  for (const [source, expected] of [
    ["oklch(0% 0 0)", "#000000"],
    ["oklch(100% 0 0)", "#FFFFFF"],
    ["oklch(62.795536% 0.257683 29.233885)", "#FF0000"],
    ["oklch(59.98708% 0 0)", "#808080"],
    ["oklch(0% 0 0 / 32%)", "#00000052"],
    ["oklch(100% 0 0 / 0%)", "#FFFFFF00"],
  ])
    assert.equal(oklchToHex(source), expected);
});

test("invalid and out-of-gamut authoring values fail instead of silently clipping", () => {
  for (const value of [
    null,
    "#FFFFFF",
    "oklch(101% 0 0)",
    "oklch(50% -0.1 0)",
    "oklch(50% 0 0 / 101%)",
    "oklch(50% 0.5 30)",
  ]) {
    assert.throws(() => oklchToHex(value));
  }
});

test("palette check rejects manually edited output", async () => {
  const directory = await mkdtemp(join(tmpdir(), "bolerish-palette-"));
  try {
    for (const folder of ["scripts", "packages/tokens/src"]) {
      await mkdir(join(directory, folder), { recursive: true });
    }
    for (const path of [
      "scripts/generate-palette.mjs",
      "scripts/palette-color.mjs",
      "packages/tokens/palette.oklch.json",
      "packages/tokens/src/color-palette.stylex.ts",
    ]) {
      await copyFile(new URL(`../${path}`, import.meta.url), join(directory, path));
    }
    const target = join(directory, "packages/tokens/src/color-palette.stylex.ts");
    await writeFile(
      target,
      (await readFile(target, "utf8")).replace('white: "#FFFFFF"', 'white: "#FEFEFE"'),
    );
    assert.throws(
      () =>
        execFileSync(
          process.execPath,
          [join(directory, "scripts/generate-palette.mjs"), "--check"],
          { stdio: "pipe" },
        ),
      /Command failed/,
    );
    execFileSync(process.execPath, [join(directory, "scripts/generate-palette.mjs")]);
    execFileSync(process.execPath, [join(directory, "scripts/generate-palette.mjs"), "--check"]);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});
