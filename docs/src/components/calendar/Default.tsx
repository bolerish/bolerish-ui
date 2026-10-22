import { spacingVars, typo } from "@bolerish/tokens/semantic.stylex";
import { Calendar } from "@bolerish/ui/calendar";
import * as stylex from "@stylexjs/stylex";
import { useState } from "react";
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
export default function Default() {
  const [date, setDate] = useState<Date>();
  return (
    <div {...stylex.props(layout.preview, layout.column)}>
      <Calendar mode="single" onSelect={setDate} selected={date} />
    </div>
  );
}
