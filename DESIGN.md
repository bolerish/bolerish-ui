---
version: alpha
name: HELIOT-EMIL-color-palette
description: >-
  A proposed UI color palette interpreting HELIOT EMIL's monochromatic aesthetic and material research.
  Use Chalk for the canvas, White for work surfaces, and Carbon for body text and primary actions.
  Use Iron for secondary text, Steel for control boundaries, and Silver for metallic expression.
  HEX values and role mappings are project proposals, not the brand's official color specifications.

palette:
  white: "#FFFFFF"
  chalk: "#F2F3F4"
  fog: "#DCE0E3"
  silver: "#B5BBC1"
  steel: "#7C8389"
  iron: "#50555A"
  graphite: "#25272A"
  carbon: "#0C0D0E"

colors:
  primary: "#0C0D0E"
  on-primary: "#FFFFFF"
  primary-hover: "#25272A"
  primary-focus: "#0C0D0E"
  ink: "#0C0D0E"
  ink-muted: "#50555A"
  ink-disabled: "#7C8389"
  canvas: "#F2F3F4"
  surface-1: "#FFFFFF"
  surface-2: "#DCE0E3"
  hairline: "#DCE0E3"
  hairline-strong: "#7C8389"
  metal-base: "#B5BBC1"
  metal-shadow: "#7C8389"
  metal-highlight: "#FFFFFF"
  inverse-canvas: "#0C0D0E"
  inverse-surface-1: "#25272A"
  inverse-ink: "#F2F3F4"
  inverse-ink-muted: "#B5BBC1"
  inverse-hairline: "#50555A"
  inverse-hairline-strong: "#7C8389"
  inverse-focus: "#F2F3F4"

components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    focusColor: "{colors.primary-focus}"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
    textColor: "{colors.on-primary}"
  button-secondary:
    backgroundColor: "{colors.surface-1}"
    textColor: "{colors.ink}"
    borderColor: "{colors.hairline-strong}"
    focusColor: "{colors.primary-focus}"
  text-input:
    backgroundColor: "{colors.surface-1}"
    textColor: "{colors.ink}"
    placeholderColor: "{colors.ink-muted}"
    borderColor: "{colors.hairline-strong}"
  text-input-focused:
    backgroundColor: "{colors.surface-1}"
    textColor: "{colors.ink}"
    placeholderColor: "{colors.ink-muted}"
    borderColor: "{colors.hairline-strong}"
    focusColor: "{colors.primary-focus}"
  panel:
    backgroundColor: "{colors.surface-1}"
    textColor: "{colors.ink}"
    borderColor: "{colors.hairline}"
  panel-inverse:
    backgroundColor: "{colors.inverse-surface-1}"
    textColor: "{colors.inverse-ink}"
    secondaryTextColor: "{colors.inverse-ink-muted}"
    borderColor: "{colors.inverse-hairline}"
    focusColor: "{colors.inverse-focus}"
---

> Current implementation (2026-10-22): UI neutrals now use subtly cool Zinc grays.
> This document retains the earlier proposal for reference. The current values
> are in `packages/tokens/src/color-palette.stylex.ts` and the color guidelines.

# HELIOT EMIL Color Palette

## Overview

This eight-color proposal uses black, cool grays, and white. The default combination for a light work interface is **Chalk canvas + White surfaces + Carbon text**, with Silver and Steel reserved for material studies.

HELIOT EMIL describes a monochromatic aesthetic, custom-developed materials and hardware, and the relationship between form and function. This document interprets those ideas as UI color roles. The HEX values are project proposals, not official values extracted from the brand's website or approved brand guidelines. [HELIOT EMIL About](https://heliotemil.com/pages/about).

The user-provided Linear analysis informed the document structure: YAML definitions followed by explanatory sections. Its colors, brand descriptions, and component specifications were not adopted. This document covers color only; typography, spacing, and radii are outside its scope.

`palette` defines base color values. `colors` assigns semantic roles, and `components` maps those roles to component colors. Expressions such as `{colors.ink}` are document references. The current web prototype does not read or apply this YAML.

Palette image referenced by the supplied proposal: `output/palette/heliot-emil-palette-01.png` (not included in the attachment).

## Colors

### Base Palette

