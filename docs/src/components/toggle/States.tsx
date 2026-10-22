import { spacingVars, typo } from "@bolerish/tokens/semantic.stylex";
import { Toggle } from "@bolerish/ui/toggle";
import * as stylex from "@stylexjs/stylex";
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
export default function States() {
  return (
    <div {...stylex.props(layout.preview)}>
      <Toggle>Off</Toggle>
      <Toggle defaultPressed>On</Toggle>
      <Toggle disabled>Unavailable</Toggle>
    </div>
  );
}
