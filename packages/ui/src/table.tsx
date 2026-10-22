import {
  colorVars,
  motionVars,
  sizeVars,
  spacingVars,
  typo,
} from "@bolerish/tokens/semantic.stylex";
import * as stylex from "@stylexjs/stylex";
import type { ComponentProps } from "react";

const styles = stylex.create({
  container: { overflowX: "auto", position: "relative", width: "100%" },
  table: {
    borderCollapse: "collapse",
    captionSide: "bottom",
    color: colorVars.fgPrimary,
    fontSize: typo.fontSizeSm,
    width: "100%",
  },
  header: {
    borderBottomColor: colorVars.strokeDefault,
    borderBottomStyle: "solid",
    borderBottomWidth: sizeVars.stroke,
  },
  body: {},
  footer: {
    backgroundColor: colorVars.bgSubtle,
    borderTopColor: colorVars.strokeDefault,
    borderTopStyle: "solid",
    borderTopWidth: sizeVars.stroke,
    fontWeight: typo.fontWeightMedium,
  },
  row: {
    borderBottomColor: colorVars.strokeDefault,
    borderBottomStyle: "solid",
    borderBottomWidth: sizeVars.stroke,
    transitionDuration: motionVars.durationFast,
    transitionProperty: "background-color",
    transitionTimingFunction: motionVars.easingStandard,
    backgroundColor: {
      default: "transparent",
      ":hover": colorVars.interactionHover,
    },
  },
  head: {
    color: colorVars.fgSecondary,
    fontWeight: typo.fontWeightMedium,
    height: sizeVars.controlLg,
    paddingInline: spacingVars.space3,
    textAlign: "left",
    verticalAlign: "middle",
    whiteSpace: "nowrap",
  },
  cell: {
    paddingBlock: spacingVars.space3,
    paddingInline: spacingVars.space3,
    verticalAlign: "middle",
    whiteSpace: "nowrap",
  },
  caption: {
    color: colorVars.fgSecondary,
    fontSize: typo.fontSizeSm,
    marginTop: spacingVars.space4,
    textAlign: "left",
    paddingInline: spacingVars.space1,
    paddingBlock: spacingVars.space3,
  },
});

export type TableProps = Omit<ComponentProps<"table">, "className" | "style"> & {
  xstyle?: stylex.StyleXStyles;
};

export function Table({ xstyle, ...props }: TableProps) {
  return <table {...props} {...stylex.props(styles.table, xstyle)} />;
}

export function TableHeader({
  xstyle,
  ...props
}: Omit<ComponentProps<"thead">, "className" | "style"> & { xstyle?: stylex.StyleXStyles }) {
  return <thead {...props} {...stylex.props(styles.header, xstyle)} />;
}

export function TableBody({
  xstyle,
  ...props
}: Omit<ComponentProps<"tbody">, "className" | "style"> & { xstyle?: stylex.StyleXStyles }) {
  return <tbody {...props} {...stylex.props(styles.body, xstyle)} />;
}

export function TableFooter({
  xstyle,
  ...props
}: Omit<ComponentProps<"tfoot">, "className" | "style"> & { xstyle?: stylex.StyleXStyles }) {
  return <tfoot {...props} {...stylex.props(styles.footer, xstyle)} />;
}

export function TableRow({
  xstyle,
  ...props
}: Omit<ComponentProps<"tr">, "className" | "style"> & { xstyle?: stylex.StyleXStyles }) {
  return <tr {...props} {...stylex.props(styles.row, xstyle)} />;
}

export function TableHead({
  xstyle,
  ...props
}: Omit<ComponentProps<"th">, "className" | "style"> & { xstyle?: stylex.StyleXStyles }) {
  return <th {...props} {...stylex.props(styles.head, xstyle)} />;
}

export function TableCell({
  xstyle,
  ...props
}: Omit<ComponentProps<"td">, "className" | "style"> & { xstyle?: stylex.StyleXStyles }) {
  return <td {...props} {...stylex.props(styles.cell, xstyle)} />;
}

export function TableCaption({
  xstyle,
  ...props
}: Omit<ComponentProps<"caption">, "className" | "style"> & { xstyle?: stylex.StyleXStyles }) {
  return <caption {...props} {...stylex.props(styles.caption, xstyle)} />;
}

export function TableContainer({
  xstyle,
  ...props
}: Omit<ComponentProps<"div">, "className" | "style"> & { xstyle?: stylex.StyleXStyles }) {
  return <div {...props} {...stylex.props(styles.container, xstyle)} />;
}
