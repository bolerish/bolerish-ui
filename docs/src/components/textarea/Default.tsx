import { sizeVars, spacingVars, typographyVars } from "@bolerish/tokens/semantic.stylex";
import * as stylex from "@stylexjs/stylex";

import { Textarea } from "@/components/ui/textarea";
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
  column: {
    alignItems: "stretch",
    flexDirection: "column",
  },
  formWidth: {
    maxWidth: sizeVars.contentSm,
    width: "100%",
  },
  stack: {
    display: "flex",
    flexDirection: "column",
    gap: spacingVars.space3,
  },
});
export default function Default() {
  return (
    <div {...stylex.props(layout.preview, layout.column)}>
      <div {...stylex.props(layout.stack, layout.formWidth)}>
        <Textarea aria-label="Note" placeholder="Write down the decisions from the meeting." />
        <Textarea
          aria-label="Read-only note"
          disabled
          defaultValue="This note has been reviewed."
        />
      </div>
    </div>
  );
}
