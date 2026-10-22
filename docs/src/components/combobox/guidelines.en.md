## Usage guidelines

### Props

| Prop                                  | Default   | Values              | Meaning                                                 |
| ------------------------------------- | --------- | ------------------- | ------------------------------------------------------- |
| `ComboboxInput.variant`               | `outline` | `outline`, `inline` | Outlined search field or inline editing within content. |
| `ComboboxInput.startAddon / endAddon` | Unset     | `ReactNode`         | Places supporting content before or after the input.    |

### When to use

Use `Combobox` when users select an item by narrowing a list with text, such as finding a person or project. Use [Select](?path=/docs/components-select--docs) when scanning the list is sufficient, or `Input` when the value is unrestricted text.

### Search is not selection

Distinguish the text being typed from the selected value. Do not promise that arbitrary text creates a new item: creation requires an explicit application flow. Keep option labels specific enough to distinguish similar names.

### Results and states

Use `ComboboxEmpty` for a completed search with no matches. If results come from a server, manage loading, failures, and stale responses in the application; an empty list does not explain all three. Preserve the query after a failure so the user can retry.

> Keep the input's accessible name separate from its placeholder. Verify keyboard selection and clearing as well as pointer selection. See [Search and Filter](?path=/docs/patterns-search-and-filter--docs) for results-page behavior.

### App search and supporting elements

Use `ComboboxInput variant="inline"` for search that blends into the surrounding
screen. `startAddon` and `endAddon` can replace the default search icon and open
button with an engine picker or shortcut hint. Retain an input label, keyboard
option selection and accessible names for addon buttons.
