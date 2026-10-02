"use client";

import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip";
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
import * as stylex from "@stylexjs/stylex";
import type { ComponentProps } from "react";

const styles = stylex.create({
  positioner: { zIndex: layerVars.notification },
  popup: {
    backgroundColor: colorVars.bgInverse,
    borderRadius: radiusVars.sm,
    boxShadow: shadowVars.floating,
    color: colorVars.fgInverse,
    fontSize: typographyVars.fontSizeXs,
    lineHeight: typographyVars.lineHeightNormal,
    maxWidth: sizeVars.contentXs,
    paddingBlock: spacingVars.space1,
    paddingInline: spacingVars.space3,
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
  arrow: { fill: colorVars.bgInverse, height: spacingVars.space2, width: spacingVars.space3 },
});

export const Tooltip = TooltipPrimitive.Root;
export const TooltipProvider = TooltipPrimitive.Provider;
export function TooltipTrigger({
  xstyle,
  ...props
}: Omit<ComponentProps<typeof TooltipPrimitive.Trigger>, "className" | "style"> & {
  xstyle?: stylex.StyleXStyles;
}) {
  return <TooltipPrimitive.Trigger {...props} {...stylex.props(xstyle)} />;
}

type TooltipContentProps = Omit<
  ComponentProps<typeof TooltipPrimitive.Popup>,
  "className" | "style"
> &
  Pick<ComponentProps<typeof TooltipPrimitive.Positioner>, "align" | "side" | "sideOffset"> & {
    xstyle?: stylex.StyleXStyles;
  };

export function TooltipContent({
  align = "center",
  side = "top",
  sideOffset = 6,
  xstyle,
  ...props
}: TooltipContentProps) {
  function getPopupStyles(state: TooltipPrimitive.Popup.State) {
    return stylex.props(
      styles.popup,
      (state.transitionStatus === "starting" || state.transitionStatus === "ending") &&
        styles.popupTransitioning,
      state.transitionStatus === "ending" && styles.popupEnding,
      xstyle,
    );
  }
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Positioner
        align={align}
        side={side}
        sideOffset={sideOffset}
        {...stylex.props(styles.positioner)}
      >
        <TooltipPrimitive.Popup
          {...props}
          className={(state) => getPopupStyles(state).className}
          style={(state) => getPopupStyles(state).style}
        >
          {props.children}
          <TooltipPrimitive.Arrow {...stylex.props(styles.arrow)} />
        </TooltipPrimitive.Popup>
      </TooltipPrimitive.Positioner>
    </TooltipPrimitive.Portal>
  );
}
