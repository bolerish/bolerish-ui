import { Button } from "@bolerish/ui/button";
import {
  ContentRow,
  ContentRowActions,
  ContentRowContent,
  ContentRowDescription,
  ContentRowGroup,
  ContentRowTitle,
} from "@bolerish/ui/content-row";
export default function ActionAlignment() {
  return (
    <ContentRowGroup>
      {(["sm", "md", "lg"] as const).map((size) => (
        <ContentRow key={size} variant="outline">
          <ContentRowContent>
            <ContentRowTitle>Project settings</ContentRowTitle>
            <ContentRowDescription>
              Review project access and notification preferences.
              <br />
              Changes apply to everyone in the workspace.
            </ContentRowDescription>
          </ContentRowContent>
          <ContentRowActions>
            <Button size={size} variant="secondary">
              Edit
            </Button>
          </ContentRowActions>
        </ContentRow>
      ))}
    </ContentRowGroup>
  );
}
