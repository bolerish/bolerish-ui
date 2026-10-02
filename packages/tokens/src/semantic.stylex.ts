import * as stylex from "@stylexjs/stylex";

import { colorPalette } from "./color-palette.stylex";

export const colorVars = stylex.defineVars({
  bgCanvas: colorPalette.neutral100,
  bgSurface: colorPalette.neutral0,
  bgSurfacePressed: "oklch(97% 0 0)",
  bgInverse: colorPalette.neutral950,
  /** Neutral grouping surface; does not indicate selection. */
  bgSubtle: colorPalette.neutral50,
  bgRaised: colorPalette.neutral0,
  bgRaisedPressed: "oklch(97% 0 0)",
  /** Flat persistent selection. Pair with fgPrimary and a check or boundary. */
  bgSelected: colorPalette.blueWeak,
  /** Area that will receive a dragged item; not an insertion marker. */
  bgDropTarget: colorPalette.blueWeak,
  bgCurrent: colorPalette.alphaBlack6,
  bgOverlay: colorPalette.alphaBlack40,
  bgSkeleton: colorPalette.neutral200,
  bgActionPrimary: colorPalette.primarySolid,
  bgActionDestructive: colorPalette.redFeedback,
  bgMessageOutgoing: colorPalette.primarySolid,
  bgFeedbackInfo: colorPalette.blueWeak,
  bgFeedbackSuccess: colorPalette.greenWeak,
  bgFeedbackWarning: colorPalette.yellowWeak,
  bgFeedbackError: colorPalette.redWeak,
  fgPrimary: colorPalette.neutral950,
  fgSecondary: colorPalette.neutral600,
  fgTertiary: colorPalette.neutral500,
  fgDisabled: colorPalette.neutral500,
  fgInverse: colorPalette.neutral0,
  fgOnActionPrimary: colorPalette.neutral0,
  fgOnActionDestructive: colorPalette.neutral0,
  fgOnMessageOutgoing: colorPalette.neutral0,
  fgAction: colorPalette.primarySolid,
  fgFeedbackInfo: colorPalette.blueSolid,
  fgFeedbackSuccess: colorPalette.greenFeedback,
  fgFeedbackWarning: colorPalette.yellowFeedback,
  fgFeedbackError: colorPalette.redFeedback,
  strokeDefault: colorPalette.neutral200,
  /** Emphasized grouping boundary, including menu separators. */
  strokeStrong: colorPalette.neutral300,
  /** Exact insertion position during drag; pair with a position label. */
  strokeDropIndicator: colorPalette.blueSolid,
  strokeFocus: colorPalette.blueBadge,
  strokeAction: colorPalette.primarySolid,
  strokeFeedbackInfo: colorPalette.blueMuted,
  strokeFeedbackSuccess: colorPalette.greenMuted,
  strokeFeedbackWarning: colorPalette.yellowMuted,
  strokeFeedbackError: colorPalette.redMuted,
  interactionDefault: "transparent",
  interactionHover: colorPalette.alphaBlack6,
  // Translucent state layers preserve the underlying surface; press is stronger than hover.
  interactionPressed: colorPalette.alphaBlack10,
  interactionSolidHover: colorPalette.alphaWhite10,
  interactionSolidPressed: colorPalette.alphaWhite20,
  /** Raised selection inside bgSubtle; pair with fgPrimary and shadowVars.subtle. */
  interactionSelected: colorPalette.neutral0,
  interactionDisabled: colorPalette.alphaBlack8,
  interactionFocus: colorPalette.blueBadge,
});

export const spacingVars = stylex.defineVars({
  space0: "0",
  space0_5: "calc(0.125 * var(--nuee-unit, 1rem) * var(--nuee-density, 1))",
  space1: "calc(0.25 * var(--nuee-unit, 1rem) * var(--nuee-density, 1))",
  space2: "calc(0.5 * var(--nuee-unit, 1rem) * var(--nuee-density, 1))",
  space3: "calc(0.75 * var(--nuee-unit, 1rem) * var(--nuee-density, 1))",
  space4: "calc(1 * var(--nuee-unit, 1rem) * var(--nuee-density, 1))",
  space5: "calc(1.25 * var(--nuee-unit, 1rem) * var(--nuee-density, 1))",
  space6: "calc(1.5 * var(--nuee-unit, 1rem) * var(--nuee-density, 1))",
  space8: "calc(2 * var(--nuee-unit, 1rem) * var(--nuee-density, 1))",
  space10: "calc(2.5 * var(--nuee-unit, 1rem) * var(--nuee-density, 1))",
  space12: "calc(3 * var(--nuee-unit, 1rem) * var(--nuee-density, 1))",
});

