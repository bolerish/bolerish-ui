import { spacingVars, typographyVars } from "@bolerish/tokens/semantic.stylex";
import * as stylex from "@stylexjs/stylex";

import { Field, FieldLabel } from "@/components/ui/field";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
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
export default function Default() {
  return (
    <div {...stylex.props(layout.preview)}>
      <Field>
        <FieldLabel>Language</FieldLabel>
        <NativeSelect defaultValue="ko">
          <NativeSelectOption value="ko">Korean</NativeSelectOption>
          <NativeSelectOption value="en">English</NativeSelectOption>
          <NativeSelectOption value="ja">日本語</NativeSelectOption>
        </NativeSelect>
      </Field>
    </div>
  );
}
