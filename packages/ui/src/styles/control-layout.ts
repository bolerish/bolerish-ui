import type { StyleXStyles } from "@stylexjs/stylex";
import type { CSSProperties } from "react";

/** Placement belongs to the screen; appearance and state belong to the control. */
type Placement = Pick<
  CSSProperties,
  | "alignSelf"
  | "justifySelf"
  | "flexGrow"
  | "flexShrink"
  | "flexBasis"
  | "order"
  | "gridArea"
  | "gridColumn"
  | "gridRow"
  | "margin"
  | "marginBlock"
  | "marginBlockStart"
  | "marginBlockEnd"
  | "marginInline"
  | "marginInlineStart"
  | "marginInlineEnd"
  | "position"
  | "top"
  | "bottom"
  | "left"
  | "right"
  | "insetInlineStart"
  | "insetInlineEnd"
  | "zIndex"
>;

export type ControlPlacementStyles = StyleXStyles<Placement>;
export type ControlLayoutStyles = StyleXStyles<
  Placement & Pick<CSSProperties, "width" | "minWidth" | "maxWidth">
>;

/** A multiline field may opt into its vertical space; its visual treatment stays owned. */
export type ControlFieldStyles = StyleXStyles<
  Placement &
    Pick<CSSProperties, "width" | "minWidth" | "maxWidth" | "height" | "minHeight" | "maxHeight">
>;
