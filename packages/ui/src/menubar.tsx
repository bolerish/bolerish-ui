"use client";

import { Menu as MenuPrimitive } from "@base-ui/react/menu";
import { Menubar as MenubarPrimitive } from "@base-ui/react/menubar";
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

import {
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "./dropdown-menu";
import type { ControlLayoutStyles } from "./styles/control-layout";

const styles = stylex.create({
  root: {
    alignItems: "center",
    backgroundColor: colorVars.bgSurface,
    borderColor: colorVars.strokeDefault,
    borderRadius: radiusVars.sm,
    borderStyle: "solid",
    borderWidth: sizeVars.stroke,
    display: "flex",
    gap: spacingVars.space1,
    minHeight: sizeVars.controlMd,
    padding: spacingVars.space1,
  },
  trigger: {
    appearance: "none",
    backgroundColor: "transparent",
    borderStyle: "none",
    borderWidth: 0,
    borderRadius: radiusVars.sm,
    color: colorVars.fgPrimary,
    cursor: "pointer",
    fontFamily: typographyVars.fontFamilyBody,
    fontSize: typographyVars.fontSizeSm,
    fontWeight: typographyVars.fontWeightMedium,
    height: sizeVars.controlSm,
    outline: "none",
    paddingInline: spacingVars.space3,
    transitionDuration: motionVars.durationFast,
    transitionProperty: "background-color, color",
    transitionTimingFunction: motionVars.easingStandard,
    ":hover": { backgroundColor: colorVars.interactionHover },
    ":focus-visible": {
      outlineColor: colorVars.strokeFocus,
      outlineOffset: sizeVars.stroke,
      outlineStyle: "solid",
      outlineWidth: sizeVars.focusRing,
    },
  },
  triggerOpen: { backgroundColor: colorVars.bgSurfacePressed },
  triggerDisabled: {
    backgroundColor: "transparent",
    color: colorVars.fgDisabled,
    cursor: "not-allowed",
    ":hover": { backgroundColor: "transparent" },
  },
});

export function Menubar({
  xstyle,
  ...props
}: Omit<ComponentProps<typeof MenubarPrimitive>, "className" | "style"> & {
  xstyle?: stylex.StyleXStyles;
}) {
  return <MenubarPrimitive {...props} {...stylex.props(styles.root, xstyle)} />;
}

export const MenubarMenu = MenuPrimitive.Root;

export function MenubarTrigger({
  xstyle,
  ...props
}: Omit<ComponentProps<typeof MenuPrimitive.Trigger>, "className" | "style"> & {
  xstyle?: ControlLayoutStyles;
}) {
  function getTriggerStyles(state: MenuPrimitive.Trigger.State) {
    return stylex.props(
      styles.trigger,
      state.open && styles.triggerOpen,
      state.disabled && styles.triggerDisabled,
      xstyle,
    );
  }
  return (
    <MenuPrimitive.Trigger
      {...props}
      className={(state) => getTriggerStyles(state).className}
      style={(state) => getTriggerStyles(state).style}
    />
  );
}

export const MenubarContent = DropdownMenuContent;
export const MenubarItem = DropdownMenuItem;
export const MenubarCheckboxItem = DropdownMenuCheckboxItem;
export const MenubarRadioItem = DropdownMenuRadioItem;
export const MenubarGroup = DropdownMenuGroup;
export const MenubarRadioGroup = DropdownMenuRadioGroup;
export const MenubarLabel = DropdownMenuLabel;
export const MenubarSeparator = DropdownMenuSeparator;
export const MenubarShortcut = DropdownMenuShortcut;
export const MenubarSub = DropdownMenuSub;
export const MenubarSubTrigger = DropdownMenuSubTrigger;
export const MenubarSubContent = DropdownMenuSubContent;
