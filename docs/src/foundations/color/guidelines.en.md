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

## Adopted palette

Use subtly cool Zinc grays for surfaces, text, boundaries and primary actions. Existing token names and light/dark roles remain intact. Feedback colors, typography, spacing and radius scales retain the existing rules.

| Palette  | Value   | Role                                          |
| -------- | ------- | --------------------------------------------- |
| White    | #FFFFFF | Light content surfaces, primary action labels |
| Chalk    | #F4F4F5 | Light canvas, inverse text and action         |
| Fog      | #E4E4E7 | Light grouping and decorative dividers        |
| Silver   | #A1A1AA | Inverse descriptions                          |
| Steel    | #71717A | Strong boundaries, unavailable text           |
| Iron     | #52525B | Light descriptions, inverse dividers          |
| Graphite | #27272A | Primary hover, inverse surfaces               |
| Carbon   | #09090B | Light text and primary action                 |

Use `strokeControl` (Zinc 450, #85858F) for inputs on White or Chalk. Use `strokeAction` for selected outlines on grouped Fog surfaces. `strokeDefault` is decorative. Text targets 4.5:1 and essential control/focus boundaries target 3:1 in the tested pairings.

The dark canvas uses Zinc 900 (`#18181B`) with Graphite (`#27272A`) surfaces for a gentler tone step. Existing information/success/warning/error colors remain unchanged. Primary buttons use `bgActionPrimaryHover` on hover; other state layers retain their established roles.

Resting control boundaries use Zinc 450 in light mode and Steel in dark mode. Decorative dark dividers use Zinc 700. Hover uses `strokeStrong`; focus uses Iron/Silver, preserving contrast for essential boundaries, focus and errors.
