import {
  colorVars,
  motionVars,
  radiusVars,
  sizeVars,
  spacingVars,
  typo,
} from "@bolerish/tokens/semantic.stylex";
import * as stylex from "@stylexjs/stylex";
import type { ComponentProps } from "react";

import type { ControlFieldStyles } from "./styles/control-layout";

const styles = stylex.create({
  root: {
    backgroundColor: colorVars.bgSurface,
    borderColor: colorVars.strokeControl,
    borderRadius: radiusVars.sm,
    borderStyle: "solid",
    borderWidth: sizeVars.stroke,
    color: colorVars.fgPrimary,
    fontFamily: typo.fontFamilyBody,
    fontSize: typo.fontSizeSm,
    lineHeight: typo.lineHeightNormal,
    minHeight: "5rem",
    outline: "none",
    padding: spacingVars.space3,
    resize: "vertical",
    transitionDuration: motionVars.durationFast,
    transitionProperty: "border-color, opacity",
    transitionTimingFunction: motionVars.easingStandard,
    width: "100%",
    "::placeholder": { color: colorVars.fgTertiary },
    ":hover:not(:disabled):not([aria-invalid='true']):not(:user-invalid):not(:focus-visible)": {
      borderColor: colorVars.strokeStrong,
    },
    ":focus-visible": {
      borderColor: colorVars.strokeFocus,
      outlineColor: colorVars.strokeFocus,
      outlineOffset: sizeVars.stroke,
      outlineStyle: "solid",
      outlineWidth: sizeVars.focusRing,
    },
    ":disabled": {
      backgroundColor: colorVars.bgSubtle,
      borderColor: colorVars.strokeDefault,
      color: colorVars.fgDisabled,
      cursor: "not-allowed",
      resize: "none",
      ":hover": { borderColor: colorVars.strokeDefault },
    },
    ":user-invalid": {
      borderColor: colorVars.strokeFeedbackError,
      ":focus-visible": {
        borderColor: colorVars.strokeFeedbackError,
        outlineColor: colorVars.strokeFeedbackError,
      },
    },
  },
  invalid: {
    borderColor: colorVars.strokeFeedbackError,
    ":focus-visible": {
      borderColor: colorVars.strokeFeedbackError,
      outlineColor: colorVars.strokeFeedbackError,
    },
  },
});

export type TextareaProps = Omit<ComponentProps<"textarea">, "className" | "style"> & {
  xstyle?: ControlFieldStyles;
};

export function Textarea({ "aria-invalid": ariaInvalid, xstyle, ...props }: TextareaProps) {
  const isInvalid = ariaInvalid === true || ariaInvalid === "true";
  return (
    <textarea
      {...props}
      aria-invalid={ariaInvalid}
      {...stylex.props(styles.root, isInvalid && styles.invalid, xstyle)}
    />
  );
}
