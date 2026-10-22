"use client";

import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar";
import {
  colorVars,
  radiusVars,
  sizeVars,
  spacingVars,
  typographyVars,
} from "@bolerish/tokens/semantic.stylex";
import * as stylex from "@stylexjs/stylex";
import type { ComponentProps } from "react";

import type { ControlPlacementStyles } from "./styles/control-layout";

const styles = stylex.create({
  root: {
    backgroundColor: colorVars.bgSubtle,
    borderColor: colorVars.bgSurface,
    borderRadius: radiusVars.full,
    borderStyle: "solid",
    borderWidth: sizeVars.stroke,
    color: colorVars.fgSecondary,
    display: "inline-flex",
    flexShrink: 0,
    overflow: "visible",
    position: "relative",
  },

  image: {
    borderRadius: "inherit",
    height: "100%",
    objectFit: "cover",
    overflow: "hidden",
    width: "100%",
  },
  fallback: {
    alignItems: "center",
    borderRadius: "inherit",
    display: "flex",
    fontSize: typographyVars.fontSizeXs,
    fontWeight: typographyVars.fontWeightMedium,
    height: "100%",
    justifyContent: "center",
    overflow: "hidden",
    width: "100%",
  },
  badge: {
    backgroundColor: colorVars.fgFeedbackSuccess,
    borderColor: colorVars.bgSurface,
    borderRadius: radiusVars.full,
    borderStyle: "solid",
    borderWidth: "0.125rem",
    bottom: "-0.0625rem",
    height: "0.75rem",
    position: "absolute",
    right: "-0.0625rem",
    width: "0.75rem",
  },
  group: { display: "flex", gap: spacingVars.space1 },
  groupCount: {
    alignItems: "center",
    backgroundColor: colorVars.bgSubtle,
    borderColor: colorVars.bgSurface,
    borderRadius: radiusVars.full,
    borderStyle: "solid",
    borderWidth: "0.125rem",
    color: colorVars.fgSecondary,
    display: "inline-flex",
    fontSize: typographyVars.fontSizeXs,
    fontWeight: typographyVars.fontWeightMedium,
    height: sizeVars.controlMd,
    justifyContent: "center",
    width: sizeVars.controlMd,
  },
});

const sizeStyles = stylex.create({
  sm: { height: sizeVars.controlSm, width: sizeVars.controlSm },
  md: { height: sizeVars.controlMd, width: sizeVars.controlMd },
  lg: { height: sizeVars.controlLg, width: sizeVars.controlLg },
});

export type AvatarSize = "lg" | "md" | "sm";

export type AvatarProps = Omit<
  ComponentProps<typeof AvatarPrimitive.Root>,
  "className" | "style"
> & {
  size?: AvatarSize;
  xstyle?: ControlPlacementStyles;
};

export function Avatar({ xstyle, size = "md", ...props }: AvatarProps) {
  return (
    <AvatarPrimitive.Root {...props} {...stylex.props(styles.root, sizeStyles[size], xstyle)} />
  );
}

export function AvatarImage({
  xstyle,
  ...props
}: Omit<ComponentProps<typeof AvatarPrimitive.Image>, "className" | "style"> & {
  xstyle?: ControlPlacementStyles;
}) {
  return <AvatarPrimitive.Image {...props} {...stylex.props(styles.image, xstyle)} />;
}

export function AvatarFallback({
  xstyle,
  ...props
}: Omit<ComponentProps<typeof AvatarPrimitive.Fallback>, "className" | "style"> & {
  xstyle?: ControlPlacementStyles;
}) {
  return <AvatarPrimitive.Fallback {...props} {...stylex.props(styles.fallback, xstyle)} />;
}

export function AvatarBadge({
  xstyle,
  ...props
}: Omit<ComponentProps<"span">, "className" | "style"> & { xstyle?: ControlPlacementStyles }) {
  return <span {...props} {...stylex.props(styles.badge, xstyle)} />;
}

export function AvatarGroup({
  xstyle,
  ...props
}: Omit<ComponentProps<"div">, "className" | "style"> & { xstyle?: stylex.StyleXStyles }) {
  return <div {...props} {...stylex.props(styles.group, xstyle)} />;
}

export function AvatarGroupCount({
  xstyle,
  ...props
}: Omit<ComponentProps<"span">, "className" | "style"> & { xstyle?: ControlPlacementStyles }) {
  return <span {...props} {...stylex.props(styles.groupCount, xstyle)} />;
}
