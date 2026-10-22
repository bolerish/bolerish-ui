import { sizeVars, spacingVars, typo, colorVars } from "@bolerish/tokens/semantic.stylex";
import { Checkbox } from "@bolerish/ui/checkbox";
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
export default function Default() {
  return (
    <div {...stylex.props(layout.preview, layout.column)}>
      <label htmlFor="email-updates" {...stylex.props(layout.option)}>
        <Checkbox defaultChecked id="email-updates" />
        Receive updates by email
      </label>
      <label htmlFor="admin-setting" {...stylex.props(layout.option, styles.disabledOption)}>
        <Checkbox disabled id="admin-setting" />
        Set by an administrator · Cannot be changed
      </label>
      <label htmlFor="required-setting" {...stylex.props(layout.option, styles.disabledOption)}>
        <Checkbox defaultChecked disabled id="required-setting" />
        Required setting · Always on
      </label>
    </div>
  );
}
