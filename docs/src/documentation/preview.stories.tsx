import { spacingVars } from "@bolerish/tokens/semantic.stylex";
import type { Meta, StoryObj } from "@storybook/react-vite";
import * as stylex from "@stylexjs/stylex";
import { type ComponentType, lazy, Suspense } from "react";

import { ui } from "./locale";

const modules = import.meta.glob<{ default: ComponentType }>([
  "../components/*/*.tsx",
  "../patterns/*/*.tsx",
  "../foundations/*/*Example.tsx",
]);
const examples = Object.fromEntries(
  Object.entries(modules).map(([path, load]) => [
    path.split("/").slice(-2).join("--").replace(".tsx", ""),
    lazy(load),
  ]),
);
const styles = stylex.create({ content: { padding: spacingVars.space6, width: "100%" } });

function ExampleCanvas({ example }: { example: string }) {
  const Component = examples[example];
  return (
    <div {...stylex.props(styles.content)}>
      {Component ? (
        <Suspense fallback={<p>{ui.loading}</p>}>
          <Component />
        </Suspense>
      ) : (
        <p>{ui.missing}</p>
      )}
    </div>
  );
}

const meta = {
  title: "Internal/Preview",
  tags: ["!dev", "!autodocs"],
  parameters: { layout: "fullscreen" },
} satisfies Meta<{ example: string }>;
export default meta;
export const Example: StoryObj<{ example: string }> = {
  args: { example: "button--Default" },
  render: (args) => <ExampleCanvas {...args} />,
};
