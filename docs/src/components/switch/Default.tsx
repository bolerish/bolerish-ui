import { sizeVars, spacingVars, typographyVars } from "@bolerish/tokens/semantic.stylex";
import * as stylex from "@stylexjs/stylex";

import { Switch } from "@/components/ui/switch";
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
  option: {
    alignItems: "center",
    display: "flex",
    gap: spacingVars.space3,
    minHeight: sizeVars.touchTarget,
  },
});
export default function Default() {
  return (
    <div {...stylex.props(layout.preview, layout.column)}>
      <label htmlFor="activity-visibility" {...stylex.props(layout.option)}>
        <Switch defaultChecked id="activity-visibility" />
        Show activity status
      </label>
      <label htmlFor="admin-only" {...stylex.props(layout.option)}>
        <Switch disabled id="admin-only" />
        Admin-only setting
      </label>
    </div>
  );
}
