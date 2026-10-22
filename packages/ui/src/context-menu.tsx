"use client";

import { ContextMenu as ContextMenuPrimitive } from "@base-ui/react/context-menu";
import * as stylex from "@stylexjs/stylex";
import type { ComponentProps } from "react";

import { mergeStyles } from "./styles/merge-styles";
import type { StyledProps } from "./styles/merge-styles";

export {
  DropdownMenuCheckboxItem as ContextMenuCheckboxItem,
  DropdownMenuContent as ContextMenuContent,
  DropdownMenuGroup as ContextMenuGroup,
  DropdownMenuItem as ContextMenuItem,
  DropdownMenuLabel as ContextMenuLabel,
  DropdownMenuRadioGroup as ContextMenuRadioGroup,
  DropdownMenuRadioItem as ContextMenuRadioItem,
  DropdownMenuSeparator as ContextMenuSeparator,
  DropdownMenuShortcut as ContextMenuShortcut,
  DropdownMenuSub as ContextMenuSub,
  DropdownMenuSubContent as ContextMenuSubContent,
  DropdownMenuSubTrigger as ContextMenuSubTrigger,
} from "./dropdown-menu";
export const ContextMenu = ContextMenuPrimitive.Root;
export function ContextMenuTrigger({
  className,
  style,
  xstyle,
  ...props
}: StyledProps<ComponentProps<typeof ContextMenuPrimitive.Trigger>> & {
  xstyle?: stylex.StyleXStyles;
}) {
  return (
    <ContextMenuPrimitive.Trigger
      {...props}
      {...mergeStyles(stylex.props(xstyle), className, style)}
    />
  );
}
