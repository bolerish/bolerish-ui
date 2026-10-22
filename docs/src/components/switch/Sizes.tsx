import { spacingVars, typo } from "@bolerish/tokens/semantic.stylex";
import * as stylex from "@stylexjs/stylex";

import { Switch } from "@/components/ui/switch";
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
});
export default function Sizes() {
  return (
    <div {...stylex.props(layout.preview)}>
      <Switch aria-label="Small switch" size="sm" />
      <Switch aria-label="Default switch" size="md" />
    </div>
  );
}
