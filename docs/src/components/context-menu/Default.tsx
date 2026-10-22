import {
  colorVars,
  radiusVars,
  sizeVars,
  spacingVars,
  typographyVars,
} from "@bolerish/tokens/semantic.stylex";
import * as stylex from "@stylexjs/stylex";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
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
  column: {
    alignItems: "stretch",
    flexDirection: "column",
  },
  contextTarget: {
    alignItems: "center",
    borderColor: colorVars.strokeDefault,
    borderRadius: radiusVars.md,
    borderStyle: "dashed",
    borderWidth: sizeVars.stroke,
    color: colorVars.fgSecondary,
    display: "flex",
    fontSize: typographyVars.fontSizeSm,
    height: "10rem",
    justifyContent: "center",
    maxWidth: "28rem",
    width: "100%",
  },
});
export default function Default() {
  return (
    <div {...stylex.props(layout.preview, layout.column)}>
      <ContextMenu>
        <ContextMenuTrigger {...stylex.props(layout.contextTarget)}>
          project-proposal.pdf
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem>
            Preview<ContextMenuShortcut>Space</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem>
            Rename<ContextMenuShortcut>⌘R</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem>
            Download<ContextMenuShortcut>⌘D</ContextMenuShortcut>
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </div>
  );
}
