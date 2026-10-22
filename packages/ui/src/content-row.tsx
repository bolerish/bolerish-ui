import { colorVars, radiusVars, sizeVars, spacingVars } from "@bolerish/tokens/semantic.stylex";
import * as stylex from "@stylexjs/stylex";
import type { ComponentProps } from "react";

import type { ControlPlacementStyles } from "./styles/control-layout";
import { typographyStyles } from "./typography";

const styles = stylex.create({
  root: {
    alignItems: "center",
    borderColor: "transparent",
    borderRadius: radiusVars.sm,
    borderStyle: "solid",
    borderWidth: sizeVars.stroke,
    color: colorVars.fgPrimary,
    display: "flex",
    minWidth: 0,
    width: "100%",
  },

  group: { display: "flex", flexDirection: "column", gap: spacingVars.space2, width: "100%" },
  media: {
    alignItems: "center",
    display: "flex",
    flexShrink: 0,
    justifyContent: "center",
    overflow: "hidden",
  },

  content: {
    alignSelf: "baseline",
    display: "flex",
    flex: 1,
    flexDirection: "column",
    gap: spacingVars.space1,
    minWidth: 0,
  },
  description: {
    color: colorVars.fgSecondary,
    margin: 0,
  },
  actions: {
    alignItems: "baseline",
    alignSelf: "baseline",
    display: "flex",
    flexShrink: 0,
    gap: spacingVars.space2,
  },
});

const mediaVariantStyles = stylex.create({
  icon: {
    backgroundColor: colorVars.bgSubtle,
    borderRadius: radiusVars.sm,
    color: colorVars.fgSecondary,
    height: sizeVars.controlMd,
    width: sizeVars.controlMd,
  },
  avatar: { borderRadius: radiusVars.full },
  image: {
    borderRadius: radiusVars.sm,
    height: sizeVars.touchTarget,
    width: sizeVars.touchTarget,
  },
});

const sizeStyles = stylex.create({
  default: { gap: spacingVars.space3, minHeight: "4rem", padding: spacingVars.space4 },
  sm: { gap: spacingVars.space3, minHeight: sizeVars.touchTarget, padding: spacingVars.space3 },
  xs: { gap: spacingVars.space2, minHeight: sizeVars.controlSm, padding: spacingVars.space2 },
});

const variantStyles = stylex.create({
  default: { backgroundColor: "transparent" },
  muted: { backgroundColor: colorVars.bgSubtle },
  outline: { backgroundColor: colorVars.bgSurface, borderColor: colorVars.strokeDefault },
});

export type ContentRowSize = "default" | "sm" | "xs";
export type ContentRowVariant = "default" | "muted" | "outline";

export type ContentRowProps = Omit<ComponentProps<"div">, "className" | "style"> & {
  size?: ContentRowSize;
  variant?: ContentRowVariant;
  xstyle?: stylex.StyleXStyles;
};

export function ContentRow({
  size = "default",
  variant = "default",
  xstyle,
  ...props
}: ContentRowProps) {
  return (
    <div
      {...props}
      {...stylex.props(styles.root, sizeStyles[size], variantStyles[variant], xstyle)}
    />
  );
}

export function ContentRowGroup({
  xstyle,
  ...props
}: Omit<ComponentProps<"div">, "className" | "style"> & { xstyle?: stylex.StyleXStyles }) {
  return <div {...props} {...stylex.props(styles.group, xstyle)} />;
}

export type ContentRowMediaProps = Omit<ComponentProps<"div">, "className" | "style"> & {
  variant?: "avatar" | "icon" | "image";
  xstyle?: stylex.StyleXStyles;
};

export function ContentRowMedia({ xstyle, variant = "icon", ...props }: ContentRowMediaProps) {
  return <div {...props} {...stylex.props(styles.media, mediaVariantStyles[variant], xstyle)} />;
}

export function ContentRowContent({
  xstyle,
  ...props
}: Omit<ComponentProps<"div">, "className" | "style"> & { xstyle?: stylex.StyleXStyles }) {
  return <div {...props} {...stylex.props(styles.content, xstyle)} />;
}

export function ContentRowTitle({
  xstyle,
  ...props
}: Omit<ComponentProps<"div">, "className" | "style"> & { xstyle?: ControlPlacementStyles }) {
  return <div {...props} {...stylex.props(typographyStyles.title, xstyle)} />;
}

export function ContentRowDescription({
  xstyle,
  ...props
}: Omit<ComponentProps<"p">, "className" | "style"> & { xstyle?: ControlPlacementStyles }) {
  return (
    <p {...props} {...stylex.props(typographyStyles.description, styles.description, xstyle)} />
  );
}

export function ContentRowActions({
  xstyle,
  ...props
}: Omit<ComponentProps<"div">, "className" | "style"> & { xstyle?: stylex.StyleXStyles }) {
  return <div {...props} {...stylex.props(styles.actions, xstyle)} />;
}
