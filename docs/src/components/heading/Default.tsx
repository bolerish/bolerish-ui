import { spacingVars } from "@bolerish/tokens/semantic.stylex";
import * as stylex from "@stylexjs/stylex";

import { Heading } from "@/components/ui/heading";

const styles = stylex.create({
  group: { display: "flex", flexDirection: "column", gap: spacingVars.space4 },
});

export default function Default() {
  return (
    <div {...stylex.props(styles.group)}>
      <Heading level={2} size="page">
        Project settings
      </Heading>
      <Heading level={3} size="section">
        Notifications
      </Heading>
      <Heading level={4} size="subsection">
        Email updates
      </Heading>
    </div>
  );
}
