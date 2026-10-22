import { spacingVars, typo } from "@bolerish/tokens/semantic.stylex";
import { Calendar } from "@bolerish/ui/calendar";
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
export default function RangeSelection() {
  return (
    <div {...stylex.props(layout.preview)}>
      <Calendar mode="range" numberOfMonths={2} />
    </div>
  );
}
