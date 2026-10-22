import { spacingVars, typographyVars } from "@bolerish/tokens/semantic.stylex";
import * as stylex from "@stylexjs/stylex";

import { Calendar } from "@/components/ui/calendar";
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
});
export default function RangeSelection() {
  return (
    <div {...stylex.props(layout.preview)}>
      <Calendar mode="range" numberOfMonths={2} />
    </div>
  );
}
