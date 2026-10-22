import { spacingVars, typographyVars } from "@bolerish/tokens/semantic.stylex";
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
});
export default function States() {
  return (
    <div {...stylex.props(layout.preview)}>
      <Switch aria-label="Off" />
      <Switch aria-label="On" defaultChecked />
      <Switch aria-label="Unavailable" disabled />
    </div>
  );
}
