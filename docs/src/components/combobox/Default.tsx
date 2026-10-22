import { spacingVars, typographyVars } from "@bolerish/tokens/semantic.stylex";
import * as stylex from "@stylexjs/stylex";

import {
  Combobox,
  ComboboxCollection,
  ComboboxPopup,
  ComboboxList,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
} from "@/components/ui/combobox";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
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
const frameworks = ["React", "Vue", "Svelte", "Solid", "Angular"];
export default function Default() {
  return (
    <div {...stylex.props(layout.preview)}>
      <Field>
        <FieldLabel>Framework</FieldLabel>
        <Combobox items={frameworks}>
          <ComboboxInput placeholder="Search frameworks" />
          <ComboboxPopup>
            <ComboboxList>
              <ComboboxEmpty>No matching frameworks.</ComboboxEmpty>
              <ComboboxCollection>
                {(framework: string) => (
                  <ComboboxItem key={framework} value={framework}>
                    {framework}
                  </ComboboxItem>
                )}
              </ComboboxCollection>
            </ComboboxList>
          </ComboboxPopup>
        </Combobox>
        <FieldDescription>Select the framework used in your project.</FieldDescription>
      </Field>
    </div>
  );
}
