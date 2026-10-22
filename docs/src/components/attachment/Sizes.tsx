import { spacingVars, typographyVars } from "@bolerish/tokens/semantic.stylex";
import * as stylex from "@stylexjs/stylex";

import { Attachment } from "@/components/ui/attachment";
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
  componentWidth: {
    maxWidth: "28rem",
    width: "100%",
  },
});
export default function Sizes() {
  return (
    <div {...stylex.props(layout.preview, [layout.column, layout.componentWidth])}>
      <Attachment size="xs">Extra small attachment</Attachment>
      <Attachment size="sm">Small attachment</Attachment>
      <Attachment>Default attachment</Attachment>
    </div>
  );
}
