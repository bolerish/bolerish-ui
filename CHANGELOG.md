## Unreleased

- Allow Motion now plays component transitions even when the OS requests reduced
    motion. System follows the OS, and Reduce Motion disables transitions.

- Keep sidebar action menus in the same neutral surface as their row on hover.
    Keyboard focus remains visible without the bright background or glow.

- Read package usage examples and concise prop choices on component pages.
    Installation lives in Getting Started; duplicated source examples and old
    design proposals have been removed.

- Use cool near-black dark surfaces and monochrome Zinc primary actions.
    Primary buttons use dark fills in light mode and light fills in dark mode.
    Control boundaries preserve contrast; feedback colors retain their meanings.

- Customize styled components with className and inline style without losing
    their built-in styles. Existing xstyle restrictions and styling targets
    remain available. Check focus and state contrast when overriding appearance.

- Keep palette authoring in OKLCH and ship generated HEX tokens. Existing Zinc
    values and token names are retained; translucent colors use eight-bit alpha.

- Remove Message and Bubble, their source-copy entries and outgoing-message color
    tokens. Compose conversation layouts in your app before upgrading.
- Distinguish the current Timeline step with the primary Zinc surface while
    keeping completed steps subtle. Disabled textareas no longer offer resizing.

- Use Paragraph for body, description and caption text. P remains a compatible
    alias, including its existing package and source-copy paths.
- Soften resting control borders, hover outlines and selected surfaces while
    retaining visible keyboard focus and error indicators.
- Match Storybook navigation and controls to the light/dark Zinc palette used
    by component previews.

The package is now named `@bolerish/ui`. Versions v0.9.1 and earlier below were
released as `@nuee/ui`; their release notes remain part of this project history.

- Use bolerish/ui directly from the installed package with one CSS import.
    Light and dark themes are available without a StyleX build plugin.
    Editable source copying remains optional; existing copied files are retained.

- Keep keyboard focus visible in outlined toggle groups. Soft toggle selections
    use a flat boundary, and dark canvases have a gentler contrast with panels.

- Refine component shapes with crisper controls and softer panel corners.
    Cards use readable body text and wrap their actions on narrow screens;
    inputs respond on hover while preserving error and focus indicators.
    Selected toggles are clearer, and modal backdrops use a flat dimming layer.
    Merge updated tokens and component source together to adopt the changes.
