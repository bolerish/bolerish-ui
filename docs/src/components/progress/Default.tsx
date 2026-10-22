import { sizeVars, spacingVars, typo } from "@bolerish/tokens/semantic.stylex";
import * as stylex from "@stylexjs/stylex";

import { Progress } from "@/components/ui/progress";
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
  column: {
    alignItems: "stretch",
    flexDirection: "column",
  },
  formWidth: {
    maxWidth: sizeVars.contentSm,
    width: "100%",
  },
});
export default function Default() {
  return (
    <div {...stylex.props(layout.preview, layout.column)}>
      <Progress aria-label="File upload progress" value={64} xstyle={layout.formWidth} />
      <Progress aria-label="In progress" value={null} xstyle={layout.formWidth} />
    </div>
  );
}
