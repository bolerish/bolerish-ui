import { typo, sizeVars, spacingVars } from "@bolerish/tokens/semantic.stylex";
import { Skeleton } from "@bolerish/ui/skeleton";
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
  card: {
    display: "flex",
    flexDirection: "column",
    gap: spacingVars.space3,
    maxWidth: sizeVars.contentSm,
    width: "100%",
  },
  title: {
    height: sizeVars.iconMd,
    width: "45%",
  },
  body: {
    height: sizeVars.controlMd,
    width: "100%",
  },
});
export default function Default() {
  return (
    <div {...stylex.props(layout.preview)}>
      <div {...stylex.props(styles.card)}>
        <Skeleton xstyle={styles.title} />
        <Skeleton xstyle={styles.body} />
      </div>
    </div>
  );
}
