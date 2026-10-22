import { spacingVars, typo } from "@bolerish/tokens/semantic.stylex";
import * as stylex from "@stylexjs/stylex";

import { Slider } from "@/components/ui/slider";
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
});
export default function States() {
  return (
    <div {...stylex.props(layout.preview, layout.column)}>
      <Slider aria-label="Adjustable volume" defaultValue={[60]} />
      <Slider aria-label="Unavailable volume" defaultValue={[60]} disabled />
    </div>
  );
}
