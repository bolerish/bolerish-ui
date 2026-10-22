import { spacingVars, typographyVars } from "@bolerish/tokens/semantic.stylex";
import { DotsThreeIcon, FolderIcon } from "@phosphor-icons/react";
import * as stylex from "@stylexjs/stylex";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  ContentRow,
  ContentRowActions,
  ContentRowContent,
  ContentRowDescription,
  ContentRowGroup,
  ContentRowMedia,
  ContentRowTitle,
} from "@/components/ui/content-row";
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
  componentWidth: {
    maxWidth: "28rem",
    width: "100%",
  },
});
export default function Default() {
  return (
    <div {...stylex.props(layout.preview, layout.componentWidth)}>
      <ContentRowGroup>
        <ContentRow variant="outline">
          <ContentRowMedia>
            <FolderIcon aria-hidden="true" />
          </ContentRowMedia>
          <ContentRowContent>
            <ContentRowTitle>Design system</ContentRowTitle>
            <ContentRowDescription>Last edited today at 2:18 PM</ContentRowDescription>
          </ContentRowContent>
          <ContentRowActions>
            <Button aria-label="More actions" size="icon-xs" variant="ghost">
              <DotsThreeIcon aria-hidden="true" size="1rem" />
            </Button>
          </ContentRowActions>
        </ContentRow>
        <ContentRow variant="muted">
          <ContentRowMedia variant="avatar">
            <Avatar>
              <AvatarFallback>MY</AvatarFallback>
            </Avatar>
          </ContentRowMedia>
          <ContentRowContent>
            <ContentRowTitle>Minyeong Jeong</ContentRowTitle>
            <ContentRowDescription>Can edit</ContentRowDescription>
          </ContentRowContent>
        </ContentRow>
      </ContentRowGroup>
    </div>
  );
}
