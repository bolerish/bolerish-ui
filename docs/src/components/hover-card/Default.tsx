import { Avatar, AvatarFallback } from "@bolerish/ui/avatar";
import {
  ContentRow,
  ContentRowContent,
  ContentRowDescription,
  ContentRowMedia,
  ContentRowTitle,
} from "@bolerish/ui/content-row";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@bolerish/ui/hover-card";
export default function Default() {
  return (
    <HoverCard>
      <HoverCardTrigger href="#">@bolerish</HoverCardTrigger>
      <HoverCardContent align="start">
        <ContentRow size="sm">
          <ContentRowMedia variant="avatar">
            <Avatar>
              <AvatarFallback>CA</AvatarFallback>
            </Avatar>
          </ContentRowMedia>
          <ContentRowContent>
            <ContentRowTitle>@bolerish/ui</ContentRowTitle>
            <ContentRowDescription>
              A calm, consistent design system for product experiences
            </ContentRowDescription>
          </ContentRowContent>
        </ContentRow>
      </HoverCardContent>
    </HoverCard>
  );
}
