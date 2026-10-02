import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

import { readConfig, resolveConfigAlias, resolveTokenAlias } from "./config.js";

function toPascalCase(name: string) {
  return name
    .split("-")
    .map((part) => `${part[0]?.toUpperCase()}${part.slice(1)}`)
    .join("");
}

export async function newComponent(projectDirectory: string, name: string | undefined) {
  if (!name || !/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/.test(name)) {
    throw new Error("Enter a component name in kebab-case. For example: status-chip.");
  }

  const config = await readConfig(projectDirectory);
  const uiDirectory = await resolveConfigAlias(projectDirectory, config.aliases.ui, "aliases.ui");
  const componentName = toPascalCase(name);
  const componentPath = join(uiDirectory, `${name}.tsx`);
  const tokenImport = `${await resolveTokenAlias(projectDirectory, config.aliases.styles)}/semantic.stylex`;
  await mkdir(uiDirectory, { recursive: true });
  try {
    await writeFile(
      componentPath,
      `import { colorVars, radiusVars, spacingVars } from "${tokenImport}";
import * as stylex from "@stylexjs/stylex";
import type { ComponentProps } from "react";

const styles = stylex.create({
  root: {
    backgroundColor: colorVars.bgSurface,
    borderRadius: radiusVars.sm,
    padding: spacingVars.space3,
  },
});

export type ${componentName}Props = Omit<ComponentProps<"div">, "className" | "style"> & {
  xstyle?: stylex.StyleXStyles;
};

export function ${componentName}({ xstyle, ...props }: ${componentName}Props) {
  return <div {...props} {...stylex.props(styles.root, xstyle)} />;
}
`,
      { flag: "wx" },
    );
  } catch (error) {
    if (typeof error === "object" && error !== null && "code" in error && error.code === "EEXIST") {
      throw new Error(
        `${componentPath} already exists. Existing components will not be overwritten.`,
      );
    }
    throw error;
  }

  console.log(`Created a ${name} component scaffold: ${componentPath}`);
}
