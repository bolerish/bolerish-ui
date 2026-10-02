import { colorVars } from "@nuee/tokens/semantic.stylex";
import * as stylex from "@stylexjs/stylex";
import type { ComponentProps } from "react";

import type { ControlPlacementStyles } from "./styles/control-layout";
import { typographyStyles } from "./typography";

const styles = stylex.create({
  root: { color: colorVars.fgPrimary, margin: 0 },
});

export type HeadingProps = Omit<ComponentProps<"h1">, "className" | "style"> & {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  size?: "page" | "section" | "subsection";
  xstyle?: ControlPlacementStyles;
};

const elements = { 1: "h1", 2: "h2", 3: "h3", 4: "h4", 5: "h5", 6: "h6" } as const;

export function Heading({ xstyle, level, size = "section", ...props }: HeadingProps) {
  const Element = elements[level];
  return <Element {...props} {...stylex.props(styles.root, typographyStyles[size], xstyle)} />;
}
