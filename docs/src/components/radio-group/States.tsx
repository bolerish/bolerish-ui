import { sizeVars, spacingVars } from "@bolerish/tokens/semantic.stylex";
import * as stylex from "@stylexjs/stylex";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
const layout = stylex.create({
  option: {
    alignItems: "center",
    display: "flex",
    gap: spacingVars.space3,
    minHeight: sizeVars.touchTarget,
  },
});
export default function States() {
  return (
    <RadioGroup defaultValue="daily">
      <Label {...stylex.props(layout.option)}>
        <RadioGroupItem value="daily" />
        Selected
      </Label>
      <Label {...stylex.props(layout.option)}>
        <RadioGroupItem value="weekly" />
        Available
      </Label>
      <Label {...stylex.props(layout.option)}>
        <RadioGroupItem disabled value="never" />
        Unavailable
      </Label>
    </RadioGroup>
  );
}
