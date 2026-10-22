import { spacingVars, typo } from "@bolerish/tokens/semantic.stylex";
import { ToggleGroup, ToggleGroupItem } from "@bolerish/ui/toggle-group";
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
      <ToggleGroup aria-label="Default alignment" defaultValue={["left"]}>
        <ToggleGroupItem value="left">Left</ToggleGroupItem>
        <ToggleGroupItem value="right">Right</ToggleGroupItem>
      </ToggleGroup>
      <ToggleGroup aria-label="Outlined alignment" defaultValue={["left"]} variant="outline">
        <ToggleGroupItem value="left">Left</ToggleGroupItem>
        <ToggleGroupItem value="right">Right</ToggleGroupItem>
      </ToggleGroup>
      <ToggleGroup aria-label="Soft alignment" defaultValue={["left"]} variant="soft">
        <ToggleGroupItem value="left">Left</ToggleGroupItem>
        <ToggleGroupItem value="right">Right</ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}
