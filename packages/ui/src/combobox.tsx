"use client";

import { Combobox as ComboboxPrimitive } from "@base-ui/react/combobox";
import {
  colorVars,
  layerVars,
  motionVars,
  radiusVars,
  shadowVars,
  sizeVars,
  spacingVars,
  typographyVars,
} from "@nuee/tokens/semantic.stylex";
import { CaretDownIcon, CheckIcon, MagnifyingGlassIcon } from "@phosphor-icons/react";
import * as stylex from "@stylexjs/stylex";
import type { ComponentProps, ReactNode } from "react";

import type { ControlLayoutStyles, ControlPlacementStyles } from "./styles/control-layout";

const styles = stylex.create({
  inputGroup: {
    alignItems: "center",
    backgroundColor: colorVars.bgSurface,
    borderColor: colorVars.strokeDefault,
    borderRadius: radiusVars.sm,
    borderStyle: "solid",
    borderWidth: sizeVars.stroke,
    display: "flex",
    height: sizeVars.controlMd,
    paddingInlineStart: spacingVars.space3,
    transitionDuration: motionVars.durationFast,
    transitionProperty: "border-color",
    transitionTimingFunction: motionVars.easingStandard,
    width: "14rem",
    ":focus-within": {
      borderColor: colorVars.strokeFocus,
      outlineColor: colorVars.strokeFocus,
      outlineOffset: sizeVars.stroke,
      outlineStyle: "solid",
      outlineWidth: sizeVars.focusRing,
    },
  },
  inline: {
    width: "100%",
    backgroundColor: "transparent",
    borderWidth: 0,
    borderBottomWidth: sizeVars.stroke,
    borderRadius: 0,
    paddingInlineStart: 0,
  },
  searchIcon: { color: colorVars.fgSecondary, flexShrink: 0 },
  input: {
    appearance: "none",
    backgroundColor: "transparent",
    borderStyle: "none",
    borderWidth: 0,
    boxShadow: "none",
    color: colorVars.fgPrimary,
    flex: 1,
    fontFamily: typographyVars.fontFamilyBody,
    fontSize: typographyVars.fontSizeSm,
    height: "100%",
    minWidth: 0,
    outline: "none",
    paddingInline: spacingVars.space2,
    "::placeholder": { color: colorVars.fgTertiary },
  },
  inputDisabled: { color: colorVars.fgDisabled, cursor: "not-allowed" },
  trigger: {
    alignItems: "center",
    alignSelf: "stretch",
    appearance: "none",
    backgroundColor: "transparent",
    borderStyle: "none",
    borderWidth: 0,
    boxShadow: "none",
    color: colorVars.fgSecondary,
    cursor: "pointer",
    display: "inline-flex",
    justifyContent: "center",
    outline: "none",
    transitionDuration: motionVars.durationFast,
    transitionProperty: "color",
    transitionTimingFunction: motionVars.easingStandard,
    width: sizeVars.controlMd,
  },
  triggerDisabled: {
    color: colorVars.fgDisabled,
    cursor: "not-allowed",
    ":hover": { backgroundColor: "transparent" },
  },
  positioner: { zIndex: layerVars.popup },
  popup: {
    backgroundColor: colorVars.bgRaised,
    borderColor: colorVars.strokeDefault,
    borderRadius: radiusVars.sm,
    borderStyle: "solid",
    borderWidth: sizeVars.stroke,
    boxShadow: shadowVars.floating,
    color: colorVars.fgPrimary,
    maxHeight: "min(20rem, var(--available-height))",
    minWidth: "var(--anchor-width)",
    outline: "none",
    overflow: "hidden",
    padding: spacingVars.space1,
    transform: "scale(1)",
    transformOrigin: "var(--transform-origin)",
    transitionDuration: motionVars.durationNormal,
    transitionProperty: "opacity, transform",
    transitionTimingFunction: motionVars.easingEnter,
    "@media (prefers-reduced-motion: reduce)": {
      ":not(:root[data-nuee-motion='on'] *)": {
        transform: "none",
        transitionDuration: motionVars.durationInstant,
      },
    },
  },
  popupTransitioning: { opacity: 0, transform: "scale(0.98)" },
  popupEnding: {
    transitionDuration: motionVars.durationFast,
    transitionTimingFunction: motionVars.easingExit,
    "@media (prefers-reduced-motion: reduce)": {
      ":not(:root[data-nuee-motion='on'] *)": {
        transitionDuration: motionVars.durationInstant,
      },
    },
  },
  list: { overflowY: "auto", overscrollBehavior: "contain" },
  item: {
    alignItems: "center",
    borderRadius: radiusVars.sm,
    cursor: "default",
    display: "flex",
    fontSize: typographyVars.fontSizeSm,
    gap: spacingVars.space2,
    minHeight: sizeVars.controlSm,
    outline: "none",
    paddingInlineEnd: spacingVars.space3,
    paddingInlineStart: spacingVars.space8,
    position: "relative",
    userSelect: "none",
  },
  itemHighlighted: { backgroundColor: colorVars.interactionHover },
  itemDisabled: {
    backgroundColor: "transparent",
    color: colorVars.fgDisabled,
    cursor: "not-allowed",
  },
  indicator: {
    alignItems: "center",
    display: "inline-flex",
    insetInlineStart: spacingVars.space2,
    justifyContent: "center",
    position: "absolute",
  },
  empty: {
    color: colorVars.fgSecondary,
    fontSize: typographyVars.fontSizeSm,
    padding: spacingVars.space4,
    textAlign: "center",
    ":empty": { padding: 0 },
  },
  label: {
    color: colorVars.fgSecondary,
    fontSize: typographyVars.fontSizeXs,
    fontWeight: typographyVars.fontWeightMedium,
    paddingBlock: spacingVars.space2,
    paddingInline: spacingVars.space2,
  },
  separator: {
    backgroundColor: colorVars.strokeDefault,
    height: sizeVars.stroke,
    marginBlock: spacingVars.space1,
    marginInline: `calc(${spacingVars.space1} * -1)`,
  },
});

