## Usage guidelines

### Props

| Prop    | Default   | Values                          | Meaning                                                 |
| ------- | --------- | ------------------------------- | ------------------------------------------------------- |
| `level` | Required  | `1`, `2`, `3`, `4`, `5`, `6`    | Sets the HTML heading level for document structure.     |
| `size`  | `section` | `page`, `section`, `subsection` | Chooses visual size independently of the heading level. |

The required `level` selects an HTML heading from 1 to 6. Choose `page`, `section`, or `subsection` for `size`; the default is `section`. These sizes pair `fontSizeXl`, `fontSizeLg`, or `fontSizeMd` with `fontWeightSemibold` and `lineHeightTight`.

> Do not change the heading level just to make text larger. The example demonstrates all supported headings from h1 to h6. In a real page, choose levels according to the document structure.
