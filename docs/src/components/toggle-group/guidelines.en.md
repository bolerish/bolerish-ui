## Usage guidelines

### Props

| Prop      | Default   | Values                       | Meaning                                                                    |
| --------- | --------- | ---------------------------- | -------------------------------------------------------------------------- |
| `variant` | `default` | `default`, `outline`, `soft` | Default, outlined, or soft group treatment. Items inherit the group value. |
| `size`    | `md`      | `sm`, `md`, `lg`             | Sets item size; an item can override it.                                   |

Group choices such as alignment or formatting. Decide whether one or several selections are valid before composing the group.

> Do not rely only on an icon's appearance to explain an unfamiliar option.

`soft` uses `interactionSelected` and a selection boundary inside a `bgSubtle` container, without a drop shadow. `default` and `outline` use `bgSelected` with a selection boundary. Hover, press and disabled states retain selection. Use Tabs to switch associated panels.

Selection uses neutral bgCurrent and an inset boundary instead of an accent hue.
Soft groups retain their neutral raised surface and shadow. No automatic check icon
is added; the primitive exposes aria-pressed. Disabled selected items retain their
selection cues, and focus remains visible.

Selected grouped surfaces also use an inset `strokeAction` boundary for contrast on Fog and inverse backgrounds.
