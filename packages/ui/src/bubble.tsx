import {
  colorVars,
  radiusVars,
  sizeVars,
  spacingVars,
  typo,
} from "@bolerish/tokens/semantic.stylex";
import * as stylex from "@stylexjs/stylex";
import type { ComponentProps } from "react";

const styles = stylex.create({
  root: {
    fontSize: typo.fontSizeSm,
    lineHeight: typo.lineHeightNormal,
    maxWidth: `min(${sizeVars.contentMd}, 100%)`,
    paddingBlock: spacingVars.space3,
    paddingInline: spacingVars.space4,
    whiteSpace: "pre-wrap",
  },
});

const alignStyles = stylex.create({
  start: {
    alignSelf: "flex-start",
    borderBottomLeftRadius: radiusVars.sm,
    borderRadius: radiusVars.sm,
  },
  end: {
    alignSelf: "flex-end",
    borderBottomRightRadius: radiusVars.sm,
    borderRadius: radiusVars.sm,
  },
});

const variantStyles = stylex.create({
  default: { backgroundColor: colorVars.bgSubtle, color: colorVars.fgPrimary },
  primary: {
    backgroundColor: colorVars.bgMessageOutgoing,
    color: colorVars.fgOnMessageOutgoing,
  },
  outline: {
    borderColor: colorVars.strokeDefault,
    borderStyle: "solid",
    borderWidth: sizeVars.stroke,
    color: colorVars.fgPrimary,
  },
});

export type BubbleAlign = "start" | "end";
export type BubbleVariant = "default" | "primary" | "outline";

export type BubbleProps = Omit<ComponentProps<"div">, "className" | "style"> & {
  align?: BubbleAlign;
  variant?: BubbleVariant;
  xstyle?: stylex.StyleXStyles;
};

export function Bubble({ align = "start", variant = "default", xstyle, ...props }: BubbleProps) {
  return (
    <div
      {...props}
      data-align={align}
      data-variant={variant}
      {...stylex.props(styles.root, alignStyles[align], variantStyles[variant], xstyle)}
    />
  );
}