- Rename the product to bolerish/ui, packages to @bolerish/* and the command to
    bolerish. New configuration uses .bolerish.json; existing .nuee.json and
    nuee.json remain readable. Run bolerish init --force to migrate the name and
    schema while preserving settings and legacy files.
- Use subtly cool Zinc grays for light and dark surfaces, actions and text.
    Inputs have clear boundaries; feedback colors and existing font,
    spacing and corner scales remain available. Merge updated tokens and copied
    components together if you customized their source.
- Give documentation previews their own canvas background, separate from code
    blocks, including examples with transparent component backgrounds.
- Add P for body, description and caption paragraphs. Heading examples now show
    every HTML level from h1 to h6, independently of visual size.
- Correct generated typography variables so component text uses its intended
    size, weight and line height.

## Version v0.9.1

Released on 2026-10-05.

- Read editor completion values from the installed @nuee/ui package, keeping
    only .nuee.json in the project root. Rerun init --force to update the schema
    reference, then remove the old .nuee.schema.json if present.

## Version v0.9.0

Released on 2026-10-02.

- Group generated token definitions under styles/tokens and shared control
    placement types under styles. Existing flat tokens remain readable; rerun
    init --force to copy them into the new structure while preserving edits.

- Let app users choose system, on or off motion at runtime. Only their explicit
    on choice overrides OS reduced motion; JSON defaults remain system or off.
    The legacy respectReducedMotion field no longer removes OS motion rules.

- Use @nuee/ui consistently as the product name in documentation and CLI output.
- Configuration now uses .nuee.json with a local schema for editor suggestions.
    Rename an existing nuee.json to .nuee.json and run nuee init --force.
    Motion defaults remain in JSON with system and off choices.

## Version v0.8.1

Released on 2026-10-02.

- Distinguish persistent selection, drop destinations, and insertion positions
    with explicit color roles in both themes and accessible movement examples.
- Follow the selection and feedback contracts when composing controls and fields.
    Page-width guidance now demonstrates the centered content token.
- Use the responsive Drawer example to reserve panel space on wide screens while
    retaining the overlay layout on narrow screens.
- Checkbox, Radio and Switch follow their checked and disabled states directly,
    preserving keyboard interaction and disabled appearance. Menu separators use
    an emphasized boundary, and the soft Toggle Group has a matching example.
- Coding-agent indexes and full guidelines use canonical English sources.
    Localized Korean user documentation remains available.

## Version v0.8.0

Released on 2026-10-02.

- Choose purpose-based spacing roles, rem or px units, and a shared density for
    typography, controls, icons and content widths. Existing numeric spacing and
    typographyVars remain compatible; new code can use typo.
- Configure body and heading font defaults and system/off motion in nuee.json.
    Runtime user choices override defaults, and OS reduced motion stays respected.
    Existing edited source and generated files are preserved during initialization.
- Use supported inline Input and Combobox layouts with supporting addons and
    visible focus. Related Field groups now share a consistent spacing role.
- Preview neighboring carousel slides with slideRatio, excluding the gap from
    the ratio calculation. Existing full-width slides remain the default.
- Toggle selection uses neutral surfaces and boundaries, including disabled
    selections. Timeline decorations and completed events are neutral; meaningful
    error colors and explicit indicator overrides remain available.
- Compare shared preferences in Storybook and discover canonical API, token,
    configuration and installation references through generated agent guidance.
- Doctor compares recorded installed versions with its registry. Drawer guidance
    explains restoring focus across screen transitions.

## Version v0.7.0

Released on September 14, 2026.

- Button now separates filled `secondary` and bordered `outline` variants.
    Use `outline` to retain the previous secondary appearance.
- Rename Button size `icon` to `icon-md` and add `icon-xl` (48px).
    Icon sizes now range from `icon-xs` through `icon-xl`.

- DrawerContent now includes its popup, portal, overlay, and optional swipe
    handle. Remove DrawerPopup wrappers and use Drawer props to configure the
    overlay and handle; these parts are no longer separate public components.
    Content `xstyle` applies directly around children.

## Version v0.6.1

Released on September 10, 2026.

- Record the installed foundation and component versions in `nuee.json`.
    Existing configuration files remain supported; unknown source versions
    are not reported as the current release.

- Simplify Accordion composition to Accordion, AccordionItem, AccordionTrigger,
    and AccordionContent. Remove explicit AccordionHeader and AccordionPanel
    wrappers; AccordionContent applies `xstyle` directly around its children.

- Accordion and Collapsible panels leave room for focus outlines on controls
    at content edges while preserving their expand and collapse animations.

- Button supports `align="start"`, `"center"`, `"end"`, and `"space-between"`
    to position its content. The default remains centered.

## Version v0.6.0

Released on September 10, 2026.

- Button renders children directly without an extra span, preserving icon spacing
    and interaction backgrounds.

- Styled components consistently accept `xstyle`. Controls and text elements
    retain typed limits that protect their appearance and interaction states.
- Compose panels and content explicitly: use DrawerPopup with DrawerContent,
    AccordionPanel with AccordionContent, and CollapsiblePanel with
    CollapsibleContent. Each part accepts its own `xstyle`.
- Replace SelectContent and ComboboxContent with SelectPopup / SelectList and
    ComboboxPopup / ComboboxList. Place ScrollAreaViewport and ScrollAreaContent
    inside ScrollArea, Table inside TableContainer, and CarouselContent inside
    CarouselViewport to preserve scrolling behavior.
- Wrap AccordionTrigger in AccordionHeader. Compose Banner messages using
    BannerContent, BannerTitle, BannerDescription, and BannerActions instead of
    the title, description, and action props.
- NativeSelect and ComboboxInput apply layout overrides to the whole control,
    including icons. Trigger, close, and group components use `xstyle` instead
    of native `className` and `style` overrides.

## 0.5.1 (September 7, 2026)

### Breaking Changes

- Removed the `Icon` wrapper and `@nuee/ui/icon` export. Import icons directly
    from `@phosphor-icons/react` instead.

### Components

- Simplified StyleX styling and state handling without changing component
    appearance.
- Link now accepts `ref` as a prop using React 19, without a `forwardRef` wrapper.

### Documentation

- Fixed Typography token preview line heights and row alignment so tight and
    normal line spacing remain distinguishable.

## 0.5.0 (September 7, 2026)

### Breaking Changes

- Styled components, including Table, Button Group, and components generated by
    `nuee new`, reject native `className` and `style` overrides. Use `xstyle` on
    components that expose it; custom Button Group children must forward it.
- Replaced `nuee init --framework vite` with `nuee init --vite`.

### Components

- Added Heading with visual typography independent of HTML heading levels, and
    Timeline for activity, status, and event histories.
- Aligned typography across Field, Label, Content Row, and Toast. Horizontal
    checkboxes align with the first label line, and Content Row titles, text
    actions, and icon buttons align consistently.
- Improved Toast stacking without scaling card contents. Status icons, actions,
    and close buttons stay aligned when descriptions wrap.
- Escape dismisses one toast at a time, newest first; holding it no longer
    dismisses the entire stack. Customize the dismiss-all label through
    `clearAllProps.children`.
- Refined Toast action backgrounds and shared spacing, border, and size tokens
    across Toast, Accordion, Message, Bubble, Table, Marker, Drawer, and Scroll
    Area. Select and Combobox separators now use valid token-based spacing.
- Improved pressed and selected control contrast across themes, including
    Toggle, Toggle Group, and segmented Tabs.
- Improved dark-mode content hierarchy, Calendar readability, feedback surfaces,
    borders, Skeleton placeholders, and disabled controls. Text selection now
    uses a neutral highlight that adapts to surrounding text.
- Removed competing colored borders from soft feedback surfaces while retaining
    field validation borders.
- Standardized interaction timing and reduced-motion transitions, including
    popup closing animations. Keyboard menu highlighting remains immediate.
- Fixed Calendar arrow-key focus and hovered selection colors; range interiors
    remain distinct from endpoints. Today uses a subtle background, and Date
    Picker triggers no longer include a calendar icon.
- Banner titles accept React content. Carousel callback changes no longer
    restart selection subscriptions.

### CLI

- Initialization suggests aliases from TypeScript configuration; alias resolution
    respects explicit paths and inheritance.
- Initialization preserves unreadable user tokens and checks Vite configuration
    before changing files. Unsupported configurations require manual setup.
- Component installation validates registry data, source syntax, and the project
    manifest before writing files. Boolean flags can precede component names.
- `nuee doctor` recognizes direct Vite compiler imports and fails when setup
    cannot be verified. Other bundlers still require manual verification.

### Documentation

- Reorganized component guides around examples, composition, and usage guidance,
    with Korean and English prose and English examples. Added a search-and-filter
    pattern showing draft and applied criteria.
- Combined component documentation into single pages with resizable,
    content-sized previews and copyable source. Examples preserve their own
    typography, spacing, and table styles.
- Placed token previews beside foundation guidance, improved selection tables,
    and added working State and Typography examples.
- Replaced Inclusive Design with Accessibility guidance covering keyboard,
    contrast, text spacing, and assistive technology. Removed incomplete Gradient,
    International Design, and standalone Tokens pages.
- Expanded Getting Started, Voice and Tone, and Feedback guidance. Component and
    pattern guidance is also available in `llms.txt` and `llms-full.txt`.
- Theme changes update examples and code without clearing the current example.
    Fixed preview hook errors, dark-mode text selection, and motion controls that
    previously required reloading.
- Updated the sidebar and previews with locally hosted LINE Seed and Geist Mono,
    Phosphor sidebar icons, and native language, theme, and motion controls.
- Aligned Bubble examples with Message's outgoing primary treatment.

## 0.4.2 (September 4, 2026)

- Added Calendar, Date Picker, and Carousel components. Install only the
    packages you need with `nuee add calendar`, `date-picker`, or `carousel`.
- Calendar now keeps DayPicker CSS slot overrides internal; customize its root
    through nuée's `xstyle` API instead.
- Fixed Date Picker controlled state so clearing a selection with
    `value={undefined}` also clears the displayed value.
- Redesigned dark mode around charcoal surfaces, clearer elevation, and paired
    foreground colors so components remain readable when the theme changes.
- Removed the incomplete Message Scroller component from the registry. Compose
    conversation lists with Message Group until a complete scroller returns.
- Added separate body and heading typeface tokens. Set
    `typographyVars.fontFamilyBody` and `typographyVars.fontFamilyHeading` in your
    theme when your product uses distinct reading and display typefaces.
- `nuee add` now installs a component's documented building blocks together, so
    `nuee add field` also includes Checkbox and Input.
- `nuee add` skips external packages already declared in your project and
    installs missing packages without an unnecessary confirmation prompt.
- When an installed component would change, `nuee add` now shows the affected
    files and asks once before overwriting them.
- Bubble now separates visual variants from alignment. Use `variant="primary"`
    for sent messages and `align="end"` to position a bubble at the end.
- Message now uses the same alignment vocabulary and provides Group and Avatar
    slots for composing message lists without implicit layout behaviour.
- Attachment content now keeps equal visual space on both sides of its media and
    text.

## 0.4.1 (September 3, 2026)

- `nuee init --framework vite` no longer adds `@nuee/ui` to your project. The
    reset stylesheet is generated locally, so component imports continue to
    resolve through your configured UI alias.

## 0.4.0 (September 3, 2026)

- Components now accept StyleX `xstyle` customisation only. Replace native
    `className` and inline `style` overrides with `xstyle` when upgrading.
- Removed the generated StyleX-to-native style bridge, so installed components
    use one consistent StyleX styling path.

## 0.3.2 (September 3, 2026)

- Components that need shared StyleX helpers now install every required local
    file, preventing Vite import-resolution failures.
- Added components preserve the UI and styles aliases configured in `nuee.json`.
    Existing Vite and StyleX settings remain under the project's control.
- Releases now build every registered component in a Vite consumer app before
    publishing, catching package integration problems earlier.
