import { colorVars, radiusVars, sizeVars, spacingVars } from "@bolerish/tokens/semantic.stylex";
import * as stylex from "@stylexjs/stylex";
import type { ComponentProps } from "react";

import type { ControlPlacementStyles } from "./styles/control-layout";
import { mergeStyles } from "./styles/merge-styles";
import type { StyledProps } from "./styles/merge-styles";
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

export type ContentRowProps = StyledProps<ComponentProps<"div">> & {
  size?: ContentRowSize;
  variant?: ContentRowVariant;
  xstyle?: stylex.StyleXStyles;
};

export function ContentRow({
  className,
  style,
  size = "default",
  variant = "default",
  xstyle,
  ...props
}: ContentRowProps) {
  return (
    <div
      {...props}
      {...mergeStyles(
        stylex.props(styles.root, sizeStyles[size], variantStyles[variant], xstyle),
        className,
        style,
      )}
    />
  );
}

export function ContentRowGroup({
  className,
  style,
  xstyle,
  ...props
}: StyledProps<ComponentProps<"div">> & { xstyle?: stylex.StyleXStyles }) {
  return <div {...props} {...mergeStyles(stylex.props(styles.group, xstyle), className, style)} />;
}

export type ContentRowMediaProps = StyledProps<ComponentProps<"div">> & {
  variant?: "avatar" | "icon" | "image";
  xstyle?: stylex.StyleXStyles;
};

export function ContentRowMedia({
  className,
  style,
  xstyle,
  variant = "icon",
  ...props
}: ContentRowMediaProps) {
  return (
    <div
      {...props}
      {...mergeStyles(
        stylex.props(styles.media, mediaVariantStyles[variant], xstyle),
        className,
        style,
      )}
    />
  );
}

export function ContentRowContent({
  className,
  style,
  xstyle,
  ...props
}: StyledProps<ComponentProps<"div">> & { xstyle?: stylex.StyleXStyles }) {
  return (
    <div {...props} {...mergeStyles(stylex.props(styles.content, xstyle), className, style)} />
  );
}

export function ContentRowTitle({
  className,
  style,
  xstyle,
  ...props
}: StyledProps<ComponentProps<"div">> & { xstyle?: ControlPlacementStyles }) {
  return (
    <div
      {...props}
      {...mergeStyles(stylex.props(typographyStyles.title, xstyle), className, style)}
    />
  );
}

export function ContentRowDescription({
  className,
  style,
  xstyle,
  ...props
}: StyledProps<ComponentProps<"p">> & { xstyle?: ControlPlacementStyles }) {
  return (
    <p
      {...props}
      {...mergeStyles(
        stylex.props(typographyStyles.description, styles.description, xstyle),
        className,
        style,
      )}
    />
  );
}

export function ContentRowActions({
  className,
  style,
  xstyle,
  ...props
}: StyledProps<ComponentProps<"div">> & { xstyle?: stylex.StyleXStyles }) {
  return (
    <div {...props} {...mergeStyles(stylex.props(styles.actions, xstyle), className, style)} />
  );
}
