import { typo, spacingVars } from "@bolerish/tokens/semantic.stylex";
import * as stylex from "@stylexjs/stylex";

import { ScrollArea, ScrollAreaViewport, ScrollAreaContent } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
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
const styles = stylex.create({
  viewport: {
    height: "14rem",
    width: "20rem",
  },
  item: {
    paddingBlock: spacingVars.space3,
  },
});
const activities = [
  "Completed the deployment checklist.",
  "Sent a design review request.",
  "Updated the sign-in screen.",
  "Invited a new member to the project.",
  "Added a user interview to the calendar.",
  "Shared the development environment setup.",
  "Reviewed the error report.",
  "Updated the prototype link.",
  "Reviewed this week’s goals.",
  "Recorded decisions in the meeting notes.",
  "Updated the brand guidelines.",
  "Confirmed the next release date.",
];
export default function Default() {
  return (
    <div {...stylex.props(layout.preview)}>
      <ScrollArea xstyle={styles.viewport}>
        <ScrollAreaViewport>
          <ScrollAreaContent>
            {activities.map((activity, index) => (
              <div key={index}>
                <div {...stylex.props(styles.item)}>{activity}</div>
                {index < 11 ? <Separator /> : null}
              </div>
            ))}
          </ScrollAreaContent>
        </ScrollAreaViewport>
      </ScrollArea>
    </div>
  );
}
