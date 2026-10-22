import { spacingVars, typo } from "@bolerish/tokens/semantic.stylex";
import { Button } from "@bolerish/ui/button";
import { ButtonGroup } from "@bolerish/ui/button-group";
import { CaretLeftIcon, DotsThreeIcon } from "@phosphor-icons/react";
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
export default function Default() {
  return (
    <div {...stylex.props(layout.preview)}>
      <ButtonGroup aria-label="Navigate back">
        <Button size="icon-sm" variant="secondary" aria-label="Go back">
          <CaretLeftIcon aria-hidden="true" />
        </Button>
      </ButtonGroup>
      <ButtonGroup aria-label="Message actions">
        <Button size="sm" variant="secondary">
          Archive
        </Button>
        <Button size="sm" variant="secondary">
          Report
        </Button>
      </ButtonGroup>
      <ButtonGroup aria-label="More actions">
        <Button size="sm" variant="secondary">
          Snooze
        </Button>
        <Button size="icon-sm" variant="secondary" aria-label="More actions">
          <DotsThreeIcon aria-hidden="true" />
        </Button>
      </ButtonGroup>
    </div>
  );
}
