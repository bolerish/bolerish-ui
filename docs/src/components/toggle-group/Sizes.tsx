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
export default function Sizes() {
  return (
    <div {...stylex.props(layout.preview)}>
      <ToggleGroup aria-label="Small alignment" defaultValue={["left"]} size="sm">
        <ToggleGroupItem value="left">Left</ToggleGroupItem>
      </ToggleGroup>
      <ToggleGroup aria-label="Default alignment" defaultValue={["left"]} size="md">
        <ToggleGroupItem value="left">Left</ToggleGroupItem>
      </ToggleGroup>
      <ToggleGroup aria-label="Large alignment" defaultValue={["left"]} size="lg">
        <ToggleGroupItem value="left">Left</ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}
