## Usage guidelines

Use it when exploring individual items matters more than comparing everything at once. Use a grid for simultaneous comparison.

> Do not put the only copy of essential instructions on a later slide.

## Current slide and neighboring preview

`<Carousel slideRatio={[70, 20]}>` divides the viewport width remaining after one gap
between the current slide and the visible neighboring portion in a 70:20 ratio.
These are relative parts, not literal percentages; their sum need not be 100.
At a 360px viewport and 8px gap, the current slide is about 274px and the preview
about 78px. All slides have the same width.

Omitting slideRatio preserves 100% slides and zero gap. Ratio mode defaults to
start alignment and spacingRoleVars.inlineGap. Customize the gap with
`--nuee-carousel-gap` on Carousel's xstyle so width calculations stay consistent.
Ratios require two positive finite numbers and currently support horizontal
carousels only. Embla options and plugins remain available; overriding align can
split the preview across both sides.

For small viewports, omit slideRatio or override Item flexBasis to 100% with a CSS
media condition. Previous/Next remain keyboard-accessible with Tab and Enter/Space.
The root does not capture arrow keys from inputs or links inside slides.
