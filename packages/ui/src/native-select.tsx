"use client";

import {
  colorVars,
  motionVars,
  radiusVars,
  sizeVars,
  spacingVars,
  typographyVars,
} from "@nuee/tokens/semantic.stylex";
import { CaretDownIcon } from "@phosphor-icons/react";
import * as stylex from "@stylexjs/stylex";
import type { ComponentProps } from "react";

import type { ControlLayoutStyles } from "./styles/control-layout";

const styles = stylex.create({
  root: { display: "inline-flex", position: "relative", width: "fit-content" },
  select: {
    appearance: "none",
    backgroundColor: colorVars.bgSurface,
    borderColor: colorVars.strokeDefault,
    borderRadius: radiusVars.sm,
    borderStyle: "solid",
    borderWidth: sizeVars.stroke,
    color: colorVars.fgPrimary,
    fontSize: typographyVars.fontSizeSm,
    minWidth: "10rem",
    outline: "none",
    paddingInlineStart: spacingVars.space3,
    paddingInlineEnd: spacingVars.space8,
    transitionDuration: motionVars.durationFast,
    transitionProperty: "background-color, border-color, color",
    transitionTimingFunction: motionVars.easingStandard,
    width: "100%",
    ":hover": { borderColor: colorVars.strokeStrong },
    ":focus-visible": {
      borderColor: colorVars.strokeFocus,
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
  },

  icon: {
    color: colorVars.fgSecondary,
    pointerEvents: "none",
    position: "absolute",
    right: spacingVars.space3,
    top: "50%",
    transform: "translateY(-50%)",
  },
});

const sizeStyles = stylex.create({
  sm: { height: sizeVars.controlSm },
  md: { height: sizeVars.controlMd },
});

export type NativeSelectProps = Omit<ComponentProps<"select">, "size" | "className" | "style"> & {
  size?: "md" | "sm";
  xstyle?: ControlLayoutStyles;
};

export function NativeSelect({ children, size = "md", xstyle, ...props }: NativeSelectProps) {
  return (
    <span {...stylex.props(styles.root, xstyle)}>
      <select {...props} {...stylex.props(styles.select, sizeStyles[size])}>
        {children}
      </select>
      <CaretDownIcon aria-hidden="true" {...stylex.props(styles.icon)} />
    </span>
  );
}

export function NativeSelectOption({
  xstyle,
  ...props
}: Omit<ComponentProps<"option">, "className" | "style"> & { xstyle?: stylex.StyleXStyles }) {
  return <option {...props} {...stylex.props(xstyle)} />;
}
export function NativeSelectOptGroup({
  xstyle,
  ...props
}: Omit<ComponentProps<"optgroup">, "className" | "style"> & { xstyle?: stylex.StyleXStyles }) {
  return <optgroup {...props} {...stylex.props(xstyle)} />;
}
