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
export default function MultipleNotifications() {
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
            for (const notification of [
              ["Design review started.", "Leave feedback by 3 PM today."],
              ["New comment.", "Minji reviewed the changes."],
              ["Task assigned.", "Landing-page improvements start tomorrow."],
            ]) {
              toast.add({
                title: notification[0],
                description: notification[1],
                timeout: 0,
              });
            }
          }}
        >
          Add three notifications
        </Button>
      </div>
    </>
  );
}
