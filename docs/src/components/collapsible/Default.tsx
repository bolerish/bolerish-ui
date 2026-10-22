import {
  colorVars,
  radiusVars,
  sizeVars,
  spacingVars,
  typo,
} from "@bolerish/tokens/semantic.stylex";
import * as stylex from "@stylexjs/stylex";

import {
  Collapsible,
  CollapsiblePanel,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
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
  header: {
    alignItems: "center",
    display: "flex",
    gap: spacingVars.space4,
    justifyContent: "space-between",
    paddingInline: spacingVars.space4,
  },
  title: {
    color: colorVars.fgPrimary,
    fontSize: typo.fontSizeSm,
    fontWeight: typo.fontWeightSemibold,
    margin: 0,
  },
  detail: {
    borderColor: colorVars.strokeDefault,
    borderRadius: radiusVars.md,
    borderStyle: "solid",
    borderWidth: sizeVars.stroke,
    display: "flex",
    fontSize: typo.fontSizeSm,
    justifyContent: "space-between",
    paddingBlock: spacingVars.space2,
    paddingInline: spacingVars.space4,
  },
  detailGroup: {
    display: "flex",
    flexDirection: "column",
    gap: spacingVars.space1,
  },
  detailLabel: {
    color: colorVars.fgSecondary,
  },
  detailValue: {
    color: colorVars.fgPrimary,
    fontWeight: typo.fontWeightMedium,
  },
});
export default function Default() {
  return (
    <div {...stylex.props(layout.preview, layout.componentWidth)}>
      <Collapsible>
        <div {...stylex.props(styles.header)}>
          <h3 {...stylex.props(styles.title)}>Order #4189</h3>
          <CollapsibleTrigger aria-label="Show order details" />
        </div>
        <div {...stylex.props(styles.detail)}>
          <span {...stylex.props(styles.detailLabel)}>Status</span>
          <span {...stylex.props(styles.detailValue)}>Delivered</span>
        </div>
        <CollapsiblePanel>
          <CollapsibleContent>
            <div {...stylex.props(styles.detailGroup, styles.detail)}>
              <span {...stylex.props(styles.detailValue)}>Shipping address</span>
              <span {...stylex.props(styles.detailLabel)}>18 Seongsui-ro, Seongdong-gu, Seoul</span>
            </div>
            <div {...stylex.props(styles.detailGroup, styles.detail)}>
              <span {...stylex.props(styles.detailValue)}>Items</span>
              <span {...stylex.props(styles.detailLabel)}>2 studio headphones</span>
            </div>
          </CollapsibleContent>
        </CollapsiblePanel>
      </Collapsible>
    </div>
  );
}
