import { spacingVars, typographyVars } from "@bolerish/tokens/semantic.stylex";
import { PaperclipIcon } from "@phosphor-icons/react";
import * as stylex from "@stylexjs/stylex";

import {
  Attachment,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
} from "@/components/ui/attachment";
import { AttachmentGroup } from "@/components/ui/attachment";
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
const styles = stylex.create({
  image: {
    height: "100%",
    objectFit: "cover",
    width: "100%",
  },
});
export default function Default() {
  return (
    <div {...stylex.props(layout.preview)}>
      <AttachmentGroup>
        <Attachment size="sm">
          <AttachmentMedia>
            <PaperclipIcon />
          </AttachmentMedia>
          <AttachmentContent>
            <AttachmentTitle>meeting-notes.txt</AttachmentTitle>
            <AttachmentDescription>18 KB</AttachmentDescription>
          </AttachmentContent>
        </Attachment>
        <Attachment size="sm">
          <AttachmentMedia>
            <PaperclipIcon />
          </AttachmentMedia>
          <AttachmentContent>
            <AttachmentTitle>wireframes.fig</AttachmentTitle>
            <AttachmentDescription>8.1 MB</AttachmentDescription>
          </AttachmentContent>
        </Attachment>
        <Attachment size="sm">
          <AttachmentMedia variant="image">
            <img
              alt="Blue and purple abstract artwork"
              src="https://images.unsplash.com/photo-1557682250-33bd709cbe85?auto=format&fit=crop&w=192&q=80"
              {...stylex.props(styles.image)}
            />
          </AttachmentMedia>
          <AttachmentContent>
            <AttachmentTitle>cover-art.png</AttachmentTitle>
            <AttachmentDescription>1.2 MB</AttachmentDescription>
          </AttachmentContent>
        </Attachment>
      </AttachmentGroup>
    </div>
  );
}
