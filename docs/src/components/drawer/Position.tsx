import { spacingVars, typographyVars } from "@bolerish/tokens/semantic.stylex";
import * as stylex from "@stylexjs/stylex";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
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
function DrawerExample({ swipeDirection = "down" }: { swipeDirection?: DrawerDirection }) {
  return (
    <div {...stylex.props(layout.preview)}>
      <Drawer showSwipeHandle swipeDirection={swipeDirection}>
        <DrawerTrigger render={<Button>Open {swipeDirection} drawer</Button>} />
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Move to folder</DrawerTitle>
            <DrawerDescription>Choose where to keep this project.</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <DrawerClose render={<Button variant="secondary">Cancel</Button>} />
            <DrawerClose render={<Button>Move project</Button>} />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
type DrawerDirection = "down" | "up" | "left" | "right";
export default function Position() {
  return (
    <div {...stylex.props(layout.preview)}>
      <DrawerExample swipeDirection="up" />
      <DrawerExample swipeDirection="left" />
      <DrawerExample swipeDirection="right" />
    </div>
  );
}
