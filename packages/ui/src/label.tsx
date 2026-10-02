import { colorVars, spacingVars } from "@nuee/tokens/semantic.stylex";
/* oxlint-disable jsx-a11y/label-has-associated-control -- The caller provides htmlFor or nests the control. */
import * as stylex from "@stylexjs/stylex";
import type { ComponentProps } from "react";

import type { ControlPlacementStyles } from "./styles/control-layout";
import { typographyStyles } from "./typography";

const styles = stylex.create({
  root: {
    alignItems: "center",
    color: colorVars.fgPrimary,
    cursor: "pointer",
    display: "inline-flex",
    gap: spacingVars.space2,
    userSelect: "none",
  },
});

export type LabelProps = Omit<ComponentProps<"label">, "className" | "style"> & {
  xstyle?: ControlPlacementStyles;
};

export function Label({ xstyle, ...props }: LabelProps) {
  return <label {...props} {...stylex.props(typographyStyles.title, styles.root, xstyle)} />;
}
