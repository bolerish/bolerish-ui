import { typo, sizeVars, spacingVars } from "@bolerish/tokens/semantic.stylex";
import * as stylex from "@stylexjs/stylex";

import { Separator } from "@/components/ui/separator";
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
const styles = stylex.create({
  row: {
    alignItems: "center",
    display: "flex",
    gap: spacingVars.space4,
    height: sizeVars.touchTarget,
  },
});
export default function Default() {
  return (
    <div {...stylex.props(layout.preview, layout.column)}>
      <span>Account information</span>
      <Separator />
      <div {...stylex.props(styles.row)}>
        <span>Profile</span>
        <Separator orientation="vertical" />
        <span>Security</span>
      </div>
    </div>
  );
}
