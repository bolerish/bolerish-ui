# Motion

Connecting the start and end of a change helps people keep their place. Choose timing and easing according to whether the change is a small input response or a larger surface transition.

## Selection guidelines

| Situation                                  | Recommended choice                                             | Code                                            |
| ------------------------------------------ | -------------------------------------------------------------- | ----------------------------------------------- |
| Hover and press feedback                   | `motionVars.durationFast`                                      | `transitionDuration: motionVars.durationFast`   |
| General state and surface transitions      | `motionVars.durationNormal`                                    | `transitionDuration: motionVars.durationNormal` |
| Larger areas such as `Dialog` and `Drawer` | `motionVars.durationSlow`                                      | `transitionDuration: motionVars.durationSlow`   |
| Repeating loading feedback                 | `durationLoading`; `durationLoadingReduced` for reduced motion | `animationDuration: motionVars.durationLoading` |

Consider `easingStandard` for state changes and `easingEnter` and `easingExit` for entry and exit. Preserve the component's existing motion settings and media queries first.

### Reduced motion

Respect `prefers-reduced-motion`. Retain progress text and state when reducing rotation or movement. Disabling reduced-motion support during installation must be a deliberate product decision.

> Do not add looping animation just for emphasis. If scaling blurs text and borders, consider translation, dimensions, or opacity instead. Do not make people wait for decoration after loading completes.

## Examples

### When a panel opens and closes

Consider `easingEnter` for arrival and `easingExit` for departure. Use `durationFast` for a brief button color change. The open panel and any pending state must remain clear when motion is reduced.

## Installation defaults and user preferences

`theme.motion` uses `system` to follow the OS and `off` to suppress motion. Load
the generated `preferences.css`; even enabled motion respects OS reduction.
Use root `data-nuee-motion` for the end user's choice. Keep loading copy and open
states visible, and apply the same decision to JavaScript scrolling and View
Transitions. Legacy `respectReducedMotion: false` does not mean motion off.
