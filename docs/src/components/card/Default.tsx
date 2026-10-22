import { sizeVars, spacingVars, typo } from "@bolerish/tokens/semantic.stylex";
import { Button } from "@bolerish/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@bolerish/ui/card";
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
  grid: {
    alignItems: "start",
    display: "grid",
    gap: spacingVars.space4,
    gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 18rem), 1fr))",
    maxWidth: sizeVars.contentMd,
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
