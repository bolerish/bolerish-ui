import { spacingVars, typographyVars } from "@bolerish/tokens/semantic.stylex";
import * as stylex from "@stylexjs/stylex";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
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
      <Popover>
        <PopoverTrigger render={<Button variant="secondary">Align left</Button>} />
        <PopoverContent>
          <PopoverHeader>
            <PopoverTitle>Align left</PopoverTitle>
            <PopoverDescription>Align the popover start with the trigger.</PopoverDescription>
          </PopoverHeader>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger render={<Button variant="secondary">Align center</Button>} />
        <PopoverContent align="center">
          <PopoverHeader>
            <PopoverTitle>Align center</PopoverTitle>
            <PopoverDescription>Align the popover center with the trigger.</PopoverDescription>
          </PopoverHeader>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger render={<Button variant="secondary">Align right</Button>} />
        <PopoverContent align="end">
          <PopoverHeader>
            <PopoverTitle>Align right</PopoverTitle>
            <PopoverDescription>Align the popover end with the trigger.</PopoverDescription>
          </PopoverHeader>
        </PopoverContent>
      </Popover>
    </div>
  );
}
