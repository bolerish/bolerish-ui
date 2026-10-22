"use client";

import { Drawer as DrawerPrimitive } from "@base-ui/react/drawer";
import {
  colorVars,
  layerVars,
  motionVars,
  radiusVars,
  shadowVars,
  sizeVars,
  spacingVars,
  typo,
} from "@bolerish/tokens/semantic.stylex";
import * as stylex from "@stylexjs/stylex";
import { createContext, useContext } from "react";
import type { ComponentProps } from "react";

import type { ControlPlacementStyles } from "./styles/control-layout";

const styles = stylex.create({
  overlay: {
    backgroundColor: colorVars.bgOverlay,
    inset: 0,
    position: "fixed",
    transitionDuration: motionVars.durationSlow,
    transitionProperty: "opacity",
    transitionTimingFunction: motionVars.easingEnter,
    zIndex: layerVars.modalBackdrop,
    ":is([data-starting-style])": { opacity: 0 },
    ":is([data-ending-style])": {
      opacity: 0,
      transitionDuration: motionVars.durationNormal,
      transitionTimingFunction: motionVars.easingExit,
    },
    "@media (prefers-reduced-motion: reduce)": {
      ":not(:root[data-nuee-motion='on'] *)": {
        transitionDuration: motionVars.durationInstant,
        ":is([data-ending-style])": { transitionDuration: motionVars.durationInstant },
      },
    },
  },
  overlayTransparent: { backgroundColor: "transparent" },
  viewport: { inset: 0, position: "fixed", zIndex: layerVars.modal },
  popup: {
    backgroundColor: colorVars.bgRaised,
    borderColor: colorVars.strokeDefault,
    borderStyle: "solid",
    borderWidth: sizeVars.stroke,
    boxShadow: shadowVars.overlay,
    color: colorVars.fgPrimary,
    display: "flex",
    flexDirection: "column",
    minHeight: 0,
    outline: "none",
    overflow: "hidden",
    position: "fixed",
    transitionDuration: motionVars.durationSlow,
    transitionProperty: "opacity, transform",
    transitionTimingFunction: motionVars.easingEnter,
    willChange: "transform",
    ":is([data-ending-style])": {
      transitionDuration: motionVars.durationNormal,
      transitionTimingFunction: motionVars.easingExit,
    },
    "@media (prefers-reduced-motion: reduce)": {
      ":not(:root[data-nuee-motion='on'] *)": {
        transitionDuration: motionVars.durationInstant,
        ":is([data-ending-style])": { transitionDuration: motionVars.durationInstant },
      },
    },
  },
  verticalPopup: {
    left: 0,
    marginInline: "auto",
    maxHeight: "calc(100dvh - 6rem)",
    right: 0,
    width: "100%",
  },

  horizontalPopup: {
    bottom: 0,
    maxWidth: sizeVars.contentSm,
    top: 0,
    width: "75vw",
  },

  content: { display: "flex", flex: 1, flexDirection: "column", minHeight: 0 },
  swipeHandle: {
    alignSelf: "center",
    backgroundColor: colorVars.strokeDefault,
    borderRadius: radiusVars.full,
    flexShrink: 0,
    height: spacingVars.space1,
    marginBlock: spacingVars.space2,
    width: spacingVars.space10,
  },
  horizontalSwipeHandle: {
    height: spacingVars.space10,
    marginBlock: 0,
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    width: spacingVars.space1,
  },

  header: {
    display: "flex",
    flexDirection: "column",
    gap: spacingVars.space2,
    paddingBlock: spacingVars.space6,
    paddingBlockEnd: spacingVars.space2,
    paddingInline: spacingVars.space6,
  },
  footer: {
    alignItems: "center",
    display: "flex",
    flexWrap: "wrap",
    gap: spacingVars.space2,
    justifyContent: "flex-start",
    paddingBlock: spacingVars.space6,
    paddingBlockStart: spacingVars.space2,
    paddingInline: spacingVars.space6,
  },
  sideFooter: {
    "@media (max-width: 40rem)": { justifyContent: "center" },
  },
  title: {
    color: colorVars.fgPrimary,
    fontSize: typo.fontSizeLg,
    fontWeight: typo.fontWeightSemibold,
    lineHeight: typo.lineHeightTight,
    margin: 0,
  },
  description: {
    color: colorVars.fgSecondary,
    fontSize: typo.fontSizeSm,
    lineHeight: typo.lineHeightNormal,
    margin: 0,
  },
});

