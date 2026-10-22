## Usage guidelines

### Props

| Prop      | Default | Values                           | Meaning                                                                       |
| --------- | ------- | -------------------------------- | ----------------------------------------------------------------------------- |
| `variant` | `body`  | `body`, `description`, `caption` | Chooses body, supporting description, or caption styling. Always renders a p. |

Choose `body` (default), `description`, or `caption` for `variant`. At default density their font sizes are 16px, 14px and 12px, with a 1.5 line height. Body copy uses `fgPrimary`, descriptions use `fgSecondary`, and captions use `fgTertiary`. Every variant renders an HTML `p`.

Choose the visual role with `variant` rather than `type`. Paragraphs have no outer margin; use placement margins through `xstyle` or the parent's `gap`. Standard paragraph attributes, including `id` and `aria-describedby`, are forwarded.

> Use `Heading` for headings. Keep input names, descriptions and validation errors in `FieldLabel`, `FieldDescription` and `FieldError`, which manage their accessibility relationships. Do not shrink essential instructions into captions.

`P` and `PProps` remain compatibility aliases. Use `Paragraph` and `ParagraphProps` in new code.
