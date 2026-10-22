import { typo, spacingVars } from "@bolerish/tokens/semantic.stylex";
import { Button } from "@bolerish/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@bolerish/ui/empty";
import { FolderIcon } from "@phosphor-icons/react";
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
const styles = stylex.create({
  full: {
    width: "100%",
  },
  content: {
    gap: spacingVars.space4,
  },
});
export default function Default() {
  return (
    <div {...stylex.props(layout.preview)}>
      <Empty xstyle={styles.full}>
        <EmptyHeader>
          <EmptyMedia>
            <FolderIcon aria-hidden="true" />
          </EmptyMedia>
          <EmptyTitle>No saved projects</EmptyTitle>
          <EmptyDescription>
            Save projects you visit often to open them here quickly.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent xstyle={styles.content}>
          <Button>Save project</Button>
        </EmptyContent>
      </Empty>
    </div>
  );
}
