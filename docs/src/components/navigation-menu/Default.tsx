import { colorVars, spacingVars, typo } from "@bolerish/tokens/semantic.stylex";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@bolerish/ui/navigation-menu";
import * as stylex from "@stylexjs/stylex";
import type { ReactNode } from "react";
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
  navigationGrid: {
    display: "grid",
    gap: spacingVars.space1,
    listStyle: "none",
    margin: 0,
    padding: 0,
    width: "24rem",
  },
  navigationGridCompact: {
    width: "18rem",
  },
  navigationContent: {
    display: "flex",
    flexDirection: "column",
    gap: spacingVars.space1,
  },
  navigationTitle: {
    display: "block",
    fontSize: typo.fontSizeSm,
    fontWeight: typo.fontWeightMedium,
  },
  navigationDescription: {
    color: colorVars.fgSecondary,
    display: "block",
    fontSize: typo.fontSizeXs,
    lineHeight: typo.lineHeightNormal,
    marginTop: spacingVars.space1,
  },
});
function NavigationItem({ children, title }: { children: ReactNode; title: string }) {
  return (
    <li>
      <NavigationMenuLink href="#">
        <span {...stylex.props(layout.navigationContent)}>
          <span {...stylex.props(layout.navigationTitle)}>{title}</span>
          <span {...stylex.props(layout.navigationDescription)}>{children}</span>
        </span>
      </NavigationMenuLink>
    </li>
  );
}
export default function Default() {
  return (
    <div {...stylex.props(layout.preview)}>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Product</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul {...stylex.props(layout.navigationGrid)}>
                <NavigationItem title="Design tokens">
                  Explore the shared language of color and spacing.
                </NavigationItem>
                <NavigationItem title="Components">
                  Explore the building blocks of product screens.
                </NavigationItem>
                <NavigationItem title="Getting started">
                  Follow the steps from installation to your first screen.
                </NavigationItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul {...stylex.props(layout.navigationGrid, layout.navigationGridCompact)}>
                <NavigationItem title="Installation">
                  Install the packages your project needs.
                </NavigationItem>
                <NavigationItem title="Examples">
                  Review useful combinations for building screens.
                </NavigationItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href="#">Documentation</NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
        <NavigationMenuViewport />
      </NavigationMenu>
    </div>
  );
}
