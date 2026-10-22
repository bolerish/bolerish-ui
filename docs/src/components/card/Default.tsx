import { spacingVars, typographyVars } from "@bolerish/tokens/semantic.stylex";
import * as stylex from "@stylexjs/stylex";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  grid: {
    alignItems: "start",
    display: "grid",
    gap: spacingVars.space4,
    gridTemplateColumns: "repeat(auto-fit, minmax(18rem, 1fr))",
    width: "100%",
  },
});
export default function Default() {
  return (
    <div {...stylex.props(layout.preview)}>
      <div {...stylex.props(layout.grid)}>
        <Card>
          <CardHeader>
            <CardTitle>Archive this project?</CardTitle>
            <CardDescription>Archived projects are hidden from the list.</CardDescription>
          </CardHeader>
          <CardContent>You can restore it anytime in Settings.</CardContent>
          <CardFooter>
            <Button variant="secondary">Cancel</Button>
            <Button>Archive</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
