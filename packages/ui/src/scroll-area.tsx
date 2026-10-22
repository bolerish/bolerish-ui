"use client";

import { ScrollArea as ScrollAreaPrimitive } from "@base-ui/react/scroll-area";
import { colorVars, motionVars, radiusVars, spacingVars } from "@bolerish/tokens/semantic.stylex";
import * as stylex from "@stylexjs/stylex";
import type { ComponentProps, ReactNode } from "react";

const styles = stylex.create({
  root: { overflow: "hidden", position: "relative" },
  viewport: { height: "100%", width: "100%" },
  content: { minWidth: "100%" },
  scrollbar: {
    display: "flex",
    padding: spacingVars.space0_5,
    touchAction: "none",
    transitionDuration: motionVars.durationFast,
    transitionProperty: "background-color",
    transitionTimingFunction: motionVars.easingStandard,
    userSelect: "none",
  },

  thumb: {
    backgroundColor: colorVars.strokeDefault,
    borderRadius: radiusVars.full,
    flex: 1,
    minHeight: 20,
    minWidth: 20,
    transitionDuration: motionVars.durationFast,
    transitionProperty: "background-color",
    transitionTimingFunction: motionVars.easingStandard,
    ":hover": { backgroundColor: colorVars.strokeStrong },
  },
  corner: { backgroundColor: "transparent" },
});

const orientationStyles = stylex.create({
  horizontal: { flexDirection: "column", height: 10, width: "100%" },
  vertical: { height: "100%", width: 10 },
});

export type ScrollAreaProps = Omit<
  ComponentProps<typeof ScrollAreaPrimitive.Root>,
  "className" | "style"
> & {
  children: ReactNode;
  scrollbars?: "both" | "horizontal" | "vertical";
  xstyle?: stylex.StyleXStyles;
};

export function ScrollArea({
  children,
  scrollbars = "vertical",
  xstyle,
  ...props
}: ScrollAreaProps) {
  return (
    <ScrollAreaPrimitive.Root {...props} {...stylex.props(styles.root, xstyle)}>
      {children}
      {scrollbars === "vertical" || scrollbars === "both" ? (
        <ScrollBar orientation="vertical" />
      ) : null}
      {scrollbars === "horizontal" || scrollbars === "both" ? (
        <ScrollBar orientation="horizontal" />
      ) : null}
      <ScrollAreaPrimitive.Corner {...stylex.props(styles.corner)} />
    </ScrollAreaPrimitive.Root>
  );
}

export function ScrollBar({
  xstyle,
  orientation = "vertical",
  ...props
}: Omit<ComponentProps<typeof ScrollAreaPrimitive.Scrollbar>, "className" | "style"> & {
  xstyle?: stylex.StyleXStyles;
}) {
  return (
    <ScrollAreaPrimitive.Scrollbar
      {...props}
      {...stylex.props(styles.scrollbar, orientationStyles[orientation], xstyle)}
      orientation={orientation}
    >
      <ScrollAreaPrimitive.Thumb {...stylex.props(styles.thumb)} />
    </ScrollAreaPrimitive.Scrollbar>
  );
}

export function ScrollAreaViewport({
  xstyle,
  ...props
}: Omit<ComponentProps<typeof ScrollAreaPrimitive.Viewport>, "className" | "style"> & {
  xstyle?: stylex.StyleXStyles;
}) {
  return <ScrollAreaPrimitive.Viewport {...props} {...stylex.props(styles.viewport, xstyle)} />;
}

export function ScrollAreaContent({
  xstyle,
  ...props
}: Omit<ComponentProps<typeof ScrollAreaPrimitive.Content>, "className" | "style"> & {
  xstyle?: stylex.StyleXStyles;
}) {
  return <ScrollAreaPrimitive.Content {...props} {...stylex.props(styles.content, xstyle)} />;
}
