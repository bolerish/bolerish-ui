import { sizeVars, spacingVars, typographyVars } from "@bolerish/tokens/semantic.stylex";
import * as stylex from "@stylexjs/stylex";

import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Slider } from "@/components/ui/slider";
const layout = stylex.create({
  preview: {
    alignItems: "center",
    display: "flex",
    flexWrap: "wrap",
    fontSize: typographyVars.fontSizeSm,
    gap: spacingVars.space3,
    lineHeight: typographyVars.lineHeightNormal,
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
  stack: {
    display: "flex",
    flexDirection: "column",
    gap: spacingVars.space3,
  },
});
export default function Default() {
  return (
    <div {...stylex.props(layout.preview, layout.column)}>
      <div {...stylex.props(layout.stack, layout.formWidth)}>
        <Field>
          <FieldLabel>Notification volume</FieldLabel>
          <Slider defaultValue={40} />
          <FieldDescription>Use the arrow keys for fine adjustments.</FieldDescription>
        </Field>
        <Field>
          <FieldLabel>Price range</FieldLabel>
          <Slider
            defaultValue={[20, 80]}
            getAriaLabel={(index) => (index === 0 ? "Minimum price" : "Maximum price")}
          />
        </Field>
      </div>
    </div>
  );
}
