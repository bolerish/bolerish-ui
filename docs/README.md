# @bolerish/ui documentation

## Component examples

Keep `docs.mdx` and React examples together in `src/components/{component}/`.
Pass the example's `?raw` import to `ComponentPreview` to display its source.
Use `isolated height={360}` for examples that need an overlay boundary.

## Foundations

Edit `src/foundations/{topic}/guidelines.md` and `guidelines.en.md` together.
These files supply localized user documentation. Agent entry points, API links
and full LLM guidelines use the canonical `*.en.md` sources exclusively.

The development and build scripts generate `public/llms.txt`, `llms-full.txt`,
`llms-full.en.txt`, `bolerish-for-llms.md`, and per-topic Markdown. Both full LLM
files contain identical English content; Korean per-topic files remain available
for the user documentation. To regenerate them during development,
run this from `docs/`:

```sh
node scripts/build-guidelines.mjs
```

See [translation conventions](src/documentation/locales/README.md).

## Page structure and tables

Foundation selection guides follow: introduction → Selection guidelines → Examples
→ Token reference. Keep topic-specific rules under the guidelines and place cautions
beside the decision they qualify. Accessibility uses Design guidelines; writing
pages use Writing guidelines. Getting Started remains a numbered walkthrough.

Component pages follow: introduction → Basic example → Composition →
Installation → Usage guidelines → More examples. Omit sections that have no additional content.
Keep detailed usage guidance after the example and composition.

Use consistent headings for tables with the same purpose:

| Purpose                     | English columns                            | Korean columns                    |
| --------------------------- | ------------------------------------------ | --------------------------------- |
| Select a token or component | Situation / Recommended choice / Code      | 사용 상황 / 권장 선택 / 적용 코드 |
| Compare alternatives        | Situation / Recommended choice / Rationale | 사용 상황 / 권장 선택 / 선택 이유 |
| Check accessibility         | Interaction / Verification                 | 확인할 동작 / 확인 방법           |
| Revise copy                 | Before / After / Rationale                 | 수정 전 / 수정 후 / 수정 이유     |

API, token-value, and typography-specification tables name the properties they
actually describe. Do not force them into the selection-table format. Code cells
show a real property assignment or component usage, not a bare token name.

Wrap component identifiers, prop names, and token references in inline code, such
as `AlertDialogTitle`, `aria-describedby`, and `colorVars.fgPrimary`. Keep ordinary
prose and section titles as text. Explain what content belongs in a slot only when
it affects a decision, accessibility, or recovery; omit sentences that merely
repeat the slot name.

## AI coding-agent references

The same build emits `installation.md` from the root README, `api/*.md` from
component and token/configuration source, and `agent/SKILL.md` from the component
catalog. `llms.txt` links these entries. Edit the canonical guides, source types
or README, then regenerate; do not maintain a second API catalog by hand.
The generated skill is a static downloadable entry, not an installed plugin or
MCP service. Consumers must still inspect their installed local source/version.

Run `pnpm --filter @bolerish/docs test:agent` after generating docs to check freshness,
registry coverage, reference links and canonical source contents. The UI consumer
Vite test also compiles the README examples against installed source APIs.
