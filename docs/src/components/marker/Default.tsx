import { spacingVars, typo } from "@bolerish/tokens/semantic.stylex";
import * as stylex from "@stylexjs/stylex";

import { Marker, MarkerContent, MarkerIcon } from "@/components/ui/marker";
import { Spinner } from "@/components/ui/spinner";
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
      <Marker>
        <MarkerIcon>
          <Spinner label="Writing a reply" />
        </MarkerIcon>
        <MarkerContent>Writing a reply.</MarkerContent>
      </Marker>
    </div>
  );
}
