import type { StorybookConfig } from "@storybook/nextjs";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(ts|tsx)"],
  addons: ["@storybook/addon-docs"],
  staticDirs: ["../public"],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  docs: {
    defaultName: "Docs",
  },
};

export default config;
