"use client";

import {
  colorVars,
  motionVars,
  radiusVars,
  sizeVars,
  spacingVars,
  typo,
} from "@bolerish/tokens/semantic.stylex";
import { CaretRightIcon } from "@phosphor-icons/react";
import * as stylex from "@stylexjs/stylex";
import type { ComponentProps, ReactNode } from "react";

import type { ControlPlacementStyles } from "./styles/control-layout";

const styles = stylex.create({
  root: { minWidth: 0 },
  list: {
    alignItems: "center",
    color: colorVars.fgSecondary,
    display: "flex",
    flexWrap: "wrap",
    fontSize: typo.fontSizeSm,
    gap: spacingVars.space2,
    lineHeight: typo.lineHeightNormal,
    listStyle: "none",
    margin: 0,
    padding: 0,
  },
  item: { alignItems: "center", display: "inline-flex", gap: spacingVars.space2 },
  link: {
    borderRadius: radiusVars.sm,
    color: colorVars.fgSecondary,
    outline: "none",
    textDecoration: "none",
    transitionDuration: motionVars.durationFast,
    transitionProperty: "color, text-decoration-color",
    transitionTimingFunction: motionVars.easingStandard,
    ":hover": { color: colorVars.fgPrimary, textDecoration: "underline" },
    ":focus-visible": {
      outlineColor: colorVars.strokeFocus,
      outlineOffset: sizeVars.stroke,
      outlineStyle: "solid",
      outlineWidth: sizeVars.focusRing,
    },
  },
  page: { color: colorVars.fgPrimary, fontWeight: typo.fontWeightMedium },
  separator: { alignItems: "center", color: colorVars.fgTertiary, display: "inline-flex" },
  ellipsis: {
    alignItems: "center",
    color: colorVars.fgTertiary,
    display: "inline-flex",
    height: sizeVars.iconMd,
    justifyContent: "center",
    width: sizeVars.iconMd,
  },
});

export function Breadcrumb({
  xstyle,
  ...props
}: Omit<ComponentProps<"nav">, "className" | "style"> & { xstyle?: stylex.StyleXStyles }) {
  return <nav aria-label="Breadcrumb" {...props} {...stylex.props(styles.root, xstyle)} />;
}

export function BreadcrumbList({
  xstyle,
  ...props
}: Omit<ComponentProps<"ol">, "className" | "style"> & { xstyle?: stylex.StyleXStyles }) {
  return <ol {...props} {...stylex.props(styles.list, xstyle)} />;
}

export function BreadcrumbItem({
  xstyle,
  ...props
}: Omit<ComponentProps<"li">, "className" | "style"> & { xstyle?: stylex.StyleXStyles }) {
  return <li {...props} {...stylex.props(styles.item, xstyle)} />;
}

export function BreadcrumbLink({
  xstyle,
  children,
  ...props
}: Omit<ComponentProps<"a">, "className" | "style"> & { xstyle?: ControlPlacementStyles }) {
  return (
    <a {...props} {...stylex.props(styles.link, xstyle)}>
      {children}
    </a>
  );
}

export function BreadcrumbPage({
  xstyle,
  ...props
}: Omit<ComponentProps<"span">, "className" | "style"> & { xstyle?: stylex.StyleXStyles }) {
  return <span aria-current="page" {...props} {...stylex.props(styles.page, xstyle)} />;
}

export function BreadcrumbSeparator({
  xstyle,
  children,
  ...props
}: Omit<ComponentProps<"li">, "className" | "style"> & { children?: ReactNode } & {
  xstyle?: ControlPlacementStyles;
}) {
  return (
    <li
      aria-hidden="true"
      role="presentation"
      {...props}
      {...stylex.props(styles.separator, xstyle)}
    >
      {children ?? <CaretRightIcon />}
    </li>
  );
}

export function BreadcrumbEllipsis({
  xstyle,
  ...props
}: Omit<ComponentProps<"span">, "className" | "style"> & { xstyle?: ControlPlacementStyles }) {
  return (
    <span aria-hidden="true" {...props} {...stylex.props(styles.ellipsis, xstyle)}>
      …
    </span>
  );
}
