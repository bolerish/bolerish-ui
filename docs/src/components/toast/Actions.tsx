import { spacingVars, typographyVars } from "@bolerish/tokens/semantic.stylex";
import * as stylex from "@stylexjs/stylex";

import { Button } from "@/components/ui/button";
import { toast, Toaster } from "@/components/ui/toast";
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
export default function Actions() {
  const args = {
    position: "bottom-right" as const,
  };
  return (
    <>
      <Toaster
        {...args}
        clearAllProps={{
          children: "Dismiss all",
        }}
      />
      <div {...stylex.props(layout.preview)}>
        <Button
          variant="secondary"
          onClick={() => {
            const id = toast.add({
              title: "Moved to archive.",
              description: "You can restore this item with Undo.",
              timeout: 0,
              actionProps: {
                children: "Undo",
                onClick: () => toast.close(id),
              },
            });
          }}
        >
          Undo archive
        </Button>
        <Button
          variant="secondary"
          onClick={() =>
            toast.promise(new Promise((resolve) => window.setTimeout(resolve, 1200)), {
              loading: {
                title: "Saving changes.",
                type: "loading",
              },
              success: {
                title: "Changes saved.",
                type: "success",
              },
              error: {
                title: "Couldn’t save changes.",
                type: "error",
              },
            })
          }
        >
          Start saving
        </Button>
      </div>
    </>
  );
}