| Name     | Value     | Expression and use                                                 |
| -------- | --------- | ------------------------------------------------------------------ |
| White    | `#FFFFFF` | Light work surfaces and reflected highlights                       |
| Chalk    | `#F2F3F4` | Light canvas and body text on dark surfaces                        |
| Fog      | `#DCE0E3` | Secondary surfaces and decorative dividers                         |
| Silver   | `#B5BBC1` | Metallic base color and secondary text on dark surfaces            |
| Steel    | `#7C8389` | Control boundaries on light or dark work surfaces                  |
| Iron     | `#50555A` | Secondary text on light surfaces                                   |
| Graphite | `#25272A` | Inverse panels and primary-button hover state                      |
| Carbon   | `#0C0D0E` | Body text, primary actions, and focus indicators on light surfaces |

Combine the eight colors through differences in luminance. Metallic expression uses White, Silver, and Steel together rather than relying on Silver alone. Rendering reflections or textures is a separate design decision; the palette does not guarantee text contrast on those treatments.

### Canvas and Surfaces

- **Canvas** `{colors.canvas}`: Chalk background for the overall work interface.
- **Surface 1** `{colors.surface-1}`: White surface for cards, inputs, and reading areas.
- **Surface 2** `{colors.surface-2}`: Fog surface for grouping content within the same interface. When indicating selection, include a label or another visible indicator.

White cards and the Chalk canvas have a small luminance difference. Do not rely on that difference alone to identify clickable regions or selected states.

### Text

- **Ink** `{colors.ink}`: Carbon for body text, headings, and important values.
- **Ink Muted** `{colors.ink-muted}`: Iron for descriptions, secondary information, and input guidance.
- **Ink Disabled** `{colors.ink-disabled}`: Text within controls that are actually unavailable. Do not use it for descriptions, footnotes, or input guidance that users need to read.

Required content must remain readable even when it is less prominent. Use Carbon or Iron for small text on light surfaces.

### Actions and Focus

- **Primary** `{colors.primary}` + **On Primary** `{colors.on-primary}`: White text on a Carbon button.
- **Primary Hover** `{colors.primary-hover}`: Change the primary button to Graphite on pointer hover. Keep its text White.
- **Primary Focus** `{colors.primary-focus}`: Carbon for keyboard-focus indicators on light surfaces.

Pointer hover and keyboard focus are distinct states. Show focus with a separate outline; changing the button to Graphite does not replace a focus indicator. Check the outline's thickness, placement, and contrast against its actual adjacent colors when applying it to an interface.

### Borders

- **Hairline** `{colors.hairline}`: Fog dividers for non-interactive panels.
- **Hairline Strong** `{colors.hairline-strong}`: Steel boundaries for inputs and secondary buttons.

Fog against White has approximately 1.33:1 contrast. Use Hairline Strong when a boundary is necessary to identify an input or button. Do not reuse a reading card's decorative divider as a control's identifying boundary.

### Inverse Surfaces

- **Inverse Canvas** `{colors.inverse-canvas}`: Carbon background.
- **Inverse Surface 1** `{colors.inverse-surface-1}`: Graphite panel.
- **Inverse Ink / Ink Muted**: Chalk for body text and Silver for secondary text.
- **Inverse Hairline / Hairline Strong**: Iron for decorative dividers and Steel for necessary control boundaries.
- **Inverse Focus** `{colors.inverse-focus}`: Chalk for focus indicators on dark surfaces.

These combinations illustrate inverse regions. They do not define a complete dark theme or theme mappings for every state.

## Component Color Mapping

| Component              | Background        | Text                    | Boundary or state                                                |
| ---------------------- | ----------------- | ----------------------- | ---------------------------------------------------------------- |
| `button-primary`       | Primary           | On Primary              | Primary Focus on a light surrounding surface                     |
| `button-primary-hover` | Primary Hover     | On Primary              | Keep the default button's text color                             |
| `button-secondary`     | Surface 1         | Ink                     | Hairline Strong                                                  |
| `text-input`           | Surface 1         | Ink / Ink Muted         | Hairline Strong                                                  |
| `text-input-focused`   | Surface 1         | Ink / Ink Muted         | Preserve the input surface and add Primary Focus                 |
| `panel`                | Surface 1         | Ink                     | Hairline for a non-interactive panel                             |
| `panel-inverse`        | Inverse Surface 1 | Inverse Ink / Ink Muted | Use distinct colors for decorative dividers and focus indicators |

This table proposes color mappings only. Button dimensions, input behavior, focus restoration, and disabled behavior follow the actual component contract. If an entire panel is clickable, provide the indicators needed to identify it as a control rather than relying on a decorative border.

## Usage Rules

### Do

- Start with Chalk for the canvas and White for work areas.
- Use Carbon for body text and primary actions, and Iron for secondary text.
- Use metallic treatments in material swatches where they do not obscure content or controls.
- Map colors through role names. Body text, buttons, and focus indicators remain distinct roles even when they share Carbon.
- Pair error, success, and selection states with text and visible indicators. Do not communicate state through color alone.

