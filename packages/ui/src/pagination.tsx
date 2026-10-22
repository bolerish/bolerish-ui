"use client";

import {
  colorVars,
  motionVars,
  radiusVars,
  sizeVars,
  spacingVars,
  typo,
} from "@bolerish/tokens/semantic.stylex";
import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react";
import * as stylex from "@stylexjs/stylex";
import type { ComponentProps } from "react";

import type { ControlLayoutStyles, ControlPlacementStyles } from "./styles/control-layout";

const styles = stylex.create({
  root: { display: "flex", justifyContent: "center", width: "100%" },
  content: {
    alignItems: "center",
    display: "flex",
    gap: spacingVars.space1,
    listStyle: "none",
    margin: 0,
    padding: 0,
  },
  item: { display: "inline-flex" },
  link: {
    alignItems: "center",
    backgroundColor: {
      default: "transparent",
      ":hover": colorVars.interactionHover,
      ":active": colorVars.interactionPressed,
    },
    borderColor: "transparent",
    borderRadius: radiusVars.sm,
    borderStyle: "solid",
    borderWidth: sizeVars.stroke,
    color: colorVars.fgPrimary,
    display: "inline-flex",
    fontSize: typo.fontSizeSm,
    fontWeight: typo.fontWeightMedium,
    gap: spacingVars.space1,
    justifyContent: "center",
    minHeight: sizeVars.controlMd,
    outline: "none",
    textDecoration: "none",
    transitionDuration: motionVars.durationFast,
    transitionProperty: "background-color, border-color, color",
    transitionTimingFunction: motionVars.easingStandard,
    ":focus-visible": {
      outlineColor: colorVars.strokeFocus,
      outlineOffset: sizeVars.stroke,
      outlineStyle: "solid",
      outlineWidth: sizeVars.focusRing,
    },
    "[aria-disabled='true']": {
      color: colorVars.fgDisabled,
      cursor: "not-allowed",
      pointerEvents: "none",
    },
  },

  active: { backgroundColor: colorVars.bgSurfacePressed, borderColor: colorVars.strokeStrong },
  ellipsis: {
    alignItems: "center",
    color: colorVars.fgTertiary,
    display: "inline-flex",
    height: sizeVars.controlMd,
    justifyContent: "center",
    width: sizeVars.controlMd,
  },
});

const sizeStyles = stylex.create({
  default: { paddingInline: spacingVars.space3 },
  icon: { width: sizeVars.controlMd },
});

export function Pagination({
  xstyle,
  ...props
}: Omit<ComponentProps<"nav">, "className" | "style"> & { xstyle?: stylex.StyleXStyles }) {
  return <nav aria-label="Pagination" {...props} {...stylex.props(styles.root, xstyle)} />;
}

export function PaginationContent({
  xstyle,
  ...props
}: Omit<ComponentProps<"ul">, "className" | "style"> & { xstyle?: stylex.StyleXStyles }) {
  return <ul {...props} {...stylex.props(styles.content, xstyle)} />;
}

export function PaginationItem({
  xstyle,
  ...props
}: Omit<ComponentProps<"li">, "className" | "style"> & { xstyle?: stylex.StyleXStyles }) {
  return <li {...props} {...stylex.props(styles.item, xstyle)} />;
}

export type PaginationLinkProps = Omit<ComponentProps<"a">, "className" | "style"> & {
  isActive?: boolean;
  size?: "default" | "icon";
  xstyle?: ControlLayoutStyles;
};

export function PaginationLink({
  xstyle,
  children,
  isActive = false,
  size = "icon",
  ...props
}: PaginationLinkProps) {
  return (
    <a
      aria-current={isActive ? "page" : undefined}
      {...props}
      {...stylex.props(styles.link, sizeStyles[size], isActive && styles.active, xstyle)}
    >
      {children}
    </a>
  );
}

export function PaginationPrevious({ children, ...props }: PaginationLinkProps) {
  return (
    <PaginationLink aria-label="Previous page" size="default" {...props}>
      <CaretLeftIcon aria-hidden="true" />
      {children ?? "Previous"}
    </PaginationLink>
  );
}

export function PaginationNext({ children, ...props }: PaginationLinkProps) {
  return (
    <PaginationLink aria-label="Next page" size="default" {...props}>
      {children ?? "Next"}
      <CaretRightIcon aria-hidden="true" />
    </PaginationLink>
  );
}

export function PaginationEllipsis({
  xstyle,
  ...props
}: Omit<ComponentProps<"span">, "className" | "style"> & { xstyle?: ControlPlacementStyles }) {
  return (
    <span aria-hidden="true" {...props} {...stylex.props(styles.ellipsis, xstyle)}>
      …
    </span>
  );
}
