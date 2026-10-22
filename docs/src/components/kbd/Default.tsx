import { spacingVars, typo } from "@bolerish/tokens/semantic.stylex";
import * as stylex from "@stylexjs/stylex";

import { Kbd, KbdGroup } from "@/components/ui/kbd";
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
      <KbdGroup>
        <Kbd>⌘</Kbd>
        <Kbd>K</Kbd>
      </KbdGroup>
      <KbdGroup>
        <Kbd>⇧</Kbd>
        <Kbd>Enter</Kbd>
      </KbdGroup>
    </div>
  );
}
