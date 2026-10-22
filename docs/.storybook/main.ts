import type { StorybookConfig } from "@storybook/react-vite";
import stylex from "@stylexjs/unplugin/vite";
import reactCompiler from "babel-plugin-react-compiler";
import remarkGfm from "remark-gfm";

type StylexCompilerOptions = NonNullable<Parameters<typeof stylex>[0]> & {
  babelConfig: { plugins: [typeof reactCompiler] };
};

const stylexCompilerOptions: StylexCompilerOptions = {
  babelConfig: { plugins: [reactCompiler] },
  useCSSLayers: true,
};

const config: StorybookConfig = {
  // Keep axe checks available for every rendered story.
  addons: [
    "@storybook/addon-a11y",
    {
      name: "@storybook/addon-docs",
      options: { mdxPluginOptions: { mdxCompileOptions: { remarkPlugins: [remarkGfm] } } },
    },
  ],
  staticDirs: ["../public"],
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(ts|tsx)"],
  framework: "@storybook/react-vite",
  async viteFinal(config) {
    return {
      ...config,
      plugins: [stylex(stylexCompilerOptions), ...(config.plugins ?? [])],
    };
  },
};

export default config;