const popupDirectionStyles = stylex.create({
  down: {
    borderRadius: `${radiusVars.xl} ${radiusVars.xl} 0 0`,
    bottom: 0,
    minHeight: "50dvh",
    transform:
      "translate3d(var(--drawer-swipe-movement-x, 0px), calc(var(--drawer-snap-point-offset, 0px) + var(--drawer-swipe-movement-y, 0px)), 0)",
    ":is([data-starting-style], [data-ending-style])": {
      opacity: 0,
      transform: "translate3d(0, 100%, 0)",
    },
    "@media (prefers-reduced-motion: reduce)": {
      ":not(:root[data-nuee-motion='on'] *)": {
        ":is([data-starting-style], [data-ending-style])": {
          transform: "translate3d(0, 24%, 0)",
        },
      },
    },
  },
  up: {
    borderRadius: `0 0 ${radiusVars.xl} ${radiusVars.xl}`,
    minHeight: "50dvh",
    top: 0,
    transform:
      "translate3d(var(--drawer-swipe-movement-x, 0px), calc(var(--drawer-snap-point-offset, 0px) + var(--drawer-swipe-movement-y, 0px)), 0)",
    ":is([data-starting-style], [data-ending-style])": {
      opacity: 0,
      transform: "translate3d(0, -100%, 0)",
    },
    "@media (prefers-reduced-motion: reduce)": {
      ":not(:root[data-nuee-motion='on'] *)": {
        ":is([data-starting-style], [data-ending-style])": {
          transform: "translate3d(0, -24%, 0)",
        },
      },
    },
  },
  left: {
    borderRadius: `0 ${radiusVars.xl} ${radiusVars.xl} 0`,
    left: 0,
    transform:
      "translate3d(var(--drawer-swipe-movement-x, 0px), var(--drawer-swipe-movement-y, 0px), 0)",
    ":is([data-starting-style], [data-ending-style])": {
      opacity: 0,
      transform: "translate3d(-100%, 0, 0)",
    },
    "@media (prefers-reduced-motion: reduce)": {
      ":not(:root[data-nuee-motion='on'] *)": {
        ":is([data-starting-style], [data-ending-style])": {
          transform: "translate3d(-24%, 0, 0)",
        },
      },
    },
  },
  right: {
    borderRadius: `${radiusVars.xl} 0 0 ${radiusVars.xl}`,
    right: 0,
    transform:
      "translate3d(var(--drawer-swipe-movement-x, 0px), var(--drawer-swipe-movement-y, 0px), 0)",
    ":is([data-starting-style], [data-ending-style])": {
      opacity: 0,
      transform: "translate3d(100%, 0, 0)",
    },
    "@media (prefers-reduced-motion: reduce)": {
      ":not(:root[data-nuee-motion='on'] *)": {
        ":is([data-starting-style], [data-ending-style])": {
          transform: "translate3d(24%, 0, 0)",
        },
      },
    },
  },
});

const handleDirectionStyles = stylex.create({
  down: {},
  up: {
    bottom: spacingVars.space2,
    left: 0,
    marginBlock: 0,
    marginInline: "auto",
    position: "absolute",
    right: 0,
  },
  left: { right: spacingVars.space2 },
  right: { left: spacingVars.space2 },
});

type DrawerContextValue = {
  overlay: DrawerOverlayMode;
  showSwipeHandle: boolean;
  swipeDirection: DrawerSwipeDirection;
};

export type DrawerOverlayMode = "visible" | "transparent" | "none";
export type DrawerSwipeDirection = "down" | "up" | "left" | "right";

const DrawerContext = createContext<DrawerContextValue>({
  overlay: "visible",
  showSwipeHandle: false,
  swipeDirection: "down",
});

export type DrawerProps = Omit<
  ComponentProps<typeof DrawerPrimitive.Root>,
  "swipeDirection" | "className" | "style"
> & {
  /** Controls the backdrop behind the Drawer. */
  overlay?: DrawerOverlayMode;
  showSwipeHandle?: boolean;
  swipeDirection?: DrawerSwipeDirection;
};

export function Drawer({
  overlay = "visible",
  showSwipeHandle = false,
  swipeDirection = "down",
  ...props
}: DrawerProps) {
  return (
    <DrawerContext.Provider value={{ overlay, showSwipeHandle, swipeDirection }}>
      <DrawerPrimitive.Root {...props} swipeDirection={swipeDirection} />
    </DrawerContext.Provider>
  );
}

