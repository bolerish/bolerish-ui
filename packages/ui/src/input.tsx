"use client";

import { Input as InputPrimitive } from "@base-ui/react/input";
import {
  colorVars,
  motionVars,
  radiusVars,
  sizeVars,
  spacingVars,
  typographyVars,
} from "@bolerish/tokens/semantic.stylex";
import * as stylex from "@stylexjs/stylex";
import type { ComponentProps } from "react";

import type { ControlLayoutStyles } from "./styles/control-layout";

const styles = stylex.create({
  root: {
    appearance: "none",
    backgroundColor: colorVars.bgSurface,
    borderColor: colorVars.strokeDefault,
    borderRadius: radiusVars.sm,
    borderStyle: "solid",
    borderWidth: sizeVars.stroke,
    color: colorVars.fgPrimary,
    fontSize: typographyVars.fontSizeSm,
    fontFamily: typographyVars.fontFamilyBody,
    height: sizeVars.controlMd,
    lineHeight: typographyVars.lineHeightNormal,
    minWidth: 0,
    outline: "none",
    paddingInline: spacingVars.space3,
    transitionDuration: motionVars.durationFast,
    transitionProperty: "border-color, opacity",
    transitionTimingFunction: motionVars.easingStandard,
    width: "100%",
    "::placeholder": {
      color: colorVars.fgTertiary,
    },
    ":hover": {
      borderColor: colorVars.strokeStrong,
    },
    ":focus-visible": {
      outlineColor: colorVars.strokeFocus,
      outlineOffset: sizeVars.stroke,
      outlineStyle: "solid",
      outlineWidth: sizeVars.focusRing,
    },
    ":disabled": {
      backgroundColor: colorVars.bgSubtle,
      borderColor: colorVars.strokeDefault,
      color: colorVars.fgDisabled,
      cursor: "not-allowed",
      ":hover": { borderColor: colorVars.strokeDefault },
    },
    ":user-invalid": {
      borderColor: colorVars.strokeFeedbackError,
      ":focus-visible": {
        outlineColor: colorVars.strokeFeedbackError,
      },
    },
  },
  inline: {
    backgroundColor: "transparent",
    borderWidth: 0,
    borderRadius: 0,
    paddingInline: spacingVars.space1,
    paddingBlock: 0,
    fontSize: "inherit",
    fontWeight: "inherit",
    lineHeight: "inherit",
    color: "inherit",
    ":focus-visible": {
      outlineColor: colorVars.strokeFocus,
      outlineStyle: "solid",
      outlineWidth: sizeVars.focusRing,
      outlineOffset: sizeVars.stroke,
    },
  },
  invalid: {
    borderColor: colorVars.strokeFeedbackError,
    ":focus-visible": {
      outlineColor: colorVars.strokeFeedbackError,
    },
  },
});

export type InputProps = Omit<ComponentProps<typeof InputPrimitive>, "className" | "style"> & {
  xstyle?: ControlLayoutStyles;
  variant?: "outline" | "inline";
};

export function Input({
  "aria-invalid": ariaInvalid,
  variant = "outline",
  xstyle,
  ...props
}: InputProps) {
  const isInvalid = ariaInvalid === true || ariaInvalid === "true";
  return (
    <InputPrimitive
      {...props}
      aria-invalid={ariaInvalid}
      {...stylex.props(
        styles.root,
        variant === "inline" && styles.inline,
        isInvalid && styles.invalid,
        xstyle,
      )}
    />
  );
}
