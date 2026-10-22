import { colorVars } from "@bolerish/tokens/semantic.stylex";
import * as stylex from "@stylexjs/stylex";
import type { ComponentProps } from "react";

import type { ControlLayoutStyles } from "./styles/control-layout";
import { typographyStyles } from "./typography";

const styles = stylex.create({
  root: { color: colorVars.fgPrimary, margin: 0 },
  description: { color: colorVars.fgSecondary },
  caption: { color: colorVars.fgTertiary },
});

export type PProps = Omit<ComponentProps<"p">, "className" | "style"> & {
  variant?: "body" | "description" | "caption";
  xstyle?: ControlLayoutStyles;
};

export function P({ variant = "body", xstyle, ...props }: PProps) {
  return (
    <p
      {...props}
      {...stylex.props(
        styles.root,
        typographyStyles[variant],
        variant !== "body" && styles[variant],
        xstyle,
      )}
    />
  );
}
