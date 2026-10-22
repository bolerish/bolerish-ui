import { spacingVars, typo } from "@bolerish/tokens/semantic.stylex";
import { Button } from "@bolerish/ui/button";
import { PlusIcon } from "@phosphor-icons/react";
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
export default function IconButtons() {
  return (
    <div {...stylex.props(layout.preview)}>
      <Button aria-label="Add item" size="icon-xs">
        <PlusIcon aria-hidden="true" />
      </Button>
      <Button aria-label="Add item" size="icon-sm">
        <PlusIcon aria-hidden="true" />
      </Button>
      <Button aria-label="Add item" size="icon-md">
        <PlusIcon aria-hidden="true" />
      </Button>
      <Button aria-label="Add item" size="icon-lg">
        <PlusIcon aria-hidden="true" />
      </Button>
      <Button aria-label="Add item" size="icon-xl">
        <PlusIcon aria-hidden="true" />
      </Button>
    </div>
  );
}
