import { sizeVars, spacingVars, typographyVars, colorVars } from "@bolerish/tokens/semantic.stylex";
import * as stylex from "@stylexjs/stylex";

import { Checkbox } from "@/components/ui/checkbox";
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
  option: {
    alignItems: "center",
    display: "flex",
    gap: spacingVars.space3,
    minHeight: sizeVars.touchTarget,
  },
});
const styles = stylex.create({
  disabledOption: {
    color: colorVars.fgDisabled,
    cursor: "not-allowed",
  },
});
export default function States() {
  return (
    <div {...stylex.props(layout.preview, layout.column)}>
      <label htmlFor="not-selected" {...stylex.props(layout.option)}>
        <Checkbox id="not-selected" />
        Not selected
      </label>
      <label htmlFor="selected" {...stylex.props(layout.option)}>
        <Checkbox defaultChecked id="selected" />
        Selected
      </label>
      <label htmlFor="unavailable" {...stylex.props(layout.option, styles.disabledOption)}>
        <Checkbox disabled id="unavailable" />
        Unavailable
      </label>
    </div>
  );
}
