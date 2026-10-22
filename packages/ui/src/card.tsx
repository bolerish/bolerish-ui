import {
  colorVars,
  radiusVars,
  sizeVars,
  spacingVars,
  typographyVars,
} from "@bolerish/tokens/semantic.stylex";
import * as stylex from "@stylexjs/stylex";
import type { ComponentProps } from "react";

const styles = stylex.create({
  card: {
    backgroundColor: colorVars.bgSurface,
    borderColor: colorVars.strokeDefault,
    borderRadius: radiusVars.sm,
    borderStyle: "solid",
    borderWidth: sizeVars.stroke,
    color: colorVars.fgPrimary,
    display: "flex",
    flexDirection: "column",
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
    fontSize: typographyVars.fontSizeLg,
    fontWeight: typographyVars.fontWeightSemibold,
    lineHeight: typographyVars.lineHeightTight,
    margin: 0,
  },
  description: {
    color: colorVars.fgSecondary,
    fontSize: typographyVars.fontSizeSm,
    lineHeight: typographyVars.lineHeightNormal,
    margin: 0,
  },
  content: {
    paddingBlockEnd: spacingVars.space6,
    paddingInline: spacingVars.space6,
  },
  footer: {
    alignItems: "center",
    display: "flex",
    gap: spacingVars.space3,
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
