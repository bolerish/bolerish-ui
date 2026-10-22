import { spacingVars, typographyVars } from "@bolerish/tokens/semantic.stylex";
import * as stylex from "@stylexjs/stylex";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
export default function Default() {
  return (
    <div {...stylex.props(layout.preview)}>
      <Dialog>
        <DialogTrigger render={<Button>Archive project</Button>} />
        <DialogContent closeLabel="Close">
          <DialogHeader>
            <DialogTitle>Archive this project?</DialogTitle>
            <DialogDescription>
              Archived projects are hidden from the list and can be restored in Settings.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose render={<Button variant="secondary">Cancel</Button>} />
            <Button>Archive</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
