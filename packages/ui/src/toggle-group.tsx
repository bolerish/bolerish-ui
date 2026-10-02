"use client";

import { Toggle as TogglePrimitive } from "@base-ui/react/toggle";
import { ToggleGroup as ToggleGroupPrimitive } from "@base-ui/react/toggle-group";
import {
  colorVars,
  motionVars,
  radiusVars,
  shadowVars,
  sizeVars,
  spacingVars,
  typo,
} from "@nuee/tokens/semantic.stylex";
import * as stylex from "@stylexjs/stylex";
import { createContext, useContext, type ComponentProps, type ReactNode } from "react";

import type { ControlLayoutStyles, ControlPlacementStyles } from "./styles/control-layout";
import type { ToggleSize, ToggleVariant } from "./toggle";

const styles = stylex.create({
  root: { alignItems: "center", display: "inline-flex", width: "fit-content" },

  outlineItem: {
    borderColor: "transparent",
    borderRadius: 0,
    marginInlineStart: -1,
  },
  item: {
    alignItems: "center",
    borderColor: "transparent",
    borderRadius: radiusVars.sm,
    borderStyle: "solid",
    borderWidth: sizeVars.stroke,
    color: colorVars.fgPrimary,
    cursor: "pointer",
    display: "inline-flex",
    fontSize: typo.fontSizeSm,
    fontWeight: typo.fontWeightMedium,
    gap: spacingVars.space1,
    justifyContent: "center",
    outline: "none",
    transitionDuration: motionVars.durationFast,
    transitionProperty: "background-color, border-color, color, opacity",
    transitionTimingFunction: motionVars.easingStandard,
    backgroundImage: {
      default: "none",
      ":not(:disabled):hover": `linear-gradient(${colorVars.interactionHover}, ${colorVars.interactionHover})`,
      ":not(:disabled):active": `linear-gradient(${colorVars.interactionPressed}, ${colorVars.interactionPressed})`,
    },
    ":focus-visible": {
      outlineColor: colorVars.strokeFocus,
      outlineOffset: sizeVars.focusRing,
      outlineStyle: "solid",
      outlineWidth: sizeVars.focusRing,
    },
    ":disabled": { cursor: "not-allowed" },
  },

  softPressed: {
    backgroundColor: colorVars.interactionSelected,
    boxShadow: shadowVars.subtle,
  },
  itemPressed: {
    backgroundColor: colorVars.bgCurrent,
    color: colorVars.fgPrimary,
    boxShadow: `inset 0 0 0 ${sizeVars.stroke} ${colorVars.strokeStrong}`,
  },
  unavailable: { backgroundColor: colorVars.interactionDisabled },
  itemDisabled: {
    borderColor: colorVars.strokeDefault,
    color: colorVars.fgDisabled,
    cursor: "not-allowed",
  },
});

const variantStyles = stylex.create({
  default: { gap: spacingVars.space1 },
  soft: {
    gap: spacingVars.space0_5,
    padding: spacingVars.space0_5,
    backgroundColor: colorVars.bgSubtle,
    borderColor: colorVars.strokeDefault,
    borderStyle: "solid",
    borderWidth: sizeVars.stroke,
    borderRadius: radiusVars.sm,
  },
  outline: {
    backgroundColor: colorVars.bgSurface,
    borderColor: colorVars.strokeDefault,
    borderRadius: radiusVars.sm,
    borderStyle: "solid",
    borderWidth: sizeVars.stroke,
    gap: 0,
    overflow: "hidden",
  },
});

const itemSizeStyles = stylex.create({
  sm: {
    height: sizeVars.controlSm,
    minWidth: sizeVars.controlSm,
    paddingInline: spacingVars.space2,
  },
  md: {
    height: sizeVars.controlMd,
    minWidth: sizeVars.controlMd,
    paddingInline: spacingVars.space3,
  },
  lg: {
    height: sizeVars.controlLg,
    minWidth: sizeVars.controlLg,
    paddingInline: spacingVars.space4,
  },
});

const itemVariantStyles = stylex.create({
  default: { backgroundColor: "transparent" },
  soft: { backgroundColor: "transparent" },
  outline: { backgroundColor: colorVars.bgSurface, borderColor: colorVars.strokeDefault },
});

type ToggleGroupContextValue = { size: ToggleSize; variant: ToggleVariant };
const ToggleGroupContext = createContext<ToggleGroupContextValue>({
  size: "md",
  variant: "default",
});

export type ToggleGroupProps = Omit<
  ComponentProps<typeof ToggleGroupPrimitive>,
  "className" | "style"
> & {
  children: ReactNode;
  size?: ToggleSize;
  variant?: ToggleVariant;
  xstyle?: ControlLayoutStyles;
};

export function ToggleGroup({
  children,
  size = "md",
  variant = "default",
  xstyle,
  ...props
}: ToggleGroupProps) {
  return (
    <ToggleGroupPrimitive {...props} {...stylex.props(styles.root, variantStyles[variant], xstyle)}>
      <ToggleGroupContext value={{ size, variant }}>{children}</ToggleGroupContext>
    </ToggleGroupPrimitive>
  );
}

export type ToggleGroupItemProps = Omit<
  ComponentProps<typeof TogglePrimitive>,
  "className" | "style"
> & {
  size?: ToggleSize;
  variant?: ToggleVariant;
  xstyle?: ControlPlacementStyles;
};

export function ToggleGroupItem({ size, variant, xstyle, ...props }: ToggleGroupItemProps) {
  const context = useContext(ToggleGroupContext);
  const finalSize = size ?? context.size;
  const finalVariant = variant ?? context.variant;
  function getToggleStyles(state: TogglePrimitive.State) {
    return stylex.props(
      styles.item,
      itemSizeStyles[finalSize],
      itemVariantStyles[finalVariant],
      state.pressed && styles.itemPressed,
      state.pressed && finalVariant === "soft" && styles.softPressed,
      state.disabled && !state.pressed && styles.unavailable,
      state.disabled && styles.itemDisabled,
      finalVariant === "outline" && styles.outlineItem,
      xstyle,
    );
  }
  return (
    <TogglePrimitive
      {...props}
      className={(state) => getToggleStyles(state).className}
      style={(state) => getToggleStyles(state).style}
    />
  );
}
