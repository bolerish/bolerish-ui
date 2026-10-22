"use client";

import { useRender } from "@base-ui/react/use-render";
import { colorVars, motionVars, sizeVars, typographyVars } from "@bolerish/tokens/semantic.stylex";
import { ArrowSquareOutIcon } from "@phosphor-icons/react";
import * as stylex from "@stylexjs/stylex";
import type { ComponentProps } from "react";

import type { ControlPlacementStyles } from "./styles/control-layout";

const styles = stylex.create({
  root: {
    alignItems: "center",
    borderRadius: "0.125rem",
    display: "inline-flex",
    fontFamily: typographyVars.fontFamilyBody,
    gap: "0.1875em",
    outline: "none",
    transitionDuration: motionVars.durationFast,
    transitionProperty: "color, opacity, text-decoration-color",
    transitionTimingFunction: motionVars.easingStandard,
    ":focus-visible": {
      outlineColor: colorVars.strokeFocus,
      outlineOffset: sizeVars.stroke,
      outlineStyle: "solid",
      outlineWidth: sizeVars.focusRing,
    },
  },
});

const variantStyles = stylex.create({
  inline: {
    color: colorVars.fgAction,
    textDecorationLine: "underline",
    textDecorationThickness: sizeVars.stroke,
    textUnderlineOffset: "0.15em",
    ":hover": { opacity: 0.72 },
  },
  current: {
    color: "currentColor",
    textDecorationLine: "underline",
    textDecorationThickness: sizeVars.stroke,
    textUnderlineOffset: "0.15em",
    ":hover": { opacity: 0.72 },
  },
  plain: {
    color: colorVars.fgAction,
    textDecorationLine: "none",
    ":hover": { opacity: 0.72 },
  },
});

export type LinkVariant = "current" | "inline" | "plain";

export type LinkProps = Omit<useRender.ComponentProps<"a">, "className" | "style"> & {
  variant?: LinkVariant;
  xstyle?: ControlPlacementStyles;
};

function LinkBase({ xstyle, ref, render, variant = "inline", ...props }: LinkProps) {
  return useRender({
    defaultTagName: "a",
    props: {
      ...props,
      ...stylex.props(styles.root, variantStyles[variant], xstyle),
    },
    ref,
    render,
  });
}

function ExternalIcon({
  xstyle,
  ...props
}: Omit<ComponentProps<typeof ArrowSquareOutIcon>, "className" | "style"> & {
  xstyle?: ControlPlacementStyles;
}) {
  return <ArrowSquareOutIcon aria-hidden="true" size="1em" {...props} {...stylex.props(xstyle)} />;
}

export const Link = Object.assign(LinkBase, { ExternalIcon });