export function DrawerTrigger({
  xstyle,
  ...props
}: Omit<ComponentProps<typeof DrawerPrimitive.Trigger>, "className" | "style"> & {
  xstyle?: stylex.StyleXStyles;
}) {
  return <DrawerPrimitive.Trigger {...props} {...stylex.props(xstyle)} />;
}
export function DrawerClose({
  xstyle,
  ...props
}: Omit<ComponentProps<typeof DrawerPrimitive.Close>, "className" | "style"> & {
  xstyle?: stylex.StyleXStyles;
}) {
  return <DrawerPrimitive.Close {...props} {...stylex.props(xstyle)} />;
}

type DrawerOverlayProps = Omit<
  ComponentProps<typeof DrawerPrimitive.Backdrop>,
  "className" | "style"
> & {
  xstyle?: stylex.StyleXStyles;
};

function DrawerOverlay({ xstyle, ...props }: DrawerOverlayProps) {
  return (
    <DrawerPrimitive.Backdrop
      {...props}
      data-slot="drawer-overlay"
      {...stylex.props(styles.overlay, xstyle)}
    />
  );
}

type DrawerSwipeHandleProps = Omit<ComponentProps<"div">, "className" | "style"> & {
  xstyle?: stylex.StyleXStyles;
};

function DrawerSwipeHandle({ xstyle, ...props }: DrawerSwipeHandleProps) {
  const { swipeDirection } = useContext(DrawerContext);
  const isHorizontal = swipeDirection === "left" || swipeDirection === "right";
  return (
    <div
      aria-hidden="true"
      data-slot="drawer-swipe-handle"
      {...props}
      {...stylex.props(
        styles.swipeHandle,
        isHorizontal && styles.horizontalSwipeHandle,
        handleDirectionStyles[swipeDirection],
        xstyle,
      )}
    />
  );
}

type DrawerContentProps = Omit<
  ComponentProps<typeof DrawerPrimitive.Popup>,
  "className" | "style"
> & {
  xstyle?: stylex.StyleXStyles;
};

export function DrawerContent({ children, xstyle, ...props }: DrawerContentProps) {
  const { overlay, showSwipeHandle, swipeDirection } = useContext(DrawerContext);
  const isHorizontal = swipeDirection === "left" || swipeDirection === "right";

  return (
    <DrawerPrimitive.Portal>
      {overlay === "none" ? null : (
        <DrawerOverlay xstyle={overlay === "transparent" ? styles.overlayTransparent : undefined} />
      )}
      <DrawerPrimitive.Viewport {...stylex.props(styles.viewport)}>
        <DrawerPrimitive.Popup
          {...props}
          data-slot="drawer-popup"
          {...stylex.props(
            styles.popup,
            isHorizontal ? styles.horizontalPopup : styles.verticalPopup,
            popupDirectionStyles[swipeDirection],
          )}
        >
          {showSwipeHandle ? <DrawerSwipeHandle /> : null}
          <DrawerPrimitive.Content {...stylex.props(styles.content, xstyle)}>
            {children}
          </DrawerPrimitive.Content>
        </DrawerPrimitive.Popup>
      </DrawerPrimitive.Viewport>
    </DrawerPrimitive.Portal>
  );
}

export function DrawerHeader({
  xstyle,
  ...props
}: Omit<ComponentProps<"div">, "className" | "style"> & { xstyle?: stylex.StyleXStyles }) {
  return <div {...props} {...stylex.props(styles.header, xstyle)} />;
}

export function DrawerFooter({
  xstyle,
  ...props
}: Omit<ComponentProps<"div">, "className" | "style"> & { xstyle?: stylex.StyleXStyles }) {
  const { swipeDirection } = useContext(DrawerContext);
  const isSideDrawer = swipeDirection === "left" || swipeDirection === "right";

  return (
    <div {...props} {...stylex.props(styles.footer, isSideDrawer && styles.sideFooter, xstyle)} />
  );
}

export function DrawerTitle({
  xstyle,
  ...props
}: Omit<ComponentProps<typeof DrawerPrimitive.Title>, "className" | "style"> & {
  xstyle?: ControlPlacementStyles;
}) {
  return <DrawerPrimitive.Title {...props} {...stylex.props(styles.title, xstyle)} />;
}

export function DrawerDescription({
  xstyle,
  ...props
}: Omit<ComponentProps<typeof DrawerPrimitive.Description>, "className" | "style"> & {
  xstyle?: ControlPlacementStyles;
}) {
  return <DrawerPrimitive.Description {...props} {...stylex.props(styles.description, xstyle)} />;
}
