import {
  colorVars,
  radiusVars,
  sizeVars,
  spacingVars,
  typographyVars,
} from "@nuee/tokens/semantic.stylex";
import * as stylex from "@stylexjs/stylex";
import type { ComponentProps } from "react";

import type { ControlPlacementStyles } from "./styles/control-layout";

const styles = stylex.create({
  root: {
    alignItems: "center",
    backgroundColor: colorVars.bgSubtle,
    borderColor: colorVars.strokeDefault,
    borderRadius: radiusVars.sm,
    borderStyle: "solid",
    borderWidth: sizeVars.stroke,
    color: colorVars.fgSecondary,
    display: "inline-flex",
    fontFamily: typographyVars.fontFamilyBody,
    fontSize: typographyVars.fontSizeSm,
    fontWeight: typographyVars.fontWeightMedium,
    justifyContent: "center",
    minHeight: sizeVars.iconLg,
    minWidth: sizeVars.iconLg,
    paddingInline: spacingVars.space1,
    userSelect: "none",
  },
  group: { alignItems: "center", display: "inline-flex", gap: spacingVars.space1 },
});

export function Kbd({
  xstyle,
  ...props
}: Omit<ComponentProps<"kbd">, "className" | "style"> & { xstyle?: ControlPlacementStyles }) {
  return <kbd {...props} {...stylex.props(styles.root, xstyle)} />;
}

export function KbdGroup({
  xstyle,
  ...props
}: Omit<ComponentProps<"span">, "className" | "style"> & { xstyle?: stylex.StyleXStyles }) {
  return <span {...props} {...stylex.props(styles.group, xstyle)} />;
}
