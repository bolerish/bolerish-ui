import { sizeVars, spacingVars, typo } from "@bolerish/tokens/semantic.stylex";
import { Input } from "@bolerish/ui/input";
import { Label } from "@bolerish/ui/label";
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
