import { spacingVars, typographyVars } from "@bolerish/tokens/semantic.stylex";
import * as stylex from "@stylexjs/stylex";

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
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
      <TooltipProvider delay={100}>
        {(
          [
            ["start", "Align left"],
            ["center", "Align center"],
            ["end", "Align right"],
          ] as const
        ).map(([align, label]) => (
          <Tooltip key={align}>
            <TooltipTrigger
              render={
                <Button size="sm" variant="secondary">
                  {label}
                </Button>
              }
            />
            <TooltipContent align={align}>Change project visibility.</TooltipContent>
          </Tooltip>
        ))}
      </TooltipProvider>
    </div>
  );
}
