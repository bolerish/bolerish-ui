"use client";

import {
  colorVars,
  motionVars,
  radiusVars,
  sizeVars,
  spacingVars,
  typographyVars,
} from "@nuee/tokens/semantic.stylex";
import * as stylex from "@stylexjs/stylex";
import type { ComponentProps } from "react";

import { Button, type ButtonProps } from "./button";
import type { ControlPlacementStyles } from "./styles/control-layout";

const styles = stylex.create({
  root: {
    alignItems: "center",
    backgroundColor: colorVars.bgSurface,
    borderColor: colorVars.strokeDefault,
    borderRadius: radiusVars.sm,
    borderStyle: "solid",
    borderWidth: sizeVars.stroke,
    color: colorVars.fgPrimary,
    display: "flex",
    minWidth: 0,
    position: "relative",
    transitionDuration: motionVars.durationFast,
    transitionProperty: "background-color, border-color",
    transitionTimingFunction: motionVars.easingStandard,
  },

  error: {
    backgroundColor: colorVars.bgFeedbackError,
    borderColor: "transparent",
  },
  media: {
    alignItems: "center",
    display: "flex",
    flexShrink: 0,
    justifyContent: "center",
    overflow: "hidden",
  },

  content: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    gap: spacingVars.space1,
    minWidth: 0,
    paddingInlineEnd: spacingVars.space5,
    paddingInlineStart: spacingVars.space2,
  },
  title: {
    fontSize: typographyVars.fontSizeSm,
    fontWeight: typographyVars.fontWeightMedium,
    lineHeight: typographyVars.lineHeightTight,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  description: {
    color: colorVars.fgSecondary,
    fontSize: typographyVars.fontSizeXs,
    lineHeight: typographyVars.lineHeightNormal,
    margin: 0,
  },
  actions: {
    alignItems: "center",
    display: "flex",
    flexShrink: 0,
    gap: spacingVars.space1,
    position: "relative",
    zIndex: 2,
  },
  action: { minWidth: sizeVars.controlSm },
  trigger: {
    backgroundColor: "transparent",
    borderWidth: 0,
    borderRadius: "inherit",
    cursor: "pointer",
    inset: 0,
    outline: {
      default: "none",
      ":focus-visible": `${sizeVars.focusRing} solid ${colorVars.strokeFocus}`,
    },
    outlineOffset: { default: 0, ":focus-visible": 2 },
    position: "absolute",
    zIndex: 1,
  },
  group: {
    display: "flex",
    gap: spacingVars.space3,
    overflowX: "auto",
    paddingBlock: spacingVars.space1,
    scrollSnapType: "x proximity",
    width: "100%",
  },
});

const orientationStyles = stylex.create({
  horizontal: { flexDirection: "row" },
  vertical: { alignItems: "stretch", flexDirection: "column" },
});

const mediaVariantStyles = stylex.create({
  icon: {
    backgroundColor: colorVars.bgSubtle,
    borderRadius: radiusVars.sm,
    color: colorVars.fgSecondary,
    height: sizeVars.controlLg,
    width: sizeVars.controlLg,
  },
  image: {
    borderRadius: radiusVars.sm,
    height: "3rem",
    objectFit: "cover",
    width: "3rem",
  },
});

const sizeStyles = stylex.create({
  default: { gap: spacingVars.space3, minHeight: "4.5rem", padding: spacingVars.space3 },
  sm: { gap: spacingVars.space2, minHeight: sizeVars.touchTarget, padding: spacingVars.space2 },
  xs: { gap: spacingVars.space2, minHeight: sizeVars.controlMd, padding: spacingVars.space1 },
});

export type AttachmentState = "done" | "error" | "idle" | "processing" | "uploading";
export type AttachmentSize = "default" | "sm" | "xs";

export type AttachmentProps = Omit<ComponentProps<"div">, "title" | "className" | "style"> & {
  orientation?: "horizontal" | "vertical";
  size?: AttachmentSize;
  state?: AttachmentState;
  xstyle?: stylex.StyleXStyles;
};

export function Attachment({
  orientation = "horizontal",
  size = "default",
  state = "done",
  xstyle,
  ...props
}: AttachmentProps) {
  return (
    <div
      {...props}
      data-orientation={orientation}
      data-state={state}
      {...stylex.props(
        styles.root,
        orientationStyles[orientation],
        sizeStyles[size],
        state === "error" && styles.error,
        xstyle,
      )}
    />
  );
}

export type AttachmentMediaProps = Omit<ComponentProps<"div">, "className" | "style"> & {
  variant?: "icon" | "image";
  xstyle?: stylex.StyleXStyles;
};

export function AttachmentMedia({ xstyle, variant = "icon", ...props }: AttachmentMediaProps) {
  return <div {...props} {...stylex.props(styles.media, mediaVariantStyles[variant], xstyle)} />;
}

export function AttachmentContent({
  xstyle,
  ...props
}: Omit<ComponentProps<"div">, "className" | "style"> & { xstyle?: stylex.StyleXStyles }) {
  return <div {...props} {...stylex.props(styles.content, xstyle)} />;
}

export function AttachmentTitle({
  xstyle,
  ...props
}: Omit<ComponentProps<"div">, "className" | "style"> & { xstyle?: ControlPlacementStyles }) {
  return <div {...props} {...stylex.props(styles.title, xstyle)} />;
}

export function AttachmentDescription({
  xstyle,
  ...props
}: Omit<ComponentProps<"p">, "className" | "style"> & { xstyle?: ControlPlacementStyles }) {
  return <p {...props} {...stylex.props(styles.description, xstyle)} />;
}

export function AttachmentActions({
  xstyle,
  ...props
}: Omit<ComponentProps<"div">, "className" | "style"> & { xstyle?: stylex.StyleXStyles }) {
  return <div {...props} {...stylex.props(styles.actions, xstyle)} />;
}

export type AttachmentActionProps = Omit<ButtonProps, "size" | "variant">;

export function AttachmentAction({ xstyle, ...props }: AttachmentActionProps) {
  return <Button {...props} size="sm" variant="ghost" xstyle={[styles.action, xstyle]} />;
}

export function AttachmentTrigger({
  xstyle,
  type = "button",
  ...props
}: Omit<ComponentProps<"button">, "className" | "style"> & { xstyle?: ControlPlacementStyles }) {
  return <button {...props} type={type} {...stylex.props(styles.trigger, xstyle)} />;
}

export function AttachmentGroup({
  xstyle,
  ...props
}: Omit<ComponentProps<"div">, "className" | "style"> & { xstyle?: stylex.StyleXStyles }) {
  return <div {...props} {...stylex.props(styles.group, xstyle)} />;
}
