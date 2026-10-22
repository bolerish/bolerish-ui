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
export default function Default() {
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
              title: "Schedule created.",
              description: "Sunday, December 3 at 9:00 AM",
            })
          }
        >
          Create schedule
        </Button>
      </div>
    </>
  );
}
