## Usage guidelines

### Props

| Prop       | Default | Values                | Meaning                                                                                      |
| ---------- | ------- | --------------------- | -------------------------------------------------------------------------------------------- |
| `size`     | `md`    | `sm`, `md`            | Controls notice spacing and density.                                                         |
| `announce` | Unset   | `polite`, `assertive` | Announces a dynamically added or updated notice. Reserve assertive for urgent interruptions. |

### When to use

Use `Banner` for a page or section condition users need to keep in view, such as a connection problem or an upcoming interruption. Place it near the affected area. Use [Toast](?path=/docs/components-toast--docs) for a brief result and `FieldError` for a specific invalid input.

### Message and action

State what happened, how it affects the task, and what the user can do. Use the `action` slot for a relevant next step, such as Retry. Keep unrelated promotions or commands out of a status message.

The default `md` size supports a title and description. Use `sm` for compact guidance when the message still fits comfortably. `Banner` has no semantic `variant` prop; do not imply that warning or error variants are built in.

### Announcements

> Static guidance does not need a live announcement. For a message added or updated after the page loads, use `announce="polite"` for routine status and `announce="assertive"` only for urgent interruption. An explicit `role` overrides the role selected by `announce`. Avoid announcing the same event through both `Banner` and Toast.
