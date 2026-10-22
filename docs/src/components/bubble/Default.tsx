import { spacingVars, typo } from "@bolerish/tokens/semantic.stylex";
import * as stylex from "@stylexjs/stylex";

import { Bubble } from "@/components/ui/bubble";
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
  return (
    <div {...stylex.props(layout.preview, layout.column)}>
      <Bubble>Could you review today’s meeting materials?</Bubble>
      <Bubble align="end" variant="primary">
        Yes, I’ll leave feedback before 3 PM.
      </Bubble>
    </div>
  );
}
