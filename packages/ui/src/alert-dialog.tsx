"use client";

import { AlertDialog as AlertDialogPrimitive } from "@base-ui/react/alert-dialog";
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
import type { ComponentProps, ReactNode } from "react";

import { Button } from "./button";
import type { ControlPlacementStyles } from "./styles/control-layout";

const styles = stylex.create({
  backdrop: {
    backdropFilter: "blur(4px)",
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
  viewport: {
    alignItems: "center",
    display: "flex",
    inset: 0,
    justifyContent: "center",
    padding: spacingVars.space4,
    position: "fixed",
    zIndex: layerVars.modal,
  },
  popup: {
    backgroundColor: colorVars.bgRaised,
    borderColor: colorVars.strokeDefault,
    borderRadius: radiusVars.sm,
    borderStyle: "solid",
    borderWidth: sizeVars.stroke,
    boxShadow: shadowVars.overlay,
    display: "flex",
    flexDirection: "column",
    gap: spacingVars.space4,
    maxHeight: "calc(100dvh - 2rem)",
    maxWidth: "28rem",
    outline: "none",
    overflow: "auto",
    padding: spacingVars.space6,
    position: "relative",
    transitionDuration: motionVars.durationSlow,
    transitionProperty: "opacity, transform",
    transitionTimingFunction: motionVars.easingEnter,
    width: "100%",
    ":is([data-starting-style], [data-ending-style])": {
      opacity: 0,
      transform: "scale(0.95)",
    },
    ":is([data-ending-style])": {
      transitionDuration: motionVars.durationNormal,
      transitionTimingFunction: motionVars.easingExit,
    },
    "@media (prefers-reduced-motion: reduce)": {
      ":not(:root[data-nuee-motion='on'] *)": {
        transitionDuration: motionVars.durationInstant,
        ":is([data-ending-style])": { transitionDuration: motionVars.durationInstant },
        ":is([data-starting-style], [data-ending-style])": { transform: "scale(0.99)" },
      },
    },
  },
  header: { display: "flex", flexDirection: "column", gap: spacingVars.space2 },
  footer: {
    alignItems: "center",
    display: "flex",
    flexWrap: "wrap",
    gap: spacingVars.space2,
    justifyContent: "flex-end",
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

export const AlertDialog = AlertDialogPrimitive.Root;
export function AlertDialogTrigger({
  xstyle,
  ...props
}: Omit<ComponentProps<typeof AlertDialogPrimitive.Trigger>, "className" | "style"> & {
  xstyle?: stylex.StyleXStyles;
}) {
  return <AlertDialogPrimitive.Trigger {...props} {...stylex.props(xstyle)} />;
}

type AlertDialogContentProps = Omit<
  ComponentProps<typeof AlertDialogPrimitive.Popup>,
  "className" | "style"
> & {
  children: ReactNode;
  xstyle?: stylex.StyleXStyles;
};

export function AlertDialogContent({ children, xstyle, ...props }: AlertDialogContentProps) {
  return (
    <AlertDialogPrimitive.Portal>
      <AlertDialogPrimitive.Backdrop {...stylex.props(styles.backdrop)} />
      <AlertDialogPrimitive.Viewport {...stylex.props(styles.viewport)}>
        <AlertDialogPrimitive.Popup {...props} {...stylex.props(styles.popup, xstyle)}>
          {children}
        </AlertDialogPrimitive.Popup>
      </AlertDialogPrimitive.Viewport>
    </AlertDialogPrimitive.Portal>
  );
}

export function AlertDialogHeader({
  xstyle,
  ...props
}: Omit<ComponentProps<"div">, "className" | "style"> & { xstyle?: stylex.StyleXStyles }) {
  return <div {...props} {...stylex.props(styles.header, xstyle)} />;
}

export function AlertDialogFooter({
  xstyle,
  ...props
}: Omit<ComponentProps<"div">, "className" | "style"> & { xstyle?: stylex.StyleXStyles }) {
  return <div {...props} {...stylex.props(styles.footer, xstyle)} />;
}

export function AlertDialogTitle({
  xstyle,
  ...props
}: Omit<ComponentProps<typeof AlertDialogPrimitive.Title>, "className" | "style"> & {
  xstyle?: ControlPlacementStyles;
}) {
  return <AlertDialogPrimitive.Title {...props} {...stylex.props(styles.title, xstyle)} />;
}

export function AlertDialogDescription({
  xstyle,
  ...props
}: Omit<ComponentProps<typeof AlertDialogPrimitive.Description>, "className" | "style"> & {
  xstyle?: ControlPlacementStyles;
}) {
  return (
    <AlertDialogPrimitive.Description {...props} {...stylex.props(styles.description, xstyle)} />
  );
}

type AlertDialogButtonProps = Omit<
  ComponentProps<typeof AlertDialogPrimitive.Close>,
  "className" | "style"
>;

export function AlertDialogCancel({ children, ...props }: AlertDialogButtonProps) {
  return (
    <AlertDialogPrimitive.Close
      {...props}
      render={<Button variant="secondary">{children}</Button>}
    />
  );
}

export function AlertDialogAction({ children, ...props }: AlertDialogButtonProps) {
  return (
    <AlertDialogPrimitive.Close
      {...props}
      render={<Button variant="destructive">{children}</Button>}
    />
  );
}
