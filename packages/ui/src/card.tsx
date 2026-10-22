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
  card: {
    backgroundColor: colorVars.bgSurface,
    borderColor: colorVars.strokeDefault,
    borderRadius: radiusVars.md,
    borderStyle: "solid",
    borderWidth: sizeVars.stroke,
    color: colorVars.fgPrimary,
    display: "flex",
    flexDirection: "column",
    fontFamily: typo.fontFamilyBody,
    fontSize: typo.fontSizeMd,
    lineHeight: typo.lineHeightNormal,
    minWidth: 0,
    width: "100%",
  },
  header: {
    display: "flex",
    flexDirection: "column",
    gap: spacingVars.space1,
    paddingBlock: spacingVars.space6,
    paddingInline: spacingVars.space6,
  },
  title: {
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
  content: {
    paddingBlockEnd: spacingVars.space6,
    paddingInline: spacingVars.space6,
  },
  footer: {
    alignItems: "center",
    display: "flex",
    flexWrap: "wrap",
    gap: spacingVars.space3,
    justifyContent: "flex-end",
    paddingBlockEnd: spacingVars.space6,
    paddingInline: spacingVars.space6,
  },
});

type StyleProps = {
  xstyle?: stylex.StyleXStyles;
};

type ElementProps = Omit<ComponentProps<"div">, "className" | "style"> & StyleProps;
type HeadingProps = Omit<ComponentProps<"h3">, "className" | "style"> & StyleProps;
type ParagraphProps = Omit<ComponentProps<"p">, "className" | "style"> & StyleProps;

export function Card({ xstyle, ...props }: ElementProps) {
  return <div {...props} {...stylex.props(styles.card, xstyle)} />;
}

export function CardHeader({ xstyle, ...props }: ElementProps) {
  return <div {...props} {...stylex.props(styles.header, xstyle)} />;
}

export function CardTitle({ children, xstyle, ...props }: HeadingProps) {
  return (
    <h3 {...props} {...stylex.props(styles.title, xstyle)}>
      {children}
    </h3>
  );
}

export function CardDescription({ xstyle, ...props }: ParagraphProps) {
  return <p {...props} {...stylex.props(styles.description, xstyle)} />;
}

export function CardContent({ xstyle, ...props }: ElementProps) {
  return <div {...props} {...stylex.props(styles.content, xstyle)} />;
}

export function CardFooter({ xstyle, ...props }: ElementProps) {
  return <div {...props} {...stylex.props(styles.footer, xstyle)} />;
}
