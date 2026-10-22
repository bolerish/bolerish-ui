"use client";

import { Tabs as TabsPrimitive } from "@base-ui/react/tabs";
import {
  colorVars,
  motionVars,
  radiusVars,
  shadowVars,
  sizeVars,
  spacingVars,
  typo,
} from "@bolerish/tokens/semantic.stylex";
import * as stylex from "@stylexjs/stylex";
import { createContext, type ComponentProps, useContext } from "react";

import type { ControlLayoutStyles } from "./styles/control-layout";

const styles = stylex.create({
  root: { minWidth: 0, width: "100%" },
  list: {
    alignItems: "stretch",
    display: "inline-flex",
    maxWidth: "100%",
    overflowX: "auto",
    position: "relative",
  },

  trigger: {
    alignItems: "center",
    appearance: "none",
    backgroundColor: "transparent",
    borderStyle: "none",
    borderWidth: 0,
    color: colorVars.fgSecondary,
    cursor: "pointer",
    display: "inline-flex",
    flexShrink: 0,
    fontFamily: typo.fontFamilyBody,
    fontSize: typo.fontSizeSm,
    fontWeight: typo.fontWeightMedium,
    justifyContent: "center",
    outline: "none",
    position: "relative",
    transitionDuration: motionVars.durationFast,
    transitionProperty: "background-color, color",
    transitionTimingFunction: motionVars.easingStandard,
    whiteSpace: "nowrap",
    zIndex: 1,
    ":hover": { color: colorVars.fgPrimary },
    ":focus-visible": {
      outlineColor: colorVars.strokeFocus,
      outlineOffset: `calc(${sizeVars.stroke} * -1)`,
      outlineStyle: "solid",
      outlineWidth: sizeVars.focusRing,
    },
  },

  triggerActive: { color: colorVars.fgPrimary },
  triggerDisabled: {
    backgroundColor: "transparent",
    color: colorVars.fgDisabled,
    cursor: "not-allowed",
    ":hover": { backgroundColor: "transparent", color: colorVars.fgDisabled },
  },
  indicator: {
    left: 0,
    position: "absolute",
    transform: "translateX(var(--active-tab-left))",
    transitionDuration: motionVars.durationNormal,
    transitionProperty: "transform, width, height",
    transitionTimingFunction: motionVars.easingEnter,
    width: "var(--active-tab-width)",
    zIndex: 0,
    "@media (prefers-reduced-motion: reduce)": {
      ":not(:root[data-nuee-motion='on'] *)": {
        transitionDuration: motionVars.durationInstant,
      },
    },
  },

  panel: {
    color: colorVars.fgPrimary,
    fontSize: typo.fontSizeSm,
    lineHeight: typo.lineHeightNormal,
    marginTop: spacingVars.space3,
    minWidth: 0,
    outline: "none",
    width: "100%",
    ":focus-visible": {
      outlineColor: colorVars.strokeFocus,
      outlineOffset: sizeVars.focusRing,
      outlineStyle: "solid",
      outlineWidth: sizeVars.focusRing,
    },
  },
});

const listVariantStyles = stylex.create({
  segmented: {
    backgroundColor: colorVars.bgSubtle,
    borderColor: colorVars.strokeDefault,
    borderRadius: radiusVars.sm,
    borderStyle: "solid",
    borderWidth: sizeVars.stroke,
    minHeight: sizeVars.controlMd,
    padding: spacingVars.space0_5,
  },
  underline: {
    borderBottomColor: colorVars.strokeDefault,
    borderBottomStyle: "solid",
    borderBottomWidth: sizeVars.stroke,
    gap: spacingVars.space2,
    minHeight: sizeVars.controlMd,
  },
});

const triggerVariantStyles = stylex.create({
  segmented: {
    borderRadius: radiusVars.sm,
    height: sizeVars.controlSm,
    paddingInline: spacingVars.space3,
  },
  underline: {
    borderRadius: radiusVars.sm,
    height: sizeVars.controlMd,
    paddingInline: spacingVars.space2,
    ":hover": { backgroundColor: colorVars.interactionHover, color: colorVars.fgPrimary },
  },
});

const indicatorVariantStyles = stylex.create({
  segmented: {
    backgroundColor: colorVars.interactionSelected,
    borderRadius: radiusVars.sm,
    boxShadow: `inset 0 0 0 ${sizeVars.stroke} ${colorVars.strokeAction}, ${shadowVars.subtle}`,
    height: "var(--active-tab-height)",
    top: "var(--active-tab-top)",
  },
  underline: {
    backgroundColor: colorVars.fgAction,
    bottom: 0,
    height: sizeVars.focusRing,
  },
});

export type TabsVariant = "segmented" | "underline";
export type TabsProps = Omit<ComponentProps<typeof TabsPrimitive.Root>, "className" | "style"> & {
  variant?: TabsVariant;
  xstyle?: stylex.StyleXStyles;
};

const TabsVariantContext = createContext<TabsVariant>("segmented");

export function Tabs({ xstyle, variant = "segmented", ...props }: TabsProps) {
  return (
    <TabsVariantContext.Provider value={variant}>
      <TabsPrimitive.Root {...props} {...stylex.props(styles.root, xstyle)} />
    </TabsVariantContext.Provider>
  );
}

export function TabsList({
  xstyle,
  children,
  ...props
}: Omit<ComponentProps<typeof TabsPrimitive.List>, "className" | "style"> & {
  xstyle?: stylex.StyleXStyles;
}) {
  const variant = useContext(TabsVariantContext);

  return (
    <TabsPrimitive.List
      {...props}
      {...stylex.props(styles.list, listVariantStyles[variant], xstyle)}
    >
      {children}
      <TabsPrimitive.Indicator
        {...stylex.props(styles.indicator, indicatorVariantStyles[variant])}
      />
    </TabsPrimitive.List>
  );
}

export function TabsTrigger({
  xstyle,
  ...props
}: Omit<ComponentProps<typeof TabsPrimitive.Tab>, "className" | "style"> & {
  xstyle?: ControlLayoutStyles;
}) {
  const variant = useContext(TabsVariantContext);

  function getTabStyles(state: TabsPrimitive.Tab.State) {
    return stylex.props(
      styles.trigger,
      triggerVariantStyles[variant],
      state.active && styles.triggerActive,
      state.disabled && styles.triggerDisabled,
      xstyle,
    );
  }
  return (
    <TabsPrimitive.Tab
      {...props}
      className={(state) => getTabStyles(state).className}
      style={(state) => getTabStyles(state).style}
    />
  );
}

export function TabsContent({
  xstyle,
  ...props
}: Omit<ComponentProps<typeof TabsPrimitive.Panel>, "className" | "style"> & {
  xstyle?: stylex.StyleXStyles;
}) {
  return <TabsPrimitive.Panel {...props} {...stylex.props(styles.panel, xstyle)} />;
}