export const spacingRoleVars = stylex.defineVars({
  /** Page inline padding; safe-area insets belong to the app. */
  pageGutter: spacingVars.space4,
  /** Padding inside a card or panel. */
  panelPadding: spacingVars.space4,
  /** Independent sections. */
  sectionGap: spacingVars.space8,
  /** Related fields. */
  fieldGap: spacingVars.space4,
  /** A label and its control, or help text. */
  labelGap: spacingVars.space2,
  /** Related elements in one row. */
  inlineGap: spacingVars.space2,
  /** A title and its description. */
  textGap: spacingVars.space1,
});

export const layoutVars = stylex.defineVars({
  contentMaxWidth: "calc(65 * var(--nuee-unit, 1rem) * var(--nuee-density, 1))",
});

export const sizeVars = stylex.defineVars({
  controlXs: "1.5rem",
  controlSm: "calc(2 * var(--nuee-unit, 1rem) * var(--nuee-density, 1))",
  controlMd: "calc(2.25 * var(--nuee-unit, 1rem) * var(--nuee-density, 1))",
  controlLg: "calc(2.5 * var(--nuee-unit, 1rem) * var(--nuee-density, 1))",
  controlXl: "calc(3 * var(--nuee-unit, 1rem) * var(--nuee-density, 1))",
  iconXs: "calc(0.75 * var(--nuee-unit, 1rem) * var(--nuee-density, 1))",
  iconSm: "calc(0.875 * var(--nuee-unit, 1rem) * var(--nuee-density, 1))",
  iconMd: "calc(1 * var(--nuee-unit, 1rem) * var(--nuee-density, 1))",
  iconLg: "calc(1.25 * var(--nuee-unit, 1rem) * var(--nuee-density, 1))",
  contentXs: "calc(18 * var(--nuee-unit, 1rem) * var(--nuee-density, 1))",
  contentSm: "calc(24 * var(--nuee-unit, 1rem) * var(--nuee-density, 1))",
  contentMd: "calc(32 * var(--nuee-unit, 1rem) * var(--nuee-density, 1))",
  trackSm: "calc(0.375 * var(--nuee-unit, 1rem) * var(--nuee-density, 1))",
  trackMd: "calc(0.5 * var(--nuee-unit, 1rem) * var(--nuee-density, 1))",
  touchTarget: "2.75rem",
  stroke: "0.0625rem",
  focusRing: "0.125rem",
});

export const radiusVars = stylex.defineVars({
  sm: "0.375rem",
  md: "0.5rem",
  lg: "0.75rem",
  xl: "1rem",
  full: "9999px",
});

export const shadowVars = stylex.defineVars({
  subtle: "0 1px 4px oklch(0% 0 0 / 8%)",
  floating: "0 2px 10px oklch(0% 0 0 / 10%)",
  overlay: "0 4px 16px oklch(0% 0 0 / 12%)",
});

export const layerVars = stylex.defineVars({
  modalBackdrop: "50",
  modal: "51",
  popup: "60",
  notification: "70",
});

export const typo = stylex.defineVars({
  /** @deprecated Use fontFamilyBody or fontFamilyHeading instead. */
  fontFamily:
    'var(--nuee-font-body, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif)',
  fontFamilyBody:
    'var(--nuee-font-body, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif)',
  fontFamilyHeading:
    'var(--nuee-font-heading, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif)',
  fontSizeXs: "calc(0.75 * var(--nuee-unit, 1rem) * var(--nuee-density, 1))",
  fontSizeSm: "calc(0.875 * var(--nuee-unit, 1rem) * var(--nuee-density, 1))",
  fontSizeMd: "calc(1 * var(--nuee-unit, 1rem) * var(--nuee-density, 1))",
  fontSizeLg: "calc(1.125 * var(--nuee-unit, 1rem) * var(--nuee-density, 1))",
  fontSizeXl: "calc(1.5 * var(--nuee-unit, 1rem) * var(--nuee-density, 1))",
  lineHeightTight: "1.25",
  lineHeightNormal: "1.5",
  fontWeightRegular: "400",
  fontWeightMedium: "500",
  fontWeightSemibold: "600",
});

export const opacityVars = stylex.defineVars({
  disabled: "0.6",
});

export const motionVars = stylex.defineVars({
  durationInstant: "0.01ms",
  durationFast: "120ms",
  durationNormal: "180ms",
  durationSlow: "240ms",
  durationLoading: "700ms",
  durationLoadingReduced: "1.5s",
  easingStandard: "cubic-bezier(0.2, 0, 0, 1)",
  easingEnter: "cubic-bezier(0.16, 1, 0.3, 1)",
  easingExit: "cubic-bezier(0.4, 0, 1, 1)",
});

/** Compatibility export; new code uses typo. */
export { typo as typographyVars };
