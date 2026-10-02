import { layoutVars, spacingRoleVars, typo } from "@nuee/tokens/semantic.stylex";
import * as stylex from "@stylexjs/stylex";

import { Button } from "@/components/ui/button";
import { Field, FieldLabel, FieldDescription, FieldGroup } from "@/components/ui/field";
import { Heading } from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";

const styles = stylex.create({
  page: {
    display: "flex",
    flexDirection: "column",
    gap: spacingRoleVars.sectionGap,
    maxWidth: layoutVars.contentMaxWidth,
    paddingInline: spacingRoleVars.pageGutter,
  },
  panel: {
    display: "flex",
    flexDirection: "column",
    gap: spacingRoleVars.fieldGap,
    padding: spacingRoleVars.panelPadding,
  },
  text: {
    fontFamily: typo.fontFamilyBody,
    fontSize: typo.fontSizeMd,
    lineHeight: typo.lineHeightNormal,
    margin: 0,
  },
  row: { display: "flex", alignItems: "center", gap: spacingRoleVars.inlineGap },
});

export default function SettingsExample() {
  return (
    <section {...stylex.props(styles.page)}>
      <Heading level={2} size="section">
        Preferences
      </Heading>
      <p {...stylex.props(styles.text)}>
        Use the unit, density, heading font and motion toolbar controls to compare shared tokens.
      </p>
      <div {...stylex.props(styles.panel)}>
        <FieldGroup>
          <Field>
            <FieldLabel>Display name</FieldLabel>
            <Input placeholder="Minyeong" />
            <FieldDescription>Related fields use fieldGap.</FieldDescription>
          </Field>
          <Field>
            <FieldLabel>Project</FieldLabel>
            <Input placeholder="Nuee" />
          </Field>
        </FieldGroup>
        <div {...stylex.props(styles.row)}>
          <Button>Save preferences</Button>
          <Spinner />
          <span {...stylex.props(styles.text)}>
            Saving status stays visible when motion is reduced.
          </span>
        </div>
      </div>
    </section>
  );
}
