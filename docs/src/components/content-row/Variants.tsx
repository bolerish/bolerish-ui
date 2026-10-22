import { spacingVars, typo } from "@bolerish/tokens/semantic.stylex";
import * as stylex from "@stylexjs/stylex";

import { ContentRow } from "@/components/ui/content-row";
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
  componentWidth: {
    maxWidth: "28rem",
    width: "100%",
  },
});
export default function Variants() {
  return (
    <div {...stylex.props(layout.preview, [layout.column, layout.componentWidth])}>
      <ContentRow>Default row</ContentRow>
      <ContentRow variant="muted">Muted row</ContentRow>
      <ContentRow variant="outline">Outlined row</ContentRow>
    </div>
  );
}
