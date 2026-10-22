import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { stripTypeScriptTypes } from "node:module";
import test from "node:test";
import { SourceTextModule, SyntheticModule } from "node:vm";

const stylex = new SyntheticModule(["defineVars", "createTheme"], function () {
  this.setExport("defineVars", (values) => values);
  this.setExport("createTheme", (base, values) => ({ ...base, ...values }));
});
const modules = new Map();
async function load(url) {
  if (modules.has(url.href)) return modules.get(url.href);
  const source = await readFile(url, "utf8");
  const module = new SourceTextModule(stripTypeScriptTypes(source), { identifier: url.href });
  modules.set(url.href, module);
  await module.link((specifier, parent) =>
    specifier === "@stylexjs/stylex" ? stylex : load(new URL(`${specifier}.ts`, parent.identifier)),
  );
  return module;
}
const module = await load(new URL("../packages/tokens/src/themes.stylex.ts", import.meta.url));
await module.evaluate();

function rgba(value) {
  assert.match(value, /^#[0-9A-F]{6}([0-9A-F]{2})?$/i);
  const hex = value.slice(1);
  return [0, 2, 4]
    .map((offset) => parseInt(hex.slice(offset, offset + 2), 16) / 255)
    .concat(hex.length === 8 ? parseInt(hex.slice(6), 16) / 255 : 1);
}
function composite(foreground, background) {
  return foreground
    .slice(0, 3)
    .map((channel, index) => channel * foreground[3] + background[index] * (1 - foreground[3]))
    .concat(1);
}
function luminance(color) {
  const linear = color
    .slice(0, 3)
    .map((channel) => (channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4));
  return linear[0] * 0.2126 + linear[1] * 0.7152 + linear[2] * 0.0722;
}
function contrast(foreground, background) {
  const a = luminance(foreground);
  const b = luminance(background);
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}
assert.equal(contrast(rgba("#ffffff"), rgba("#000000")), 21);

for (const mode of ["light", "dark"]) {
  test(`${mode}: readable text and action labels survive state layers`, () => {
    const theme = module.namespace[`${mode}ColorTheme`];
    const canvas = rgba(theme.bgCanvas);
    for (const surface of [
      "bgCanvas",
      "bgSurface",
      "bgSubtle",
      "bgRaised",
      "bgSelected",
      "bgDropTarget",
      "bgSurfacePressed",
      "bgRaisedPressed",
    ]) {
      const background = composite(rgba(theme[surface]), canvas);
      for (const foreground of ["fgPrimary", "fgSecondary", "fgTertiary", "fgAction"]) {
        const ratio = contrast(rgba(theme[foreground]), background);
        assert.ok(ratio >= 4.5, `${foreground}/${surface}: ${ratio.toFixed(2)} < 4.5`);
      }
    }
    for (const role of [
      "ActionPrimary",
      "ActionDestructive",
      "FeedbackInfo",
      "FeedbackSuccess",
      "FeedbackWarning",
      "FeedbackError",
    ]) {
      const background = composite(rgba(theme[`bg${role}`]), canvas);
      const foreground = rgba(theme[`fg${role.startsWith("Feedback") ? role : `On${role}`}`]);
      assert.ok(contrast(foreground, background) >= 4.5, `${role}: unreadable text`);
      if (role.startsWith("Feedback")) continue;
      for (const state of ["interactionSolidHover", "interactionSolidPressed"]) {
        const ratio = contrast(foreground, composite(rgba(theme[state]), background));
        assert.ok(ratio >= 4.5, `${role}/${state}: ${ratio.toFixed(2)} < 4.5`);
      }
    }
    assert.ok(contrast(rgba(theme.fgOnActionPrimary), rgba(theme.bgActionPrimaryHover)) >= 4.5);
    assert.ok(contrast(rgba(theme.fgInverse), rgba(theme.bgInverse)) >= 4.5);
  });
  test(`${mode}: control boundaries and focus remain visible`, () => {
    const theme = module.namespace[`${mode}ColorTheme`];
    assert.ok(theme.strokeControl, "Controls need a boundary separate from decorative hairlines");
    for (const surface of ["bgCanvas", "bgSurface", "bgRaised"]) {
      for (const boundary of [
        "strokeControl",
        "strokeFocus",
        "strokeAction",
        "strokeFeedbackError",
        "strokeDropIndicator",
      ]) {
        const ratio = contrast(rgba(theme[boundary]), rgba(theme[surface]));
        assert.ok(ratio >= 3, `${boundary}/${surface}: ${ratio.toFixed(2)} < 3`);
      }
    }
    // Essential controls sit on canvas/surface; grouped selections use stronger boundaries.
    assert.ok(contrast(rgba(theme.strokeAction), rgba(theme.bgSubtle)) >= 3);
    assert.ok(contrast(rgba(theme.strokeAction), rgba(theme.interactionSelected)) >= 3);
  });
}
