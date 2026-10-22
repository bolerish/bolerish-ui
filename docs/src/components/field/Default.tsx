import { colorVars, sizeVars, spacingVars, typo } from "@bolerish/tokens/semantic.stylex";
import { Checkbox } from "@bolerish/ui/checkbox";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldTitle,
} from "@bolerish/ui/field";
import { Input } from "@bolerish/ui/input";
import * as stylex from "@stylexjs/stylex";
const layout = stylex.create({
  description: {
    color: colorVars.fgSecondary,
    fontSize: typo.fontSizeSm,
    lineHeight: typo.lineHeightNormal,
    margin: 0,
  },
  preview: {
    alignItems: "center",
    display: "flex",
    flexWrap: "wrap",
    fontSize: typo.fontSizeSm,
    gap: spacingVars.space3,
    lineHeight: typo.lineHeightNormal,
    justifyContent: "center",
    width: "100%",
  },
  column: {
    alignItems: "stretch",
    flexDirection: "column",
  },
  formWidth: {
    maxWidth: sizeVars.contentSm,
    width: "100%",
  },
});
export default function Default() {
  return (
    <div {...stylex.props(layout.preview, layout.column)}>
      <form {...stylex.props(layout.formWidth)}>
        <FieldSet>
          <div>
            <FieldLegend>Payment details</FieldLegend>
            <p {...stylex.props(layout.description)}>
              Payment details are encrypted and handled securely.
            </p>
          </div>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="cardholder">Cardholder name</FieldLabel>
              <Input id="cardholder" autoComplete="cc-name" defaultValue="Jordan Lee" />
            </Field>
            <Field invalid>
              <FieldLabel htmlFor="card-number">Card number</FieldLabel>
              <Input
                id="card-number"
                aria-invalid
                autoComplete="cc-number"
                defaultValue="1234 5678 9012"
                inputMode="numeric"
              />
              <FieldDescription>Enter all 16 digits.</FieldDescription>
              <FieldError>The card number is incomplete.</FieldError>
            </Field>
            <Field orientation="horizontal">
              <Checkbox id="email-receipt" />
              <FieldLabel htmlFor="email-receipt">Email me a receipt.</FieldLabel>
            </Field>
            <Field orientation="horizontal">
              <Checkbox id="billing-address" defaultChecked />
              <FieldContent>
                <FieldTitle>Billing address is the same as shipping address.</FieldTitle>
                <FieldDescription>
                  Clear this option to use a different billing address.
                </FieldDescription>
              </FieldContent>
            </Field>
          </FieldGroup>
        </FieldSet>
      </form>
    </div>
  );
}
