import { spacingVars, typo } from "@bolerish/tokens/semantic.stylex";
import * as stylex from "@stylexjs/stylex";

import { Avatar, AvatarBadge, AvatarFallback } from "@/components/ui/avatar";
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
      <Avatar size="sm">
        <AvatarFallback>MJ</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>MY</AvatarFallback>
      </Avatar>
      <Avatar size="lg">
        <AvatarFallback>DS</AvatarFallback>
        <AvatarBadge />
      </Avatar>
    </div>
  );
}