export const Combobox = ComboboxPrimitive.Root;
export const ComboboxCollection = ComboboxPrimitive.Collection;
export function ComboboxGroup({
  xstyle,
  ...props
}: Omit<ComponentProps<typeof ComboboxPrimitive.Group>, "className" | "style"> & {
  xstyle?: stylex.StyleXStyles;
}) {
  return <ComboboxPrimitive.Group {...props} {...stylex.props(xstyle)} />;
}

export function ComboboxInput({
  xstyle,
  variant = "outline",
  startAddon,
  endAddon,
  ...props
}: Omit<ComponentProps<typeof ComboboxPrimitive.Input>, "className" | "style"> & {
  xstyle?: ControlLayoutStyles;
  variant?: "outline" | "inline";
  startAddon?: ReactNode;
  endAddon?: ReactNode;
}) {
  function getInputStyles(state: ComboboxPrimitive.Input.State) {
    return stylex.props(styles.input, state.disabled && styles.inputDisabled);
  }
  function getTriggerStyles(state: ComboboxPrimitive.Trigger.State) {
    return stylex.props(styles.trigger, state.disabled && styles.triggerDisabled);
  }

  return (
    <ComboboxPrimitive.InputGroup
      {...stylex.props(styles.inputGroup, variant === "inline" && styles.inline, xstyle)}
    >
      {startAddon ?? (
        <MagnifyingGlassIcon aria-hidden="true" {...stylex.props(styles.searchIcon)} />
      )}
      <ComboboxPrimitive.Input
        {...props}
        className={(state) => getInputStyles(state).className}
        style={(state) => getInputStyles(state).style}
      />
      {endAddon ?? (
        <ComboboxPrimitive.Trigger
          aria-label="Open options"
          className={(state) => getTriggerStyles(state).className ?? ""}
          style={(state) => getTriggerStyles(state).style}
        >
          <CaretDownIcon aria-hidden="true" />
        </ComboboxPrimitive.Trigger>
      )}
    </ComboboxPrimitive.InputGroup>
  );
}

