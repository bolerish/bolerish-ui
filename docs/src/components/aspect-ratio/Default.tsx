import { spacingVars, typo, colorVars, sizeVars } from "@bolerish/tokens/semantic.stylex";
import { AspectRatio } from "@bolerish/ui/aspect-ratio";
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
const styles = stylex.create({
  preview: {
    alignItems: "center",
    backgroundColor: colorVars.bgSubtle,
    color: colorVars.fgSecondary,
    display: "flex",
    justifyContent: "center",
    maxWidth: sizeVars.contentSm,
  },
});
export default function Default() {
  return (
    <div {...stylex.props(layout.preview)}>
      <AspectRatio ratio={16 / 9} xstyle={styles.preview}>
        16:9
      </AspectRatio>
    </div>
  );
}
