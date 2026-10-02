import {
  colorVars,
  radiusVars,
  sizeVars,
  spacingVars,
  typographyVars,
} from "@nuee/tokens/semantic.stylex";
import * as stylex from "@stylexjs/stylex";
import type { ComponentProps } from "react";

import type { ControlPlacementStyles } from "./styles/control-layout";

const styles = stylex.create({
  group: { display: "flex", flexDirection: "column", gap: spacingVars.space2, minWidth: 0 },
  root: { display: "flex", gap: spacingVars.space2, minWidth: 0, width: "100%" },

  avatar: {
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: colorVars.bgSubtle,
    borderRadius: radiusVars.full,
    display: "flex",
    flexShrink: 0,
    justifyContent: "center",
    minWidth: sizeVars.controlLg,
    overflow: "hidden",
  },
  header: {
    alignItems: "center",
    color: colorVars.fgSecondary,
    display: "flex",
    fontSize: typographyVars.fontSizeXs,
    fontWeight: typographyVars.fontWeightMedium,
    maxWidth: "100%",
    minWidth: 0,
  },
  content: {
    display: "flex",
    flexDirection: "column",
    gap: spacingVars.space2,
    maxWidth: "85%",
    minWidth: 0,
    width: "fit-content",
  },
  footer: {
    alignItems: "center",
    color: colorVars.fgTertiary,
    display: "flex",
    fontSize: typographyVars.fontSizeXs,
    justifyContent: "flex-end",
    maxWidth: "100%",
    minWidth: 0,
  },
});

const alignStyles = stylex.create({
  start: { flexDirection: "row" },
  end: { flexDirection: "row-reverse" },
});

export type MessageAlign = "start" | "end";

export type MessageProps = Omit<ComponentProps<"article">, "className" | "style"> & {
  align?: MessageAlign;
  xstyle?: stylex.StyleXStyles;
};

export function Message({ align = "start", xstyle, ...props }: MessageProps) {
  return (
    <article
      {...props}
      data-align={align}
      {...stylex.props(styles.root, alignStyles[align], xstyle)}
    />
  );
}

export function MessageGroup({
  xstyle,
  ...props
}: Omit<ComponentProps<"div">, "className" | "style"> & { xstyle?: stylex.StyleXStyles }) {
  return <div {...props} {...stylex.props(styles.group, xstyle)} />;
}

export function MessageAvatar({
  xstyle,
  ...props
}: Omit<ComponentProps<"div">, "className" | "style"> & { xstyle?: ControlPlacementStyles }) {
  return <div {...props} {...stylex.props(styles.avatar, xstyle)} />;
}

export function MessageHeader({
  xstyle,
  ...props
}: Omit<ComponentProps<"header">, "className" | "style"> & { xstyle?: stylex.StyleXStyles }) {
  return <header {...props} {...stylex.props(styles.header, xstyle)} />;
}

export function MessageContent({
  xstyle,
  ...props
}: Omit<ComponentProps<"div">, "className" | "style"> & { xstyle?: stylex.StyleXStyles }) {
  return <div {...props} {...stylex.props(styles.content, xstyle)} />;
}

export function MessageFooter({
  xstyle,
  ...props
}: Omit<ComponentProps<"footer">, "className" | "style"> & { xstyle?: stylex.StyleXStyles }) {
  return <footer {...props} {...stylex.props(styles.footer, xstyle)} />;
}
