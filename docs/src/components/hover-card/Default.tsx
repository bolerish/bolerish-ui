import { spacingVars, typo } from "@bolerish/tokens/semantic.stylex";
import {
  ContentRow,
  ContentRowContent,
  ContentRowDescription,
  ContentRowTitle,
} from "@bolerish/ui/content-row";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@bolerish/ui/hover-card";
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
      <HoverCard>
        <HoverCardTrigger href="#">@bolerish</HoverCardTrigger>
        <HoverCardContent align="start">
          <ContentRow size="sm">
            <ContentRowContent>
              <ContentRowTitle>@bolerish/ui</ContentRowTitle>
              <ContentRowDescription>
                A calm, consistent design system for product experiences
              </ContentRowDescription>
            </ContentRowContent>
          </ContentRow>
        </HoverCardContent>
      </HoverCard>
    </div>
  );
}
