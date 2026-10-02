import type { DocsContextProps } from "@storybook/addon-docs/blocks";
import { useEffect, useState } from "react";
import { GLOBALS_UPDATED, UPDATE_GLOBALS } from "storybook/internal/core-events";

export type DocumentationGlobals = {
  unit: "rem" | "px";
  density: "default" | "compact" | "spacious";
  fontPreset: "default" | "serif-heading";
  locale: "ko" | "en";
  colorMode: "system" | "light" | "dark";
  motionPreference: "system" | "reduce" | "no-preference";
};

let lastKnownGlobals: DocumentationGlobals | undefined;

export function useDocumentationGlobals(context: DocsContextProps) {
  const [globals, setGlobals] = useState<DocumentationGlobals>(() => {
    const story = context.componentStories()[0];
    const initial =
      lastKnownGlobals ??
      (story
        ? context.getStoryContext(story).globals
        : context.channel.last(GLOBALS_UPDATED)?.[0]?.globals);
    const latest = context.channel.last(UPDATE_GLOBALS)?.[0]?.globals;
    return {
      unit: latest?.unit ?? initial?.unit ?? "rem",
      density: latest?.density ?? initial?.density ?? "default",
      fontPreset: latest?.fontPreset ?? initial?.fontPreset ?? "default",
      locale: latest?.locale ?? initial?.locale ?? "ko",
      colorMode: latest?.colorMode ?? initial?.colorMode ?? "light",
      motionPreference: latest?.motionPreference ?? initial?.motionPreference ?? "system",
    };
  });

  useEffect(() => {
    lastKnownGlobals = globals;
    // Only listen to toolbar requests; isolated previews also report their initial globals.
    const updateGlobals = ({ globals: changes }: { globals: Partial<DocumentationGlobals> }) => {
      lastKnownGlobals = { ...(lastKnownGlobals ?? globals), ...changes };
      setGlobals(lastKnownGlobals);
    };
    context.channel.on(UPDATE_GLOBALS, updateGlobals);
    return () => {
      context.channel.off(UPDATE_GLOBALS, updateGlobals);
    };
  }, [context.channel, globals]);

  return globals;
}