type ComboboxPopupProps = Omit<
  ComponentProps<typeof ComboboxPrimitive.Popup>,
  "className" | "style"
> &
  Pick<ComponentProps<typeof ComboboxPrimitive.Positioner>, "align" | "side" | "sideOffset"> & {
    children: ReactNode;
    xstyle?: stylex.StyleXStyles;
  };

export function ComboboxPopup({
  xstyle,
  align = "start",
  children,
  side = "bottom",
  sideOffset = 4,
  ...props
}: ComboboxPopupProps) {
  function getPopupStyles(state: ComboboxPrimitive.Popup.State) {
    return stylex.props(
      styles.popup,
      (state.transitionStatus === "starting" || state.transitionStatus === "ending") &&
        styles.popupTransitioning,
      state.transitionStatus === "ending" && styles.popupEnding,
      xstyle,
    );
  }
  return (
    <ComboboxPrimitive.Portal>
      <ComboboxPrimitive.Positioner
        align={align}
        side={side}
        sideOffset={sideOffset}
        {...stylex.props(styles.positioner)}
      >
        <ComboboxPrimitive.Popup
          {...props}
          className={(state) => getPopupStyles(state).className}
          style={(state) => getPopupStyles(state).style}
        >
          {children}
        </ComboboxPrimitive.Popup>
      </ComboboxPrimitive.Positioner>
    </ComboboxPrimitive.Portal>
  );
}

export function ComboboxItem({
  xstyle,
  children,
  ...props
}: Omit<ComponentProps<typeof ComboboxPrimitive.Item>, "className" | "style"> & {
  xstyle?: ControlLayoutStyles;
}) {
  function getItemStyles(state: ComboboxPrimitive.Item.State) {
    return stylex.props(
      styles.item,
      state.highlighted && styles.itemHighlighted,
      state.disabled && styles.itemDisabled,
      xstyle,
    );
  }
  return (
    <ComboboxPrimitive.Item
      {...props}
      className={(state) => getItemStyles(state).className}
      style={(state) => getItemStyles(state).style}
    >
      <ComboboxPrimitive.ItemIndicator {...stylex.props(styles.indicator)}>
        <CheckIcon aria-hidden="true" />
      </ComboboxPrimitive.ItemIndicator>
      {children}
    </ComboboxPrimitive.Item>
  );
}

export function ComboboxEmpty({
  xstyle,
  ...props
}: Omit<ComponentProps<typeof ComboboxPrimitive.Empty>, "className" | "style"> & {
  xstyle?: stylex.StyleXStyles;
}) {
  return <ComboboxPrimitive.Empty {...props} {...stylex.props(styles.empty, xstyle)} />;
}

export function ComboboxLabel({
  xstyle,
  ...props
}: Omit<ComponentProps<typeof ComboboxPrimitive.GroupLabel>, "className" | "style"> & {
  xstyle?: ControlPlacementStyles;
}) {
  return <ComboboxPrimitive.GroupLabel {...props} {...stylex.props(styles.label, xstyle)} />;
}

export function ComboboxSeparator({
  xstyle,
  ...props
}: Omit<ComponentProps<typeof ComboboxPrimitive.Separator>, "className" | "style"> & {
  xstyle?: ControlPlacementStyles;
}) {
  return <ComboboxPrimitive.Separator {...props} {...stylex.props(styles.separator, xstyle)} />;
}

export function ComboboxList({
  xstyle,
  ...props
}: Omit<ComponentProps<typeof ComboboxPrimitive.List>, "className" | "style"> & {
  xstyle?: stylex.StyleXStyles;
}) {
  return <ComboboxPrimitive.List {...props} {...stylex.props(styles.list, xstyle)} />;
}
