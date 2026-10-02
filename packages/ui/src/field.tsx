"use client";

import { Field as FieldPrimitive } from "@base-ui/react/field";
import { colorVars, spacingRoleVars, spacingVars, typo } from "@nuee/tokens/semantic.stylex";
import * as stylex from "@stylexjs/stylex";
import type { ComponentProps } from "react";

import { typographyStyles } from "./typography";

const styles = stylex.create({
  root: { display: "flex", gap: spacingRoleVars.labelGap, width: "100%" },

  label: {
    color: colorVars.fgPrimary,
    cursor: "default",
  },
  description: {
    color: colorVars.fgSecondary,
    margin: 0,
  },
  error: {
    color: colorVars.fgFeedbackError,
  },
  set: {
    borderStyle: "none",
    borderWidth: 0,
    display: "flex",
    flexDirection: "column",
    gap: spacingRoleVars.fieldGap,
    margin: 0,
    minWidth: 0,
    padding: 0,
  },
  legend: {
    color: colorVars.fgPrimary,
    fontSize: typo.fontSizeMd,
    fontWeight: typo.fontWeightMedium,
    marginBottom: spacingVars.space3,
    padding: 0,
  },
  group: { display: "flex", flexDirection: "column", gap: spacingRoleVars.fieldGap, width: "100%" },
  content: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    gap: spacingRoleVars.textGap,
    minWidth: 0,
  },
  title: {
    color: colorVars.fgPrimary,
  },
});

const orientationStyles = stylex.create({
  horizontal: { alignItems: "baseline", flexDirection: "row", gap: spacingRoleVars.fieldGap },
  vertical: { flexDirection: "column" },
});

type StyleProps = { xstyle?: stylex.StyleXStyles };
type FieldOrientation = "horizontal" | "vertical";

export type FieldProps = Omit<ComponentProps<typeof FieldPrimitive.Root>, "className" | "style"> &
  StyleProps & { orientation?: FieldOrientation };

export function Field({ orientation = "vertical", xstyle, ...props }: FieldProps) {
  return (
    <FieldPrimitive.Root
      {...props}
      data-orientation={orientation}
      {...stylex.props(styles.root, orientationStyles[orientation], xstyle)}
    />
  );
}

export function FieldLabel({
  xstyle,
  ...props
}: Omit<ComponentProps<typeof FieldPrimitive.Label>, "className" | "style"> & StyleProps) {
  return (
    <FieldPrimitive.Label
      {...props}
      {...stylex.props(typographyStyles.label, styles.label, xstyle)}
    />
  );
}

export function FieldDescription({
  xstyle,
  ...props
}: Omit<ComponentProps<typeof FieldPrimitive.Description>, "className" | "style"> & StyleProps) {
  return (
    <FieldPrimitive.Description
      {...props}
      {...stylex.props(typographyStyles.description, styles.description, xstyle)}
    />
  );
}

export function FieldError({
  xstyle,
  ...props
}: Omit<ComponentProps<typeof FieldPrimitive.Error>, "className" | "style"> & StyleProps) {
  return (
    <FieldPrimitive.Error
      {...props}
      {...stylex.props(typographyStyles.description, styles.error, xstyle)}
    />
  );
}

export function FieldSet({
  xstyle,
  ...props
}: Omit<ComponentProps<"fieldset">, "className" | "style"> & StyleProps) {
  return <fieldset {...props} {...stylex.props(styles.set, xstyle)} />;
}

export function FieldLegend({
  xstyle,
  ...props
}: Omit<ComponentProps<"legend">, "className" | "style"> & StyleProps) {
  return <legend {...props} {...stylex.props(styles.legend, xstyle)} />;
}

export function FieldGroup({
  xstyle,
  ...props
}: Omit<ComponentProps<"div">, "className" | "style"> & StyleProps) {
  return <div {...props} {...stylex.props(styles.group, xstyle)} />;
}

export function FieldContent({
  xstyle,
  ...props
}: Omit<ComponentProps<"div">, "className" | "style"> & StyleProps) {
  return <div {...props} {...stylex.props(styles.content, xstyle)} />;
}

export function FieldTitle({
  xstyle,
  ...props
}: Omit<ComponentProps<"div">, "className" | "style"> & StyleProps) {
  return <div {...props} {...stylex.props(typographyStyles.label, styles.title, xstyle)} />;
}
