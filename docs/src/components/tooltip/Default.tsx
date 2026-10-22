import { spacingVars, typo } from "@bolerish/tokens/semantic.stylex";
import { Button } from "@bolerish/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@bolerish/ui/tooltip";
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
