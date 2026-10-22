import { sizeVars, spacingVars, typo } from "@bolerish/tokens/semantic.stylex";
import * as stylex from "@stylexjs/stylex";

import { Field, FieldLabel } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
const layout = stylex.create({
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
  option: {
    alignItems: "center",
    display: "flex",
    gap: spacingVars.space3,
    minHeight: sizeVars.touchTarget,
  },
});
export default function Default() {
  return (
    <div {...stylex.props(layout.preview, layout.column)}>
      <Field>
        <FieldLabel>Notification frequency</FieldLabel>
        <RadioGroup defaultValue="daily">
          <Label {...stylex.props(layout.option)}>
            <RadioGroupItem value="daily" />
            Daily
          </Label>
          <Label {...stylex.props(layout.option)}>
            <RadioGroupItem value="weekly" />
            Weekly
          </Label>
          <Label {...stylex.props(layout.option)}>
            <RadioGroupItem value="never" />
            Never
          </Label>
        </RadioGroup>
      </Field>
    </div>
  );
}
