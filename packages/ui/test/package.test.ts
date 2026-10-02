import assert from "node:assert/strict";
import { execFile as execFileCallback } from "node:child_process";
import { access, mkdir, mkdtemp, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

import { build } from "vite";

const execFile = promisify(execFileCallback);
const cliPath = fileURLToPath(new URL("../dist/cli.js", import.meta.url));
const testDirectory = dirname(fileURLToPath(import.meta.url));

test("@nuee/ui CLI builds every added component in a Vite app", async () => {
  const projectDirectory = await mkdtemp(join(testDirectory, ".vite-app-"));

  try {
    await Promise.all([
      writeFile(
        join(projectDirectory, "package.json"),
        JSON.stringify({ name: "nuee-vite-app", private: true, type: "module" }),
      ),
      writeFile(
        join(projectDirectory, "tsconfig.json"),
        JSON.stringify({ compilerOptions: { paths: { "@/*": ["./src/*"] } } }),
      ),
      writeFile(
        join(projectDirectory, "vite.config.ts"),
        [
          'import { defineConfig } from "vite";',
          'import stylex from "@stylexjs/unplugin";',
          "",
          "function react() {",
          '  return { name: "react" };',
          "}",
          "",
          "export default defineConfig({",
          '  resolve: { alias: { "@": new URL("./src", import.meta.url).pathname } },',
          "  plugins: [",
          "    stylex.vite({",
          '      aliases: { "@/styles/*": [new URL("./src/styles/*", import.meta.url).pathname] },',
          '      unstable_moduleResolution: { type: "commonJS" },',
          "    }),",
          "    react(),",
          "  ],",
          "});",
          "",
        ].join("\n"),
      ),
      writeFile(
        join(projectDirectory, "index.html"),
        '<div id="root"></div><script type="module" src="/src/main.tsx"></script>\n',
      ),
    ]);
    await mkdir(join(projectDirectory, "src"));
    await Promise.all([
      writeFile(join(projectDirectory, "src/index.css"), "body { margin: 0; }\n"),
      writeFile(join(projectDirectory, "src/main.tsx"), 'import "./index.css";\n'),
    ]);

    await execFile(process.execPath, [
      cliPath,
      "init",
      "--defaults",
      "--vite",
      "--skip-dependencies",
      "--cwd",
      projectDirectory,
    ]);
    const configPath = join(projectDirectory, "nuee.json");
    const installedConfig = JSON.parse(await readFile(configPath, "utf8"));
    await writeFile(
      configPath,
      JSON.stringify({
        ...installedConfig,
        theme: {
          density: 0.875,
          unit: "px",
          motion: "off",
          fonts: { body: "Arial, sans-serif", heading: "Georgia, serif" },
        },
      }),
    );
    await execFile(process.execPath, [
      cliPath,
      "init",
      "--force",
      "--defaults",
      "--vite",
      "--skip-dependencies",
      "--cwd",
      projectDirectory,
    ]);
    const packageJson = JSON.parse(await readFile(join(projectDirectory, "package.json"), "utf8"));
    assert.equal(packageJson.dependencies?.["@nuee/ui"], undefined);
    assert.equal(packageJson.devDependencies?.["@nuee/ui"], undefined);
    const { stdout } = await execFile(process.execPath, [cliPath, "list"]);
    const componentNames = stdout.trim().split("\n");
    await execFile(process.execPath, [
      cliPath,
      "add",
      ...componentNames,
      "--skip-dependencies",
      "--cwd",
      projectDirectory,
    ]);

    const componentFileNames = await readdir(join(projectDirectory, "src/components/ui"));
    await writeFile(
      join(projectDirectory, "src/main.tsx"),
      [
        'import "./index.css";',
        'import * as stylex from "@stylexjs/stylex";',
        'import { themeStyles } from "./styles/settings.stylex";',
        'import { typo, typographyVars, spacingRoleVars } from "./styles/semantic.stylex";',
        "const tokenUsage = stylex.create({ root: { fontSize: typo.fontSizeMd, gap: spacingRoleVars.fieldGap }, legacy: { fontSize: typographyVars.fontSizeMd } });",
        "console.log(stylex.props(tokenUsage.root), stylex.props(tokenUsage.legacy));",
        'document.documentElement.className = stylex.props(...themeStyles).className ?? "";',
        ...componentFileNames
          .filter((fileName) => fileName.endsWith(".tsx"))
          .map((fileName) => `import "./components/ui/${fileName.replace(/\.tsx$/, "")}";`),
        "",
      ].join("\n"),
    );

    const readme = await readFile(new URL("../../../README.md", import.meta.url), "utf8");
    const examples = [...readme.matchAll(/```tsx\n([\s\S]*?)```/g)];
    assert.ok(examples.length > 0, "README must contain a runnable TSX example.");
    const mainPath = join(projectDirectory, "src/main.tsx");
    let mainSource = await readFile(mainPath, "utf8");
    for (const [index, example] of examples.entries()) {
      await writeFile(join(projectDirectory, `src/readme-${index}.tsx`), example[1]);
      mainSource += `import * as Example${index} from "./readme-${index}";\nconsole.log(Example${index});\n`;
    }
    await writeFile(mainPath, mainSource);
    await writeFile(
      join(projectDirectory, "tsconfig.readme.json"),
      JSON.stringify({
        compilerOptions: {
          target: "ES2022",
          module: "ESNext",
          moduleResolution: "Bundler",
          jsx: "react-jsx",
          strict: true,
          skipLibCheck: true,
          noEmit: true,
          paths: { "@/*": ["./src/*"] },
        },
        include: ["src/readme-*.tsx"],
      }),
    );
    await execFile(process.execPath, [
      fileURLToPath(new URL("../node_modules/typescript/bin/tsc", import.meta.url)),
      "-p",
      join(projectDirectory, "tsconfig.readme.json"),
    ]);

    const viteConfig = await readFile(join(projectDirectory, "vite.config.ts"), "utf8");
    assert.ok(viteConfig.indexOf("stylex.vite") < viteConfig.indexOf("    react(),"));
    assert.match(
      await readFile(join(projectDirectory, "src/index.css"), "utf8"),
      /@import "\.\/styles\/reset\.css"/,
    );

    await build({ configFile: join(projectDirectory, "vite.config.ts"), root: projectDirectory });
    await access(join(projectDirectory, "dist/index.html"));
    const assetDirectory = join(projectDirectory, "dist/assets");
    const cssFiles = (await readdir(assetDirectory)).filter((file) => file.endsWith(".css"));
    const compiledCss = (
      await Promise.all(cssFiles.map((file) => readFile(join(assetDirectory, file), "utf8")))
    ).join("\n");
    assert.match(compiledCss, /--nuee-density:\s*0?\.875/);
    assert.match(compiledCss, /--nuee-font-body:\s*Arial/);
    assert.match(compiledCss, /prefers-reduced-motion/);
    assert.match(compiledCss, /data-nuee-motion/);
    assert.match(compiledCss, /--nuee-unit:\s*16px/);
    assert.match(compiledCss, /var\(--nuee-unit,\s*1rem\)/);
  } finally {
    await rm(projectDirectory, { recursive: true, force: true });
  }
});

test("@nuee/ui CLI keeps the UI package out of a generated Vite app", async () => {
  const projectDirectory = await mkdtemp(join(testDirectory, ".vite-app-"));

  try {
    await Promise.all([
      writeFile(
        join(projectDirectory, "package.json"),
        JSON.stringify({ name: "nuee-vite-app", private: true, type: "module" }),
      ),
      writeFile(
        join(projectDirectory, "tsconfig.json"),
        JSON.stringify({ compilerOptions: { paths: { "@/*": ["./src/*"] } } }),
      ),
      writeFile(
        join(projectDirectory, "vite.config.ts"),
        [
          'import { defineConfig } from "vite";',
          'import stylex from "@stylexjs/unplugin";',
          "",
          "export default defineConfig({",
          '  resolve: { alias: { "@": new URL("./src", import.meta.url).pathname } },',
          '  plugins: [stylex.vite({ aliases: { "@/styles/*": [new URL("./src/styles/*", import.meta.url).pathname] } })],',
          "});",
          "",
        ].join("\n"),
      ),
      writeFile(
        join(projectDirectory, "index.html"),
        '<div id="root"></div><script type="module" src="/src/main.tsx"></script>\n',
      ),
    ]);
    await mkdir(join(projectDirectory, "src"));
    await Promise.all([
      writeFile(join(projectDirectory, "src/index.css"), "body { margin: 0; }\n"),
      writeFile(
        join(projectDirectory, "src/main.tsx"),
        'import "./index.css";\nimport { Message } from "@/components/ui/message";\nvoid Message;\n',
      ),
    ]);

    await execFile(process.execPath, [
      cliPath,
      "init",
      "--defaults",
      "--vite",
      "--skip-dependencies",
      "--cwd",
      projectDirectory,
    ]);
    await execFile(process.execPath, [
      cliPath,
      "add",
      "message",
      "--skip-dependencies",
      "--cwd",
      projectDirectory,
    ]);

    const packageJson = JSON.parse(await readFile(join(projectDirectory, "package.json"), "utf8"));
    assert.equal(packageJson.dependencies?.["@nuee/ui"], undefined);
    assert.equal(packageJson.devDependencies?.["@nuee/ui"], undefined);
    await access(join(projectDirectory, "src/components/ui/message.tsx"));
    await build({ configFile: join(projectDirectory, "vite.config.ts"), root: projectDirectory });
    await access(join(projectDirectory, "dist/index.html"));
  } finally {
    await rm(projectDirectory, { recursive: true, force: true });
  }
});

test("@nuee/ui CLI initializes a project and adds a card", async () => {
  const projectDirectory = await mkdtemp(join(tmpdir(), "nuee-ui-cli-"));

  try {
    await writeFile(
      join(projectDirectory, "tsconfig.json"),
      JSON.stringify({ compilerOptions: { paths: { "@/*": ["./src/*"] } } }),
    );
    await execFile(process.execPath, [
      cliPath,
      "init",
      "--defaults",
      "--skip-dependencies",
      "--cwd",
      projectDirectory,
    ]);
    await execFile(process.execPath, [
      cliPath,
      "add",
      "card",
      "--cwd",
      projectDirectory,
      "--skip-dependencies",
    ]);

    const config = JSON.parse(await readFile(join(projectDirectory, "nuee.json"), "utf8"));
    assert.equal(config.aliases.ui, "@/components/ui");
    assert.equal(config.aliases.styles, "@/styles");
    await access(join(projectDirectory, "src/styles/semantic.stylex.ts"));
    assert.match(
      await readFile(join(projectDirectory, "src/components/ui/card.tsx"), "utf8"),
      /Card/,
    );
  } finally {
    await rm(projectDirectory, { recursive: true });
  }
});

test("published package keeps Base UI primitive escape hatches for documentation", async () => {
  const buttonSource = await readFile(
    fileURLToPath(new URL("../dist/button.js", import.meta.url)),
    "utf8",
  );
  assert.match(buttonSource, /react\/compiler-runtime/);

  const primitives = await import("../dist/primitives.js");
  assert.ok(primitives.Popover);
});

test("production StyleX CSS contains no invalid numeric declarations", async () => {
  const css = await readFile(new URL("../dist/stylex.css", import.meta.url), "utf8");
  assert.doesNotMatch(css, /:\s*[^;}]*\b(?:(?:NaN|Infinity)[a-z%]*|undefined\b)/);
});

