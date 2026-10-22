## Usage guidelines

### Props

| Prop   | Default | Values     | Meaning                                |
| ------ | ------- | ---------- | -------------------------------------- |
| `size` | `md`    | `sm`, `md` | Changes track and thumb size together. |

### When to use

Use `Switch` for an on/off setting whose effect is immediate, such as enabling notifications. Use [Checkbox](?path=/docs/components-checkbox--docs) for a choice submitted with a form or membership in a selection group.

### State and saving

Name the setting, not the next action: “Email notifications” remains the label in both states. If saving fails, restore the confirmed state and explain the failure nearby. Do not leave an optimistic state looking successfully saved after a rejected request.

> Start with the default `md` size; use `sm` only when the surrounding controls need a compact layout. Keep the name and current state clear at either size.
