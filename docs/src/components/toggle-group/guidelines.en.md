## Usage guidelines

Group choices such as alignment or formatting. Decide whether one or several selections are valid before composing the group.

> Do not rely only on an icon's appearance to explain an unfamiliar option.

`soft` raises the selected surface with `interactionSelected` and `shadowVars.subtle` inside a `bgSubtle` container. `default` and `outline` use `bgCurrent` with a selection boundary. Hover, press and disabled states retain selection. Use Tabs to switch associated panels.

Selection uses neutral bgCurrent and an inset boundary instead of an accent hue.
Soft groups retain their neutral raised surface and shadow. No automatic check icon
is added; the primitive exposes aria-pressed. Disabled selected items retain their
selection cues, and focus remains visible.
