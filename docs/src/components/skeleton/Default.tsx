import { typographyVars, sizeVars, spacingVars } from "@bolerish/tokens/semantic.stylex";
import * as stylex from "@stylexjs/stylex";

import { Skeleton } from "@/components/ui/skeleton";
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
