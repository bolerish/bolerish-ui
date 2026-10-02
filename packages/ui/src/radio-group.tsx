"use client";

import { Radio as RadioPrimitive } from "@base-ui/react/radio";
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group";
import {
  colorVars,
  motionVars,
  opacityVars,
  radiusVars,
  sizeVars,
  spacingVars,
} from "@nuee/tokens/semantic.stylex";
import * as stylex from "@stylexjs/stylex";
import type { ComponentProps } from "react";

import type { ControlLayoutStyles, ControlPlacementStyles } from "./control-layout";

const styles = stylex.create({
  group: { display: "flex", flexDirection: "column", gap: spacingVars.space3 },
  item: {
    alignItems: "center",
    backgroundColor: colorVars.bgSurface,
    borderColor: {
      default: colorVars.strokeDefault,
      ":is([data-checked])": colorVars.strokeAction,
    },
    borderRadius: radiusVars.full,
    borderStyle: "solid",
    borderWidth: sizeVars.stroke,
    cursor: { default: "pointer", ":is([data-disabled])": "not-allowed" },
    display: "inline-flex",
    height: sizeVars.controlXs,
    justifyContent: "center",
    opacity: { default: 1, ":is([data-disabled])": opacityVars.disabled },
    outline: "none",
    transitionDuration: motionVars.durationFast,
    transitionProperty: "border-color, opacity",
    transitionTimingFunction: motionVars.easingStandard,
    width: sizeVars.controlXs,
    ":focus-visible": {
      outlineColor: colorVars.strokeFocus,
      outlineOffset: sizeVars.focusRing,
      outlineStyle: "solid",
      outlineWidth: sizeVars.focusRing,
    },
  },
  indicator: { alignItems: "center", display: "inline-flex", justifyContent: "center" },
  dot: {
    backgroundColor: colorVars.bgActionPrimary,
    borderRadius: radiusVars.full,
    height: sizeVars.iconXs,
    width: sizeVars.iconXs,
  },
});

export type RadioGroupProps = Omit<
  ComponentProps<typeof RadioGroupPrimitive>,
  "className" | "style"
> & {
  xstyle?: ControlLayoutStyles;
};

export function RadioGroup({ xstyle, ...props }: RadioGroupProps) {
  return <RadioGroupPrimitive {...props} {...stylex.props(styles.group, xstyle)} />;
}

export type RadioGroupItemProps = Omit<
  ComponentProps<typeof RadioPrimitive.Root>,
  "className" | "style"
> & {
  xstyle?: ControlPlacementStyles;
};

export function RadioGroupItem({ xstyle, ...props }: RadioGroupItemProps) {
  return (
    <RadioPrimitive.Root {...props} {...stylex.props(styles.item, xstyle)}>
      <RadioPrimitive.Indicator {...stylex.props(styles.indicator)}>
        <span {...stylex.props(styles.dot)} />
      </RadioPrimitive.Indicator>
    </RadioPrimitive.Root>
  );
}
