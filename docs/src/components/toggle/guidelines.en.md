## Usage guidelines

### Props

| Prop      | Default   | Values                       | Meaning                                                    |
| --------- | --------- | ---------------------------- | ---------------------------------------------------------- |
| `variant` | `default` | `default`, `outline`, `soft` | Default, outlined, or soft-background selection treatment. |
| `size`    | `md`      | `sm`, `md`, `lg`             | Controls toggle height and spacing.                        |

Use it for a persistent mode such as bold formatting. Use `Button` for a one-time command and `Switch` for a setting.

> Keep the accessible state in sync with the visible pressed treatment.

Selection uses neutral bgCurrent and an inset boundary instead of an accent hue.
Soft groups retain their neutral raised surface and shadow. No automatic check icon
is added; the primitive exposes aria-pressed. Disabled selected items retain their
selection cues, and focus remains visible.
