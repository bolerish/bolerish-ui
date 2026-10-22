import { colorVars, sizeVars, spacingVars, typographyVars } from "@bolerish/tokens/semantic.stylex";
import * as stylex from "@stylexjs/stylex";
import type { ComponentProps } from "react";

import type { ControlPlacementStyles } from "./styles/control-layout";

const styles = stylex.create({
  root: {
    alignItems: "center",
    color: colorVars.fgSecondary,
    display: "inline-flex",
    fontSize: typographyVars.fontSizeXs,
    fontWeight: typographyVars.fontWeightMedium,
    gap: spacingVars.space2,
    lineHeight: typographyVars.lineHeightNormal,
    minWidth: 0,
  },

  icon: { alignItems: "center", display: "inline-flex", flexShrink: 0 },
  content: { overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" },
});

const variantStyles = stylex.create({
  default: {},
  border: {
    borderBottomColor: colorVars.strokeDefault,
    borderBottomStyle: "solid",
    borderBottomWidth: sizeVars.stroke,
    paddingBottom: spacingVars.space2,
  },
  separator: {
    display: "flex",
    width: "100%",
    "::before": {
      backgroundColor: colorVars.strokeDefault,
      content: "",
      flex: 1,
      height: sizeVars.stroke,
    },
    "::after": {
      backgroundColor: colorVars.strokeDefault,
      content: "",
      flex: 1,
      height: sizeVars.stroke,
    },
  },
});

export type MarkerProps = Omit<ComponentProps<"div">, "className" | "style"> & {
  variant?: "border" | "default" | "separator";
  xstyle?: stylex.StyleXStyles;
};

export function Marker({ variant = "default", xstyle, ...props }: MarkerProps) {
  return <div {...props} {...stylex.props(styles.root, variantStyles[variant], xstyle)} />;
}

export function MarkerIcon({
  xstyle,
  ...props
}: Omit<ComponentProps<"span">, "className" | "style"> & { xstyle?: ControlPlacementStyles }) {
  return <span aria-hidden="true" {...props} {...stylex.props(styles.icon, xstyle)} />;
}

export function MarkerContent({
  xstyle,
  ...props
}: Omit<ComponentProps<"span">, "className" | "style"> & { xstyle?: stylex.StyleXStyles }) {
  return <span {...props} {...stylex.props(styles.content, xstyle)} />;
}
