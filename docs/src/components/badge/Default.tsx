import { spacingVars, typographyVars } from "@bolerish/tokens/semantic.stylex";
import * as stylex from "@stylexjs/stylex";

import { Badge } from "@/components/ui/badge";
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
export default function Default() {
  return (
    <div {...stylex.props(layout.preview)}>
      <Badge>In progress</Badge>
      <Badge variant="secondary">Draft</Badge>
      <Badge variant="destructive">Error</Badge>
      <Badge variant="outline">Unread</Badge>
      <Badge variant="ghost">Optional</Badge>
    </div>
  );
}
