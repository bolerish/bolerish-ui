## Usage guidelines

### Props

| Prop           | Default   | Values              | Meaning                                                              |
| -------------- | --------- | ------------------- | -------------------------------------------------------------------- |
| `variant`      | `outline` | `outline`, `inline` | Outlined form field or inline editing that follows surrounding text. |
| `disabled`     | `false`   | `boolean`           | Prevents input and shows an unavailable state.                       |
| `aria-invalid` | `false`   | `true`, `false`     | Shows invalid input. Also associate a descriptive error message.     |

Use `Input` for a single line, `Textarea` for several lines, and selection controls when values come from a fixed set.

> A placeholder disappears during entry; keep the field's name visible.

### Editing inside text and lists

Use `variant="inline"` for short inline edits. It inherits surrounding text size
and color while retaining keyboard focus and error indications. Use `InputGroup`
when several inputs need one shared boundary.
