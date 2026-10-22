import { spacingVars, typo } from "@bolerish/tokens/semantic.stylex";
import * as stylex from "@stylexjs/stylex";

import { Link } from "@/components/ui/link";
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
  column: {
    alignItems: "stretch",
    flexDirection: "column",
  },
});
export default function Default() {
  return (
    <div {...stylex.props(layout.preview, layout.column)}>
      <p>
        Learn more in the{" "}
        <Link href="https://example.com" rel="noreferrer" target="_blank">
          external documentation <Link.ExternalIcon />
        </Link>
        .
      </p>
    </div>
  );
}
