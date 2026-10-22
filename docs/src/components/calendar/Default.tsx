import { spacingVars, typographyVars } from "@bolerish/tokens/semantic.stylex";
import * as stylex from "@stylexjs/stylex";
import { useState } from "react";

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
