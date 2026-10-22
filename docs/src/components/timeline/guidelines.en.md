## Usage guidelines

### Props

| Prop                        | Default   | Values                                   | Meaning                                                                            |
| --------------------------- | --------- | ---------------------------------------- | ---------------------------------------------------------------------------------- |
| `TimelineIndicator.variant` | `default` | `default`, `active`, `complete`, `error` | Distinguishes pending, current, completed, and failed steps. Include a text label. |

Use it for history with meaningful ordering and time context. Use a plain list when sequence adds no meaning.

> State clearly whether the newest event appears first or last, and keep that order consistent.

Default connectors and indicators use neutral colors and flat boundaries. Complete
uses a neutral surface with a check or explicit title; error retains meaningful
feedback colors and clear text. Do not encode status through color alone. Explicit
consumer state colors remain available through TimelineIndicator xstyle. Decorative
indicators stay hidden; titles and times describe the event sequence.

The active step uses the primary Zinc surface and its contrasting foreground.
Completed steps retain a subtle neutral surface and a check to distinguish them from the current step.
