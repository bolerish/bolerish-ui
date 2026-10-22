import { sizeVars, spacingVars, typographyVars } from "@bolerish/tokens/semantic.stylex";
import * as stylex from "@stylexjs/stylex";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  field: {
    display: "flex",
    flexDirection: "column",
    gap: spacingVars.space2,
  },
  formWidth: {
    maxWidth: sizeVars.contentSm,
    width: "100%",
  },
});
export default function Default() {
  return (
    <div {...stylex.props(layout.preview, layout.column)}>
      <div {...stylex.props(layout.field, layout.formWidth)}>
        <Label htmlFor="display-name">Display name</Label>
        <Input id="display-name" placeholder="Jordan Lee" />
      </div>
    </div>
  );
}
