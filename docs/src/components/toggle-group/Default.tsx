import { spacingVars, typo } from "@bolerish/tokens/semantic.stylex";
import * as stylex from "@stylexjs/stylex";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
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
export default function Default() {
  return (
    <div {...stylex.props(layout.preview)}>
      <ToggleGroup aria-label="Text alignment" defaultValue={["left"]} variant="outline">
        <ToggleGroupItem value="left">Left</ToggleGroupItem>
        <ToggleGroupItem value="center">Center</ToggleGroupItem>
        <ToggleGroupItem value="right">Right</ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}
