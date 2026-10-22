# bolerish/ui

A design system built with React and StyleX.

## Installation

```sh
pnpm dlx @bolerish/ui init
pnpm dlx @bolerish/ui add button
```

For Vite, use `init --vite` to configure the StyleX plugin and reset stylesheet.

## Usage

Components are copied into your project.

```tsx
import { Button } from "@/components/ui/button";

export function SaveButton() {
  return <Button>Save</Button>;
}
```

## LLM guide

See [the @bolerish/ui usage guide for LLMs](docs/README.md#ai-coding-agent-references) for local imports,
StyleX conventions, theme setup, and component API checks.

### Generated appearance defaults

`.nuee.json` can configure initial appearance without editing each component:

`init` links `./node_modules/@bolerish/ui/configuration_schema.json` with `$schema`
for editor completions and validation. Install `@bolerish/ui` in the project to resolve
the schema, even when running the CLI with `bunx`. No separate schema file is generated. Rename an existing `nuee.json` to `.nuee.json`,
then run `nuee init --force` to update the schema reference while preserving
configuration. An old `.nuee.schema.json` can then be removed.

```json
{
  "theme": {
    "density": "compact",
    "unit": "rem",
    "motion": "system",
    "fonts": { "body": "system-ui", "heading": "Georgia, serif" }
  }
}
```

Keep the existing aliases and other configuration fields. After editing the
configuration, run `nuee init --force`. Import the generated `preferences.css`
from your CSS entry (Vite initialization adds the import), and apply
`stylex.props(...themeStyles)` from `settings.stylex.ts` to the app root. Put the
styles on `html` when overlays portal to `body`. Compact density keeps 24px icon
controls, touch targets and focus strokes independent of the scale.

Generated files group shared styles by responsibility:

```text
src/styles/
  tokens/                 # color-palette, semantic, themes, density
  control-layout.ts       # shared control placement types, copied when needed
  settings.stylex.ts
  preferences.css
  reset.css
```

`aliases.styles` points to `styles`, and token imports use its `tokens` child.
Existing flat token files remain usable. Run `nuee init --force` to copy them
into `tokens` without deleting the originals or overwriting customized tokens.

JSON is an installation default, not a live user-settings store. Runtime font
choices override `--nuee-font-body` and `--nuee-font-heading` on the root; removing
an override restores the generated default. Fonts are CSS family lists; @bolerish/ui
does not download font files. JSON accepts `system` or `off` as the app default.
Set `data-nuee-motion="system"`, `"on"` or `"off"` on `html` for the app end
user's runtime choice. `system` follows OS reduced motion; `off` suppresses
animation, transitions and smooth scrolling. Only an explicit end-user `on`
choice overrides OS reduction. The app owns the settings UI and persistence;
do not set `on` automatically from a developer default.
App-controlled View Transitions and JavaScript scrolling must use the same
resolved preference. Generated `MotionPreference` and `motionDefault` provide
the runtime type and initial default. Remove the attribute to restore JSON's
default; selecting `system` explicitly follows the OS even if JSON uses `off`.
Package consumers can import `MotionPreference` from `@bolerish/ui` and load
`@bolerish/ui/global.css`. Existing copied components need the updated motion
selectors from `add --force`, or a manual merge if their source was edited.

Existing aliases, accessibility settings and edited source files are retained.
Unedited generated settings files can refresh when JSON changes. If you edited
those files, merge the new defaults yourself. Older
`accessibility.respectReducedMotion` configurations remain readable, but the field is deprecated and no longer
removes reduced-motion rules from copied components. Do not use `respectReducedMotion: false` to turn motion off.

### AI coding-agent entry points

The docs build generates `llms.txt`, Korean/English guidelines, per-component
`api/*.md` references and `agent/SKILL.md` from canonical documentation and source.
Start at the generated index, find the control, then compare its exact reference
with your installed local version. The generated skill catalog is available for
manual use; no plugin, marketplace or Context7 registration is performed.
See [the AI export workflow](docs/README.md#ai-coding-agent-references).

A representative inline search uses the supported local API:

```tsx
import { Combobox, ComboboxInput } from "@/components/ui/combobox";
import { Input } from "@/components/ui/input";

export function InlineControls() {
  return (
    <div>
      <Input variant="inline" aria-label="Bookmark title" />
      <Combobox>
        <ComboboxInput
          variant="inline"
          aria-label="Search"
          startAddon={
            <button type="button" aria-label="Search engine">
              Engine
            </button>
          }
          endAddon={<span>Shortcut</span>}
        />
      </Combobox>
    </div>
  );
}
```

Typography tokens are exported as `typo`. The existing `typographyVars` name remains a compatibility export of the same variable group; do not apply two separate themes. `spacingRoleVars` provides purpose-based spacing. Configure `theme.unit` as `rem` (default) or `px`, and `theme.density` as `default`, `compact`, or a positive number up to 2. Pixel mode uses 1rem=16px and does not follow root font-size preferences.
