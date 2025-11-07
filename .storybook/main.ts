import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  framework: {
    name: "@storybook/react-vite",
    options: {}
  },
  stories: [
    "../src/**/*.stories.@(js|jsx|ts|tsx)" // load all stories from /src
  ],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-a11y"
  ],
  core: {
    disableTelemetry: true
  },
  docs: {
    autodocs: "tag"
  },
  typescript: {
    reactDocgen: "react-docgen-typescript"
  }
};

export default config;
