import { spacingVars, typo } from "@bolerish/tokens/semantic.stylex";
import { Avatar, AvatarFallback } from "@bolerish/ui/avatar";
import { AvatarGroup, AvatarGroupCount } from "@bolerish/ui/avatar";
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
export default function Default() {
  return (
    <div {...stylex.props(layout.preview)}>
      <AvatarGroup>
        <Avatar>
          <AvatarFallback>JL</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback>SK</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback>MH</AvatarFallback>
        </Avatar>
        <AvatarGroupCount>+4</AvatarGroupCount>
      </AvatarGroup>
    </div>
  );
}