test("published component entries preserve their source client boundaries", async () => {
  const sourceDirectory = new URL("../src/", import.meta.url);
  for (const name of await readdir(sourceDirectory)) {
    if (!name.endsWith(".tsx") && name !== "primitives.ts") continue;
    const source = await readFile(new URL(name, sourceDirectory), "utf8");
    const output = await readFile(
      new URL(`../dist/${name.replace(/\.tsx?$/, ".js")}`, import.meta.url),
      "utf8",
    );
    assert.equal(output.startsWith('"use client";'), source.startsWith('"use client";'), name);
  }
  const index = await readFile(new URL("../dist/index.js", import.meta.url), "utf8");
  assert.match(index, /from "\.\/button\.js"/);
  assert.doesNotMatch(index, /createContext\(/);
});

test("published display components execute in the React server environment", async () => {
  const cardUrl = new URL("../dist/card.js", import.meta.url).href;
  const { stdout } = await execFile(process.execPath, [
    "--conditions=react-server",
    "--input-type=module",
    "-e",
    `import { Card } from ${JSON.stringify(cardUrl)}; console.log(Card({ children: "Server card" }).type);`,
  ]);
  assert.equal(stdout.trim(), "div");
});

test("published controls generate server HTML without browser globals", async () => {
  const directory = fileURLToPath(new URL("../", import.meta.url));
  const { stdout } = await execFile(
    process.execPath,
    [
      "--input-type=module",
      "-e",
      `
    import { createElement } from "react";
    import { renderToString } from "react-dom/server";
    import { Button } from "./dist/button.js";
    import { Switch } from "./dist/switch.js";
    console.log(renderToString(createElement(Button, null, "Server action")));
    console.log(renderToString(createElement(Switch, { "aria-label": "Server switch" })));
  `,
    ],
    { cwd: directory },
  );
  assert.match(stdout, /Server action/);
  assert.match(stdout, /role="switch"/);
});
