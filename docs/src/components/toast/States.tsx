import { spacingVars, typo } from "@bolerish/tokens/semantic.stylex";
import * as stylex from "@stylexjs/stylex";

import { Button } from "@/components/ui/button";
import { toast, Toaster } from "@/components/ui/toast";
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
          onClick={() =>
            toast.add({
              title: "Saved.",
              type: "success",
            })
          }
        >
          Save changes
        </Button>
        <Button
          variant="secondary"
          onClick={() =>
            toast.add({
              title: "Update available.",
              type: "info",
            })
          }
        >
          View update
        </Button>
        <Button
          variant="secondary"
          onClick={() =>
            toast.add({
              title: "Storage is running low.",
              type: "warning",
            })
          }
        >
          Manage storage
        </Button>
        <Button
          variant="secondary"
          onClick={() =>
            toast.add({
              title: "Couldn’t save.",
              description: "Check your connection and try again.",
              priority: "high",
              type: "error",
            })
          }
        >
          Save again
        </Button>
      </div>
    </>
  );
}
