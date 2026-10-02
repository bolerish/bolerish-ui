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
| Boundary that must remain distinct | `colorVars.strokeStrong`  | `borderColor: colorVars.strokeStrong`  |

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
