import { spacingVars, typo } from "@bolerish/tokens/semantic.stylex";
import { Button } from "@bolerish/ui/button";
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
});
export default function Variants() {
  return (
    <div {...stylex.props(layout.preview)}>
      <Button>Save</Button>
      <Button variant="secondary">Preview</Button>
      <Button variant="outline">Cancel</Button>
      <Button variant="ghost">Close</Button>
      <Button variant="destructive">Delete</Button>
    </div>
  );
}
