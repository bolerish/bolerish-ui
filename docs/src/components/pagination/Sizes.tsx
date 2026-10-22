import { spacingVars, typo } from "@bolerish/tokens/semantic.stylex";
import { PaginationLink } from "@bolerish/ui/pagination";
import * as stylex from "@stylexjs/stylex";
const layout = stylex.create({
  preview: {
    alignItems: "center",
    display: "flex",
    flexWrap: "wrap",
    fontSize: typo.fontSizeSm,
    gap: spacingVars.space3,
    lineHeight: typo.lineHeightNormal,
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
