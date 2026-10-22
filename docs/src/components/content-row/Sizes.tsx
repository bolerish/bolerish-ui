import { spacingVars, typographyVars } from "@bolerish/tokens/semantic.stylex";
import * as stylex from "@stylexjs/stylex";

import { ContentRow } from "@/components/ui/content-row";
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
      <ContentRow size="xs">Extra small row</ContentRow>
      <ContentRow size="sm">Small row</ContentRow>
      <ContentRow>Default row</ContentRow>
    </div>
  );
}
