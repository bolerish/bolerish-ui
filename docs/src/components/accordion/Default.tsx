import { colorVars, spacingVars, typo } from "@bolerish/tokens/semantic.stylex";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@bolerish/ui/accordion";
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
  componentWidth: {
    maxWidth: "28rem",
    width: "100%",
  },
});
const styles = stylex.create({
  disabledLabel: {
    alignItems: "flex-start",
    display: "flex",
    flexDirection: "column",
    gap: spacingVars.space1,
  },
  disabledReason: {
    color: colorVars.fgDisabled,
    fontSize: typo.fontSizeXs,
    fontWeight: typo.fontWeightRegular,
  },
});
export default function Default() {
  return (
    <div {...stylex.props(layout.preview, layout.componentWidth)}>
      <Accordion defaultValue={["shipping"]}>
        <AccordionItem value="shipping">
          <AccordionTrigger>How long does delivery take?</AccordionTrigger>
          <AccordionContent>Standard delivery takes 2–3 business days.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="return">
          <AccordionTrigger>How do I request a return?</AccordionTrigger>
          <AccordionContent>
            Select an item and reason from your order history to request a return.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem disabled value="member">
          <AccordionTrigger>
            <span {...stylex.props(styles.disabledLabel)}>
              Members-only benefits
              <span {...stylex.props(styles.disabledReason)}>Available after joining.</span>
            </span>
          </AccordionTrigger>
          <AccordionContent>Available after joining.</AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
