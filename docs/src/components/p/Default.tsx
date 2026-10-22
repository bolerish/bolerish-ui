import { spacingVars } from "@bolerish/tokens/semantic.stylex";
import { P } from "@bolerish/ui/p";
import * as stylex from "@stylexjs/stylex";

const styles = stylex.create({
  group: { display: "flex", flexDirection: "column", gap: spacingVars.space3 },
});

export default function Default() {
  return (
    <div {...stylex.props(styles.group)}>
      <P>Keep every project update in one place.</P>
      <P variant="description">
        Choose which notifications you receive. You can change these preferences at any time.
      </P>
      <P variant="caption">Last updated today</P>
    </div>
  );
}
