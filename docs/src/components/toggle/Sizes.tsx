import { spacingVars, typo } from "@bolerish/tokens/semantic.stylex";
import * as stylex from "@stylexjs/stylex";

import { Toggle } from "@/components/ui/toggle";
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
});
export default function Sizes() {
  return (
    <div {...stylex.props(layout.preview)}>
      <Toggle size="sm">Small</Toggle>
      <Toggle size="md">Default</Toggle>
      <Toggle size="lg">Large</Toggle>
    </div>
  );
}
