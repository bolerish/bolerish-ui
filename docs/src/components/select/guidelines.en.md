## Usage guidelines

### When to use

Use `Select` for a predefined value when users can recognize the option by reading the list, such as a status or team. Keep the selected value visible after the list closes.

### Choose an alternative

- Use [Combobox](?path=/docs/components-combobox--docs) when typing helps users find an option in a long or unfamiliar list.
- Use [Radio Group](?path=/docs/components-radio-group--docs) when users need to compare the available choices without opening a popup.
- Use Dropdown Menu for commands such as Duplicate or Delete, rather than storing a form value.

### Labels and empty selection

Name the field independently of its current value. Use a placeholder to prompt a choice, not to replace the label. Choose a default only when it is a valid, useful starting value; do not silently select consent or a costly option.

> `SelectTrigger` has no @bolerish/ui `size` or `variant` prop. Keep its built-in control sizing instead of passing `Button` props to it.
