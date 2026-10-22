import { spacingVars, typo } from "@bolerish/tokens/semantic.stylex";
import { Bubble } from "@bolerish/ui/bubble";
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
  column: {
    alignItems: "stretch",
    flexDirection: "column",
  },
});
export default function Variants() {
  return (
    <div {...stylex.props(layout.preview, layout.column)}>
      <Bubble>Filled message</Bubble>
      <Bubble align="end" variant="primary">
        Sent message
      </Bubble>
      <Bubble variant="outline">Outlined message</Bubble>
    </div>
  );
}
