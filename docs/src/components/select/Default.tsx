import { spacingVars, typo } from "@bolerish/tokens/semantic.stylex";
import * as stylex from "@stylexjs/stylex";

import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import {
  Select,
  SelectPopup,
  SelectList,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
});
export default function Default() {
  return (
    <div {...stylex.props(layout.preview)}>
      <Field>
        <FieldLabel>Theme</FieldLabel>
        <Select
          defaultValue="system"
          items={{
            dark: "Dark",
            light: "Light",
            system: "System setting",
          }}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectPopup>
            <SelectList>
              <SelectGroup>
                <SelectLabel>Display mode</SelectLabel>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System setting</SelectItem>
              </SelectGroup>
              <SelectSeparator />
              <SelectItem disabled value="contrast">
                High contrast
              </SelectItem>
            </SelectList>
          </SelectPopup>
        </Select>
        <FieldDescription>The selected theme is saved on this device.</FieldDescription>
      </Field>
    </div>
  );
}
