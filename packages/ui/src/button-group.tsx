"use client";

import {
  colorVars,
  radiusVars,
  sizeVars,
  spacingVars,
  typographyVars,
} from "@bolerish/tokens/semantic.stylex";
import * as stylex from "@stylexjs/stylex";
import {
  Children,
  Fragment,
  cloneElement,
  isValidElement,
  type ComponentProps,
  type ReactElement,
  type ReactNode,
} from "react";

import { Separator } from "./separator";

const styles = stylex.create({
  root: {
    alignItems: "stretch",
    display: "inline-flex",
    gap: 0,
    width: "fit-content",
  },

  item: {
    minWidth: 0,
    position: "relative",
    ":focus-visible": { zIndex: 1 },
  },

  text: {
    alignItems: "center",
    backgroundColor: colorVars.bgSurface,
    borderColor: colorVars.strokeDefault,
    borderStyle: "solid",
    borderWidth: sizeVars.stroke,
    color: colorVars.fgSecondary,
    display: "inline-flex",
    fontSize: typographyVars.fontSizeSm,
    fontWeight: typographyVars.fontWeightMedium,
    justifyContent: "center",
    minHeight: sizeVars.controlMd,
    paddingInline: spacingVars.space3,
  },
  separator: { alignSelf: "stretch", height: "auto", marginInline: -1, minHeight: "auto" },
});

const orientationStyles = stylex.create({
  horizontal: { flexDirection: "row" },
  vertical: { flexDirection: "column" },
});

const itemOrientationStyles = stylex.create({
  horizontal: { marginInlineStart: -1 },
  vertical: { marginBlockStart: -1 },
});

const firstItemStyles = stylex.create({
  horizontal: { marginInlineStart: 0 },
  vertical: { marginBlockStart: 0 },
});

const onlyItemStyles = stylex.create({
  horizontal: { borderRadius: radiusVars.sm },
  vertical: { borderRadius: radiusVars.sm },
});

const firstItemRadiusStyles = stylex.create({
  horizontal: {
    borderBottomLeftRadius: radiusVars.sm,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: radiusVars.sm,
    borderTopRightRadius: 0,
  },
  vertical: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: radiusVars.sm,
    borderTopRightRadius: radiusVars.sm,
  },
});

const middleItemStyles = stylex.create({
  horizontal: { borderRadius: 0 },
  vertical: { borderRadius: 0 },
});

const lastItemStyles = stylex.create({
  horizontal: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: radiusVars.sm,
    borderTopLeftRadius: 0,
    borderTopRightRadius: radiusVars.sm,
  },
  vertical: {
    borderBottomLeftRadius: radiusVars.sm,
    borderBottomRightRadius: radiusVars.sm,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
});

type StyleProps = { xstyle?: stylex.StyleXStyles };
type GroupItem = ReactElement<StyleProps>;

function isGroupItem(child: ReactNode): child is GroupItem {
  return (
    isValidElement(child) &&
    typeof child.type !== "string" &&
    child.type !== Fragment &&
    child.type !== ButtonGroupSeparator
  );
}

function getItemPositionStyle(
  orientation: "horizontal" | "vertical",
  isFirst: boolean,
  isLast: boolean,
) {
  if (isFirst && isLast) return onlyItemStyles[orientation];
  if (isFirst) return firstItemRadiusStyles[orientation];
  if (isLast) return lastItemStyles[orientation];
  return middleItemStyles[orientation];
}

/** Direct children must be Nuee buttons or components that forward xstyle. Fragments and native elements are not styled as group items. */
export type ButtonGroupProps = Omit<ComponentProps<"div">, "className" | "style"> &
  StyleProps & { orientation?: "horizontal" | "vertical" };

export function ButtonGroup({
  children,
  orientation = "horizontal",
  role,
  xstyle,
  ...props
}: ButtonGroupProps) {
  const childItems = Children.toArray(children);
  const groupItems = childItems.filter(isGroupItem);

  let position = -1;
  const content: ReactNode[] = [];
  for (const child of childItems) {
    if (!isGroupItem(child)) {
      content.push(child);
      continue;
    }

    position += 1;
    const isFirst = position === 0;
    const isLast = position === groupItems.length - 1;

    content.push(
      cloneElement(child, {
        xstyle: [
          styles.item,
          itemOrientationStyles[orientation],
          isFirst && firstItemStyles[orientation],
          getItemPositionStyle(orientation, isFirst, isLast),
          child.props.xstyle,
        ],
      }),
    );
  }

  return (
    <div
      {...props}
      data-orientation={orientation}
      role={role ?? "group"}
      {...stylex.props(styles.root, orientationStyles[orientation], xstyle)}
    >
      {content}
    </div>
  );
}

export function ButtonGroupText({
  xstyle,
  ...props
}: Omit<ComponentProps<"span">, "className" | "style"> & StyleProps) {
  return <span {...props} {...stylex.props(styles.text, xstyle)} />;
}

export function ButtonGroupSeparator({
  orientation = "vertical",
  xstyle,
  ...props
}: Omit<ComponentProps<typeof Separator>, "className" | "style"> & StyleProps) {
  return <Separator {...props} orientation={orientation} xstyle={[styles.separator, xstyle]} />;
}