### Don't

- Do not use Steel or Silver for normal body text on light surfaces.
- Do not use Fog as the only identifying boundary of a control.
- Do not place text directly over reflections or textures and assume flat-color contrast values still apply.
- Do not lower a color's opacity arbitrarily and treat it as the same role's default value.
- Do not present these proposed values as official brand specifications or values extracted from the current website.

## Contrast Checks

The following results were calculated from the relative luminance of opaque sRGB color pairs. Normal text pairs were checked against a minimum of 4.5:1; control boundaries required for identification were checked against adjacent colors at a minimum of 3:1. Displayed ratios are rounded to two decimal places; comparisons used unrounded values. [W3C Text Contrast](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html), [W3C Non-text Contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html).

| Use                      | Foreground / background | Contrast | Result                                |
| ------------------------ | ----------------------- | -------- | ------------------------------------- |
| Body text                | Carbon / White          | 19.45:1  | Meets the normal-text threshold       |
| Body text                | Carbon / Chalk          | 17.51:1  | Meets the normal-text threshold       |
| Secondary text           | Iron / White            | 7.53:1   | Meets the normal-text threshold       |
| Secondary text           | Iron / Chalk            | 6.78:1   | Meets the normal-text threshold       |
| Secondary text           | Iron / Fog              | 5.67:1   | Meets the normal-text threshold       |
| Primary button           | White / Carbon          | 19.45:1  | Meets the normal-text threshold       |
| Button hover             | White / Graphite        | 14.98:1  | Meets the normal-text threshold       |
| Inverse body text        | Chalk / Graphite        | 13.48:1  | Meets the normal-text threshold       |
| Inverse secondary text   | Silver / Graphite       | 7.73:1   | Meets the normal-text threshold       |
| Control boundary         | Steel / White           | 3.84:1   | Meets the non-text contrast threshold |
| Control boundary         | Steel / Chalk           | 3.46:1   | Meets the non-text contrast threshold |
| Inverse control boundary | Steel / Graphite        | 3.90:1   | Meets the non-text contrast threshold |
| Decorative divider       | Fog / White             | 1.33:1   | Do not use for control identification |

These checks cover numerical contrast between color pairs. They do not establish interface accessibility conformance or validate reflective surfaces, opacity changes, or every state.

## Iteration Guide

1. Maintain this document in English as the canonical design reference. Explanatory discussion and archive records may remain in Korean.
2. When changing a base color, review every role and component that uses its value.
3. Recalculate contrast using the actual text, background, and boundary color pairs.
4. Choose the focus color for each region according to whether its surroundings are light or dark.
5. Distinguish palette adoption from application to the web prototype. Editing this document does not mean its values have been applied to the interface.

## Known Gaps

- Palette adoption and application to the web prototype are not yet confirmed.
- Error, success, and warning colors have not been defined.
- Complete pressed and disabled state mappings have not been defined.
- A complete dark theme, colors over photography or video, real devices, and assistive technologies have not been validated.
- Typography, spacing, radii, and responsive specifications are outside this document's scope.

## Sources and Scope

- [HELIOT EMIL About](https://heliotemil.com/pages/about): Source for the monochromatic aesthetic, materials, hardware, and form-function relationship. Revisited on 2026-10-12.
- [W3C WCAG 2.2 Text Contrast](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html): Contrast requirements for text against its background.
- [W3C WCAG 2.2 Non-text Contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html): Contrast requirements for identifying controls and states.
- User-provided `Linear-design-analysis`: Structural reference for YAML definitions, item descriptions, usage rules, and known gaps.

HELIOT EMIL informs the design interpretation. The eight HEX values, semantic color roles, and component mappings are proposals for this project.

## Adoption in bolerish/ui

This checkout adopts the eight palette values as compiled StyleX tokens. It does not read this YAML at runtime. The semantic mapping, inverse states and retained functional feedback colors are documented in [Color](docs/src/foundations/color/guidelines.en.md).

Typography, spacing and corner scales retain the existing project rules because the supplied proposal defines colors only. Paragraphs use `P` with `body`, `description` and `caption` variants; `Heading` supports HTML levels 1 through 6 independently of its visual size. Documentation previews use the canvas background separately from the code-block surface.

The product is named **bolerish/ui**. Packages use `@bolerish/*`, the CLI is `bolerish`, and new configuration is `.bolerish.json`. Existing `.nuee.json` and `nuee.json` remain readable. See the [migration guide](README.md#migration-from-nuée).
