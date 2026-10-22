import { spacingVars, typographyVars } from "@bolerish/tokens/semantic.stylex";
import * as stylex from "@stylexjs/stylex";

import { PaginationLink } from "@/components/ui/pagination";
const layout = stylex.create({
  preview: {
    alignItems: "center",
    display: "flex",
    flexWrap: "wrap",
    fontSize: typographyVars.fontSizeSm,
    gap: spacingVars.space3,
    lineHeight: typographyVars.lineHeightNormal,
    justifyContent: "center",
    width: "100%",
  },
});
export default function Sizes() {
  return (
    <div {...stylex.props(layout.preview)}>
      <PaginationLink href="#" size="icon" aria-label="Previous page">
        1
      </PaginationLink>
      <PaginationLink href="#" size="default">
        Page 1
      </PaginationLink>
    </div>
  );
}
