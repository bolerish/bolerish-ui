import { spacingVars, typo } from "@bolerish/tokens/semantic.stylex";
import { Link } from "@bolerish/ui/link";
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
export default function Variants() {
  return (
    <div {...stylex.props(layout.preview)}>
      <Link href="#">Default link</Link>
      <span>
        Inherit the current color{" "}
        <Link href="#" variant="current">
          link
        </Link>
      </span>
      <Link href="#" variant="plain">
        Link without underline
      </Link>
    </div>
  );
}
