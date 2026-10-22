import { spacingVars, typo } from "@bolerish/tokens/semantic.stylex";
import * as stylex from "@stylexjs/stylex";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bubble } from "@/components/ui/bubble";
import { Message, MessageAvatar, MessageContent, MessageFooter } from "@/components/ui/message";
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
  column: {
    alignItems: "stretch",
    flexDirection: "column",
  },
  componentWidth: {
    maxWidth: "28rem",
    width: "100%",
  },
});
export default function Default() {
  return (
    <div {...stylex.props(layout.preview, [layout.column, layout.componentWidth])}>
      <Message>
        <MessageAvatar>
          <Avatar size="lg">
            <AvatarFallback>MY</AvatarFallback>
          </Avatar>
        </MessageAvatar>
        <MessageContent>
          <Bubble>How can I help you today?</Bubble>
          <MessageFooter>2:18 PM</MessageFooter>
        </MessageContent>
      </Message>
      <Message align="end">
        <MessageContent>
          <Bubble align="end" variant="primary">
            Got it. I’ll apply them right away.
          </Bubble>
          <MessageFooter>2:20 PM · Read</MessageFooter>
        </MessageContent>
      </Message>
    </div>
  );
}
