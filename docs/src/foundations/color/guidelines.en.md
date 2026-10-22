# Color

Consistent color roles help people distinguish essential content, supporting text, and available actions. Semantic tokens let you compose light and dark screens using the same decisions.

## Selection guidelines

| Situation                          | Recommended choice        | Code                                   |
| ---------------------------------- | ------------------------- | -------------------------------------- |
| Outer page background              | `colorVars.bgCanvas`      | `backgroundColor: colorVars.bgCanvas`  |
| Content surface                    | `colorVars.bgSurface`     | `backgroundColor: colorVars.bgSurface` |
| Subtle separation                  | `colorVars.bgSubtle`      | `backgroundColor: colorVars.bgSubtle`  |
| Raised surface, such as a popup    | `colorVars.bgRaised`      | `backgroundColor: colorVars.bgRaised`  |
| Headings and essential content     | `colorVars.fgPrimary`     | `color: colorVars.fgPrimary`           |
| Supporting information             | `colorVars.fgSecondary`   | `color: colorVars.fgSecondary`         |
| Standard divider                   | `colorVars.strokeDefault` | `borderColor: colorVars.strokeDefault` |
| Boundary that must remain distinct | `colorVars.strokeControl` | `borderColor: colorVars.strokeControl` |

Pair strong action backgrounds with `fgOnActionPrimary` or `fgOnActionDestructive`. Pair feedback tokens such as `fgFeedbackError` with a specific explanation.

## Examples

### Apply roles to a settings panel

Use `bgSurface` for the panel, `fgPrimary` for its title, and `fgSecondary` for supporting text. When saving fails, add an error role and a recovery message. Giving both supporting text and the error a muted treatment hides what needs attention.

> Keep the same semantic token across light and dark modes. Semantic tokens do not guarantee contrast for every foreground and background combination. Test the actual pairing and communicate state through more than color.

## Hierarchy and boundaries

Use `fgPrimary` for essential content, `fgSecondary` for readable supporting text,
`fgTertiary` for low-priority supplementary marks, and `fgDisabled` only for unavailable
controls. Supporting descriptions are not disabled content.

Use `strokeDefault` for ordinary divisions and `strokeStrong` for a clearer separation
between action groups in menus. Dropdown Menu separators follow this rule. A strong border
is not a substitute for selection, error or focus, and does not guarantee sufficient contrast.

Follow the role composition contracts in [State](?path=/docs/foundations-state--docs)
for selection and drop backgrounds, foregrounds and borders. `bgSubtle` alone does not mean selected.

## Palette

Use cool near-black surfaces and a distinct primary action. Light surfaces and essential control boundaries preserve contrast for reading and interaction.

| Role                   | Value   | Use                                         |
| ---------------------- | ------- | ------------------------------------------- |
| Dark canvas            | #08090A | Lowest screen surface                       |
| Dark content           | #0F1011 | Cards, inputs and default surfaces          |
| Dark raised surface    | #161718 | Popups and subtle grouping                  |
| Dark selection/divider | #23252A | Selected surfaces and decorative boundaries |
| Dark supporting text   | #8A8F98 | Descriptions and metadata                   |
| Light canvas           | #F5F6F8 | Lowest light surface                        |
| Light content          | #FFFFFF | Cards and inputs                            |
| Light grouping         | #E5E5E6 | Subtle groups and dividers                  |
| Primary action         | #E4F222 | Shared acid-lime accent in both modes       |
| Primary hover          | #D2DF20 | A slightly lower-lightness lime             |

Reserve lime for primary actions and current progress rather than large fields or
all secondary buttons. Primary labels use #08090A. On light surfaces, a dark
button boundary preserves the outline. Information, success, warning and error
colors retain their feedback meanings rather than becoming decorative accents.

Essential input boundaries use #81868F in light mode and #62666D in dark mode.
Decorative strokeDefault does not replace them. Dark selected boundaries use
#81868F via strokeStrong. Focus uses #383B3F in light and #8A8F98 in dark. Tested
text pairings target 4.5:1 and essential control/focus boundaries target 3:1.

## Palette authoring and generation

Author colors in OKLCH in `packages/tokens/palette.oklch.json`. Adjust lightness,
chroma and hue, then run `pnpm palette:generate` to emit literal HEX StyleX tokens.
Do not edit the palette values in generated `color-palette.stylex.ts` directly.
Solid colors use six-digit HEX; translucent colors use eight-digit HEX with
eight-bit alpha rounding. Generation rejects colors outside sRGB; reduce chroma
and review them again. `pnpm palette:check` checks generated values against the
source, and `pnpm test:tokens` checks conversion and contrast. Consumers receive
generated tokens without runtime OKLCH conversion.
