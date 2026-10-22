import { spacingVars, typo } from "@bolerish/tokens/semantic.stylex";
import * as stylex from "@stylexjs/stylex";

import { Button } from "@/components/ui/button";
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
});
export default function States() {
  return (
    <div {...stylex.props(layout.preview)}>
      <Button>Save</Button>
      <Button disabled>Save unavailable</Button>
      <Button disabled variant="secondary">
        Preview unavailable
      </Button>
      <Button disabled variant="outline">
        Outline unavailable
      </Button>
      <Button disabled variant="ghost">
        Close unavailable
      </Button>
      <Button disabled>
        <Spinner aria-hidden="true" label="" />
        Saving
      </Button>
    </div>
  );
}
