import { spacingVars, typographyVars } from "@bolerish/tokens/semantic.stylex";
import * as stylex from "@stylexjs/stylex";

import { Button } from "@/components/ui/button";
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
