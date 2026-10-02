## Usage guidelines

### When to use

Use `Field` to group an input's label, help, and error. Use `FieldGroup` for related inputs, and `FieldSet` with `FieldLegend` for choices that need a shared name.

### Connect labels and descriptions

Match `FieldLabel`'s `htmlFor` to the input's `id`. Put format requirements or constraints in `FieldDescription` and include its ID in the input's `aria-describedby`. Use placeholders for example values.

For a checkbox with supporting text, place `FieldContent` inside a horizontal `Field`. The checkbox aligns with the title's first line even when the description wraps. `FieldTitle` alone does not give a control an accessible name, so verify its label association.

### Show errors

Validate required values on submission. After a failed attempt, update each field's error as the user corrects it and preserve entered values. Do not show errors before users have had a chance to enter a value.

Set `invalid` on `Field` and `aria-invalid` on an invalid input. Include `FieldError`'s ID in the input's `aria-describedby`. Error styling and the description association are separate requirements.

Describe the correction, such as “Include @ in the email address.” For long forms, provide a summary linking to invalid inputs and move focus to the summary or first invalid input after submission.

### Submission state

Validation and server requests belong to the application. Prevent duplicate requests while submitting. Preserve values and offer a retry after failure.

> Show rejected values in their `Field` and network failures with the form's submission status. Do not put errors that block completion only in a Toast.

Combine the normal input surface, an error border and `FieldError`. Use `FieldError match` to show an externally determined error, such as a server validation message. `invalid` sets the invalid state separately from the message matching condition. Keep input values and use Banner for a form-level request failure.
