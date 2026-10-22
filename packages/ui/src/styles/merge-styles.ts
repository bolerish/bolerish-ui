import type * as stylex from "@stylexjs/stylex";
import type { CSSProperties } from "react";

export type StyledProps<Props> = Props extends unknown
  ? Omit<Props, "className" | "style"> & { className?: string; style?: CSSProperties }
  : never;

export function mergeStyles(
  base: ReturnType<typeof stylex.props>,
  className?: string,
  style?: CSSProperties,
): { className?: string; style?: CSSProperties } {
  if (className === undefined && style === undefined) return base;
  return {
    ...base,
    className: [base.className, className].filter(Boolean).join(" ") || undefined,
    style: base.style || style ? { ...base.style, ...style } : undefined,
  };
}
