import {
  colorVars,
  radiusVars,
  sizeVars,
  spacingVars,
  typo,
} from "@bolerish/tokens/semantic.stylex";
import * as stylex from "@stylexjs/stylex";
import type { ComponentProps } from "react";

const styles = stylex.create({
  root: {
    alignItems: "center",
    borderColor: colorVars.strokeDefault,
    borderRadius: radiusVars.sm,
    borderStyle: "dashed",
    borderWidth: sizeVars.stroke,
    display: "flex",
    flexDirection: "column",
    gap: spacingVars.space6,
    justifyContent: "center",
    minWidth: 0,
    padding: spacingVars.space8,
    textAlign: "center",
  },
  header: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    gap: spacingVars.space2,
    maxWidth: sizeVars.contentSm,
  },
  media: {
    alignItems: "center",
    backgroundColor: colorVars.bgSubtle,
    borderRadius: radiusVars.sm,
    color: colorVars.fgSecondary,
    display: "flex",
    height: sizeVars.touchTarget,
    justifyContent: "center",
    width: sizeVars.touchTarget,
  },
  title: {
    color: colorVars.fgPrimary,
    fontSize: typo.fontSizeLg,
    fontWeight: typo.fontWeightMedium,
    lineHeight: typo.lineHeightTight,
    margin: 0,
  },
  description: {
    color: colorVars.fgSecondary,
    fontSize: typo.fontSizeSm,
    lineHeight: typo.lineHeightNormal,
    margin: 0,
  },
  content: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    gap: spacingVars.space4,
    maxWidth: sizeVars.contentSm,
    width: "100%",
  },
});

type StyleProps = { xstyle?: stylex.StyleXStyles };

export function Empty({
  xstyle,
  ...props
}: Omit<ComponentProps<"div">, "className" | "style"> & StyleProps) {
  return <div {...props} {...stylex.props(styles.root, xstyle)} />;
}

export function EmptyHeader({
  xstyle,
  ...props
}: Omit<ComponentProps<"div">, "className" | "style"> & StyleProps) {
  return <div {...props} {...stylex.props(styles.header, xstyle)} />;
}

export function EmptyMedia({
  xstyle,
  ...props
}: Omit<ComponentProps<"div">, "className" | "style"> & StyleProps) {
  return <div {...props} aria-hidden="true" {...stylex.props(styles.media, xstyle)} />;
}

export function EmptyTitle({
  children,
  xstyle,
  ...props
}: Omit<ComponentProps<"h3">, "className" | "style"> & StyleProps) {
  return (
    <h3 {...props} {...stylex.props(styles.title, xstyle)}>
      {children}
    </h3>
  );
}

export function EmptyDescription({
  xstyle,
  ...props
}: Omit<ComponentProps<"p">, "className" | "style"> & StyleProps) {
  return <p {...props} {...stylex.props(styles.description, xstyle)} />;
}

export function EmptyContent({
  xstyle,
  ...props
}: Omit<ComponentProps<"div">, "className" | "style"> & StyleProps) {
  return <div {...props} {...stylex.props(styles.content, xstyle)} />;
}
