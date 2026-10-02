export const registryItems = {
  heading: {
    files: ["heading.tsx", "typography.ts"],
    dependencies: ["@nuee/tokens", "@stylexjs/stylex"],
    registryDependencies: [],
  },
  accordion: {
    files: ["accordion.tsx"],
    dependencies: ["@base-ui/react", "@nuee/tokens", "@phosphor-icons/react", "@stylexjs/stylex"],
    registryDependencies: [],
  },
  "alert-dialog": {
    files: ["alert-dialog.tsx"],
    dependencies: ["@base-ui/react", "@nuee/tokens", "@stylexjs/stylex"],
    registryDependencies: ["button"],
  },
  "aspect-ratio": {
    files: ["aspect-ratio.tsx"],
    dependencies: ["@stylexjs/stylex"],
    registryDependencies: [],
  },
  attachment: {
    files: ["attachment.tsx"],
    dependencies: ["@nuee/tokens", "@stylexjs/stylex"],
    registryDependencies: ["button"],
  },
  avatar: {
    files: ["avatar.tsx"],
    dependencies: ["@base-ui/react", "@nuee/tokens", "@stylexjs/stylex"],
    registryDependencies: [],
  },
  badge: {
    files: ["badge.tsx"],
    dependencies: ["@nuee/tokens", "@stylexjs/stylex"],
    registryDependencies: [],
  },
  banner: {
    files: ["banner.tsx"],
    dependencies: ["@nuee/tokens", "@stylexjs/stylex"],
    registryDependencies: [],
  },
  breadcrumb: {
    files: ["breadcrumb.tsx"],
    dependencies: ["@nuee/tokens", "@phosphor-icons/react", "@stylexjs/stylex"],
    registryDependencies: [],
  },
  bubble: {
    files: ["bubble.tsx"],
    dependencies: ["@nuee/tokens", "@stylexjs/stylex"],
    registryDependencies: [],
  },
  button: {
    files: ["button.tsx", "styles/control-layout.ts"],
    dependencies: ["@base-ui/react", "@nuee/tokens", "@stylexjs/stylex"],
    registryDependencies: [],
  },
  "button-group": {
    files: ["button-group.tsx"],
    dependencies: ["@nuee/tokens", "@stylexjs/stylex"],
    registryDependencies: ["separator"],
  },
  card: {
    files: ["card.tsx"],
    dependencies: ["@nuee/tokens", "@stylexjs/stylex"],
    registryDependencies: [],
  },
  calendar: {
    files: ["calendar.tsx"],
    dependencies: ["@daypicker/react", "@nuee/tokens", "@stylexjs/stylex"],
    registryDependencies: [],
  },
  carousel: {
    files: ["carousel.tsx"],
    dependencies: [
      "@nuee/tokens",
      "@phosphor-icons/react",
      "@stylexjs/stylex",
      "embla-carousel-react",
    ],
    registryDependencies: ["button"],
  },
  checkbox: {
    files: ["checkbox.tsx"],
    dependencies: ["@base-ui/react", "@nuee/tokens", "@phosphor-icons/react", "@stylexjs/stylex"],
    registryDependencies: [],
  },
  collapsible: {
    files: ["collapsible.tsx"],
    dependencies: ["@base-ui/react", "@nuee/tokens", "@phosphor-icons/react", "@stylexjs/stylex"],
    registryDependencies: [],
  },
  combobox: {
    files: ["combobox.tsx"],
    dependencies: ["@base-ui/react", "@nuee/tokens", "@phosphor-icons/react", "@stylexjs/stylex"],
    registryDependencies: [],
  },
  "context-menu": {
    files: ["context-menu.tsx"],
    dependencies: ["@base-ui/react"],
    registryDependencies: ["dropdown-menu"],
  },
  dialog: {
    files: ["dialog.tsx"],
    dependencies: ["@base-ui/react", "@nuee/tokens", "@phosphor-icons/react", "@stylexjs/stylex"],
    registryDependencies: [],
  },
  "date-picker": {
    files: ["date-picker.tsx"],
    dependencies: ["@base-ui/react", "@nuee/tokens", "@phosphor-icons/react", "@stylexjs/stylex"],
    registryDependencies: ["calendar", "popover"],
  },
  drawer: {
    files: ["drawer.tsx"],
    dependencies: ["@base-ui/react", "@nuee/tokens", "@stylexjs/stylex"],
    registryDependencies: [],
  },
  "dropdown-menu": {
    files: ["dropdown-menu.tsx"],
    dependencies: ["@base-ui/react", "@nuee/tokens", "@phosphor-icons/react", "@stylexjs/stylex"],
    registryDependencies: [],
  },
  empty: {
    files: ["empty.tsx"],
    dependencies: ["@nuee/tokens", "@stylexjs/stylex"],
    registryDependencies: [],
  },
  field: {
    files: ["field.tsx", "typography.ts"],
    dependencies: ["@base-ui/react", "@nuee/tokens", "@stylexjs/stylex"],
    registryDependencies: ["checkbox", "input"],
  },
  "hover-card": {
    files: ["hover-card.tsx"],
    dependencies: ["@base-ui/react", "@nuee/tokens", "@stylexjs/stylex"],
    registryDependencies: [],
  },
  input: {
    files: ["input.tsx", "styles/control-layout.ts"],
    dependencies: ["@base-ui/react", "@nuee/tokens", "@stylexjs/stylex"],
    registryDependencies: [],
  },
  "input-group": {
    files: ["input-group.tsx"],
    dependencies: ["@nuee/tokens", "@stylexjs/stylex"],
    registryDependencies: ["button", "input", "textarea"],
  },
  "input-otp": {
    files: ["input-otp.tsx"],
    dependencies: ["@base-ui/react", "@nuee/tokens", "@stylexjs/stylex"],
    registryDependencies: [],
  },
  "content-row": {
    files: ["content-row.tsx", "typography.ts"],
    dependencies: ["@nuee/tokens", "@stylexjs/stylex"],
    registryDependencies: [],
  },
  kbd: {
    files: ["kbd.tsx"],
    dependencies: ["@nuee/tokens", "@stylexjs/stylex"],
    registryDependencies: [],
  },
  label: {
    files: ["label.tsx", "typography.ts"],
    dependencies: ["@nuee/tokens", "@stylexjs/stylex"],
    registryDependencies: [],
  },
  link: {
    files: ["link.tsx"],
    dependencies: ["@base-ui/react", "@nuee/tokens", "@phosphor-icons/react", "@stylexjs/stylex"],
    registryDependencies: [],
  },
  marker: {
    files: ["marker.tsx"],
    dependencies: ["@nuee/tokens", "@stylexjs/stylex"],
    registryDependencies: [],
  },
  menubar: {
    files: ["menubar.tsx"],
    dependencies: ["@base-ui/react", "@nuee/tokens", "@stylexjs/stylex"],
    registryDependencies: ["dropdown-menu"],
  },
  message: {
    files: ["message.tsx"],
    dependencies: ["@nuee/tokens", "@stylexjs/stylex"],
    registryDependencies: ["avatar", "bubble"],
  },
  "native-select": {
    files: ["native-select.tsx"],
    dependencies: ["@nuee/tokens", "@phosphor-icons/react", "@stylexjs/stylex"],
    registryDependencies: [],
  },
  "navigation-menu": {
    files: ["navigation-menu.tsx"],
    dependencies: ["@base-ui/react", "@nuee/tokens", "@phosphor-icons/react", "@stylexjs/stylex"],
    registryDependencies: [],
  },
  pagination: {
    files: ["pagination.tsx"],
    dependencies: ["@nuee/tokens", "@phosphor-icons/react", "@stylexjs/stylex"],
    registryDependencies: [],
  },
  popover: {
    files: ["popover.tsx"],
    dependencies: ["@base-ui/react", "@nuee/tokens", "@stylexjs/stylex"],
    registryDependencies: [],
  },
  progress: {
    files: ["progress.tsx"],
    dependencies: ["@base-ui/react", "@nuee/tokens", "@stylexjs/stylex"],
    registryDependencies: [],
  },
  "radio-group": {
    files: ["radio-group.tsx"],
    dependencies: ["@base-ui/react", "@nuee/tokens", "@stylexjs/stylex"],
    registryDependencies: [],
  },
  "scroll-area": {
    files: ["scroll-area.tsx"],
    dependencies: ["@base-ui/react", "@nuee/tokens", "@stylexjs/stylex"],
    registryDependencies: [],
  },
  select: {
    files: ["select.tsx"],
    dependencies: ["@base-ui/react", "@nuee/tokens", "@phosphor-icons/react", "@stylexjs/stylex"],
    registryDependencies: [],
  },
  separator: {
    files: ["separator.tsx"],
    dependencies: ["@base-ui/react", "@nuee/tokens", "@stylexjs/stylex"],
    registryDependencies: [],
  },
  skeleton: {
    files: ["skeleton.tsx"],
    dependencies: ["@nuee/tokens", "@stylexjs/stylex"],
    registryDependencies: [],
  },
  slider: {
    files: ["slider.tsx"],
    dependencies: ["@base-ui/react", "@nuee/tokens", "@stylexjs/stylex"],
    registryDependencies: [],
  },
  spinner: {
    files: ["spinner.tsx"],
    dependencies: ["@nuee/tokens", "@stylexjs/stylex"],
    registryDependencies: [],
  },
  switch: {
    files: ["switch.tsx", "styles/control-layout.ts"],
    dependencies: ["@base-ui/react", "@nuee/tokens", "@stylexjs/stylex"],
    registryDependencies: [],
  },
  timeline: {
    files: ["timeline.tsx"],
    dependencies: ["@nuee/tokens", "@stylexjs/stylex"],
    registryDependencies: [],
  },
  table: {
    files: ["table.tsx"],
    dependencies: ["@nuee/tokens", "@stylexjs/stylex"],
    registryDependencies: [],
  },
  tabs: {
    files: ["tabs.tsx"],
    dependencies: ["@base-ui/react", "@nuee/tokens", "@stylexjs/stylex"],
    registryDependencies: [],
  },
  textarea: {
    files: ["textarea.tsx"],
    dependencies: ["@nuee/tokens", "@stylexjs/stylex"],
    registryDependencies: [],
  },
  toast: {
    files: ["toast.tsx", "toast.stylex.ts", "typography.ts"],
    dependencies: ["@base-ui/react", "@nuee/tokens", "@phosphor-icons/react", "@stylexjs/stylex"],
    registryDependencies: [],
  },
  toggle: {
    files: ["toggle.tsx"],
    dependencies: ["@base-ui/react", "@nuee/tokens", "@stylexjs/stylex"],
    registryDependencies: [],
  },
  "toggle-group": {
    files: ["toggle-group.tsx"],
    dependencies: ["@base-ui/react", "@nuee/tokens", "@stylexjs/stylex"],
    registryDependencies: ["toggle"],
  },
  tooltip: {
    files: ["tooltip.tsx"],
    dependencies: ["@base-ui/react", "@nuee/tokens", "@stylexjs/stylex"],
    registryDependencies: [],
  },
};
