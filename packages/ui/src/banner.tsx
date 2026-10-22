import { colorVars, radiusVars, spacingVars, typo } from "@bolerish/tokens/semantic.stylex";
import * as stylex from "@stylexjs/stylex";
import type { ComponentProps } from "react";

const styles = stylex.create({
  root: {
    backgroundColor: colorVars.bgSubtle,
    borderRadius: radiusVars.sm,
    color: colorVars.fgPrimary,
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },

  content: { display: "grid", gap: spacingVars.space1, minWidth: 0 },
  action: { alignItems: "center", display: "flex", gap: spacingVars.space2 },
  title: {
    fontSize: typo.fontSizeSm,
    fontWeight: typo.fontWeightSemibold,
    lineHeight: typo.lineHeightTight,
  },
  description: {
    color: "currentColor",
    fontSize: typo.fontSizeSm,
    lineHeight: typo.lineHeightNormal,
    opacity: 0.82,
  },
});

const sizeStyles = stylex.create({
  sm: {
    borderRadius: radiusVars.sm,
    gap: spacingVars.space1,
    paddingBlock: spacingVars.space2,
    paddingInline: spacingVars.space3,
  },
  md: {
    gap: spacingVars.space2,
    paddingBlock: spacingVars.space3,
    paddingInline: spacingVars.space4,
  },
});

export type BannerSize = "md" | "sm";
export type BannerAnnounce = "assertive" | "polite";

type StyleProps = { xstyle?: stylex.StyleXStyles };

export type BannerProps = Omit<ComponentProps<"div">, "title" | "className" | "style"> &
  StyleProps & {
    /** Announces a Banner that is added or updated after the initial page render. */
    announce?: BannerAnnounce;
    size?: BannerSize;
  };

export function Banner({ announce, children, role, size = "md", xstyle, ...props }: BannerProps) {
  let liveRole: "alert" | "status" | undefined;
  if (announce === "assertive") {
    liveRole = "alert";
  } else if (announce === "polite") {
    liveRole = "status";
  }

  return (
    <div
      {...props}
      role={role ?? liveRole}
      {...stylex.props(styles.root, sizeStyles[size], xstyle)}
    >
      {children}
    </div>
  );
}

export function BannerTitle({
  xstyle,
  ...props
}: Omit<ComponentProps<"div">, "className" | "style"> & StyleProps) {
  return <div {...props} {...stylex.props(styles.title, xstyle)} />;
}

export function BannerDescription({
  xstyle,
  ...props
}: Omit<ComponentProps<"div">, "className" | "style"> & StyleProps) {
  return <div {...props} {...stylex.props(styles.description, xstyle)} />;
}

export function BannerContent({
  xstyle,
  ...props
}: Omit<ComponentProps<"div">, "className" | "style"> & StyleProps) {
  return <div {...props} {...stylex.props(styles.content, xstyle)} />;
}

export function BannerActions({
  xstyle,
  ...props
}: Omit<ComponentProps<"div">, "className" | "style"> & StyleProps) {
  return <div {...props} {...stylex.props(styles.action, xstyle)} />;
}
