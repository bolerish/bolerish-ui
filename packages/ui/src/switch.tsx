"use client";

import { Switch as SwitchPrimitive } from "@base-ui/react/switch";
import {
  colorVars,
  motionVars,
  radiusVars,
  sizeVars,
  spacingVars,
} from "@bolerish/tokens/semantic.stylex";
import * as stylex from "@stylexjs/stylex";
import type { ComponentProps } from "react";

import type { ControlPlacementStyles } from "./styles/control-layout";

const styles = stylex.create({
  root: {
    alignItems: "center",
    appearance: "none",
    backgroundColor: {
      default: colorVars.strokeControl,
      ":is([data-checked])": colorVars.bgActionPrimary,
      ":is([data-disabled])": colorVars.interactionDisabled,
    },
    borderStyle: "none",
    borderWidth: 0,
    borderRadius: radiusVars.full,
    cursor: { default: "pointer", ":is([data-disabled])": "not-allowed" },
    display: "inline-flex",
    flexShrink: 0,
    outline: "none",
    padding: spacingVars.space0_5,
    transitionDuration: motionVars.durationFast,
    transitionProperty: "background-color, opacity",
    transitionTimingFunction: motionVars.easingStandard,
    ":focus-visible": {
      outlineColor: colorVars.strokeFocus,
      outlineOffset: sizeVars.focusRing,
      outlineStyle: "solid",
      outlineWidth: sizeVars.focusRing,
    },
  },
  thumb: {
    backgroundColor: {
      default: colorVars.fgOnActionPrimary,
      ":is([data-disabled] *)": colorVars.fgDisabled,
    },
    borderRadius: radiusVars.full,
    display: "block",
    transitionDuration: motionVars.durationFast,
    transitionProperty: "background-color, transform",
    transitionTimingFunction: motionVars.easingStandard,
    "@media (prefers-reduced-motion: reduce)": {
      ":not(:root[data-nuee-motion='on'] *)": {
        transitionDuration: motionVars.durationInstant,
      },
    },
  },
});

const sizeStyles = stylex.create({
  sm: { height: sizeVars.controlXs, width: sizeVars.controlSm },
  md: { height: sizeVars.controlXs, width: sizeVars.controlLg },
});

const thumbSizeStyles = stylex.create({
  sm: {
    height: sizeVars.iconMd,
    transform: {
      default: "translateX(0)",
      ":is([data-checked] *)": `translateX(${spacingVars.space3})`,
    },
    width: sizeVars.iconMd,
  },
  md: {
    height: sizeVars.iconLg,
    transform: {
      default: "translateX(0)",
      ":is([data-checked] *)": `translateX(${spacingVars.space4})`,
    },
    width: sizeVars.iconLg,
  },
});

export type SwitchProps = Omit<
  ComponentProps<typeof SwitchPrimitive.Root>,
  "className" | "style"
> & {
  size?: "md" | "sm";
  xstyle?: ControlPlacementStyles;
};

export function Switch({ size = "md", xstyle, ...props }: SwitchProps) {
  return (
    <SwitchPrimitive.Root {...props} {...stylex.props(styles.root, sizeStyles[size], xstyle)}>
      <SwitchPrimitive.Thumb {...stylex.props(styles.thumb, thumbSizeStyles[size])} />
    </SwitchPrimitive.Root>
  );
}
