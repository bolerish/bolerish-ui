"use client";

import { OTPField } from "@base-ui/react/otp-field";
import {
  colorVars,
  motionVars,
  opacityVars,
  radiusVars,
  sizeVars,
  spacingVars,
  typographyVars,
} from "@bolerish/tokens/semantic.stylex";
import * as stylex from "@stylexjs/stylex";
import type { ComponentProps } from "react";

import type { ControlLayoutStyles, ControlPlacementStyles } from "./styles/control-layout";

const styles = stylex.create({
  root: { alignItems: "center", display: "flex", gap: spacingVars.space2 },
  group: { display: "flex" },
  slot: {
    appearance: "none",
    backgroundColor: colorVars.bgSurface,
    borderColor: colorVars.strokeDefault,
    borderRadius: 0,
    borderStyle: "solid",
    borderWidth: sizeVars.stroke,
    color: colorVars.fgPrimary,
    fontFamily: typographyVars.fontFamilyBody,
    fontSize: typographyVars.fontSizeSm,
    height: sizeVars.controlLg,
    marginInlineStart: -1,
    outline: "none",
    textAlign: "center",
    transitionDuration: motionVars.durationFast,
    transitionProperty: "background-color, border-color, box-shadow, opacity",
    transitionTimingFunction: motionVars.easingStandard,
    width: sizeVars.controlLg,
    ":first-child": {
      borderBottomLeftRadius: radiusVars.sm,
      borderTopLeftRadius: radiusVars.sm,
      marginInlineStart: 0,
    },
    ":last-child": { borderBottomRightRadius: radiusVars.sm, borderTopRightRadius: radiusVars.sm },
    ":hover:not(:disabled)": { borderColor: colorVars.strokeStrong },
    ":focus-visible": {
      outlineColor: colorVars.strokeFocus,
      outlineOffset: sizeVars.stroke,
      outlineStyle: "solid",
      outlineWidth: sizeVars.focusRing,
      zIndex: 1,
    },
    ":disabled": { cursor: "not-allowed", opacity: opacityVars.disabled },
  },
  separator: { color: colorVars.fgTertiary, paddingInline: spacingVars.space1 },
});

export type InputOTPProps = Omit<ComponentProps<typeof OTPField.Root>, "className" | "style"> & {
  xstyle?: ControlLayoutStyles;
};

export function InputOTP({ xstyle, ...props }: InputOTPProps) {
  return <OTPField.Root {...props} {...stylex.props(styles.root, xstyle)} />;
}

export function InputOTPGroup({
  xstyle,
  ...props
}: Omit<ComponentProps<"div">, "className" | "style"> & { xstyle?: stylex.StyleXStyles }) {
  return <div {...props} {...stylex.props(styles.group, xstyle)} />;
}

export function InputOTPSlot({
  xstyle,
  ...props
}: Omit<ComponentProps<typeof OTPField.Input>, "className" | "style"> & {
  xstyle?: ControlPlacementStyles;
}) {
  return <OTPField.Input {...props} {...stylex.props(styles.slot, xstyle)} />;
}

export function InputOTPSeparator({
  xstyle,
  ...props
}: Omit<ComponentProps<"span">, "className" | "style"> & { xstyle?: ControlPlacementStyles }) {
  return (
    <span aria-hidden="true" {...props} {...stylex.props(styles.separator, xstyle)}>
      {props.children ?? "–"}
    </span>
  );
}
