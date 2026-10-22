## Usage guidelines

### Props

| Prop      | Default   | Values                                                                  | Meaning                                                                      |
| --------- | --------- | ----------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `variant` | `primary` | `primary`, `secondary`, `outline`, `ghost`, `destructive`               | Primary, supporting, outlined, minimal, or destructive action.               |
| `size`    | `md`      | `sm`, `md`, `lg`, `icon-xs`, `icon-sm`, `icon-md`, `icon-lg`, `icon-xl` | Text button height or icon-only dimensions. Icon buttons need an aria-label. |
| `shape`   | `default` | `default`, `square`, `circle`                                           | Default corners, square, or circular outline.                                |
| `align`   | `center`  | `start`, `center`, `end`, `space-between`                               | Aligns content inside the button.                                            |

### When to use

Use `Button` to submit, save, create, or change something in the current task. For navigation to another page or a downloadable resource, use a link. Use `Checkbox` or `Switch` to represent a persistent choice; a pressed-looking button alone does not explain that state.

### Choose the emphasis

| Variant       | Use for                                                     | Avoid                                                      |
| ------------- | ----------------------------------------------------------- | ---------------------------------------------------------- |
| `primary`     | The next action that advances the task, such as Save        | Giving every action in a group equal emphasis              |
| `secondary`   | Supporting actions with a subtle filled background          | Actions that need primary emphasis                         |
| `outline`     | Supporting actions with a transparent background and border | Adding borders to every control                            |
| `ghost`       | Supporting actions in a row or toolbar with clear context   | Hiding the only way to complete the task in a dense screen |
| `destructive` | An action that removes data or has a costly consequence     | Ordinary cancellation or a recoverable validation error    |

Start with one primary action per task area. A dialog is a separate task area, so its confirmation can be primary even when the underlying page has a primary action. Repeated rows usually need secondary or ghost actions so each row does not compete for attention.

### Choose the size and placement

Start with `md`, the default. Use `sm` for compact rows and toolbars; use `lg` when the surrounding form or layout calls for a larger control. Keep related buttons the same size. Increasing size is not a substitute for choosing the right emphasis.

Use `icon-xs`, `icon-sm`, `icon-md`, `icon-lg`, or `icon-xl` for an icon-only action, and provide `aria-label`. Prefer a text label when the icon's meaning is unfamiliar. A shape changes the outline, not the meaning of the action.

Keep actions beside the content they affect and use the same order across similar screens. Content Row handles the first-line alignment of its title and action; do not compensate for descriptions with manual vertical padding.

### Labels and processing

Name the action with a verb and, when needed, its object: “Save changes” or “Delete project”. In a form, set `type="submit"` for submission and `type="button"` for other actions explicitly.

> `Button` does not provide a `loading` prop. Manage the pending state in the application, prevent duplicate submission, and show a processing label or `Spinner` with a text status. Do not use a disabled button as the only explanation for why an action is unavailable.

### Content alignment

Use `align` to position button content: `start`, `center` (default), `end`, or
`space-between`. Start and end follow the writing direction. Give the button
more width than its content to make alignment visible. Use `space-between`
to place a label and trailing icon at opposite ends.
