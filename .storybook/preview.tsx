import type { Preview } from "@storybook/react";
import { NextIntlClientProvider } from "next-intl";
import enMessages from "../messages/en.json";
import thMessages from "../messages/th.json";
import "../src/app/globals.css";

const messagesByLocale = {
  en: enMessages,
  th: thMessages,
} as const;

type StoryLocale = keyof typeof messagesByLocale;

const preview: Preview = {
  parameters: {
    layout: "centered",
    nextjs: { appDirectory: true },
    backgrounds: {
      default: "resume",
      values: [
        { name: "resume", value: "#f4f3f6" },
        { name: "white", value: "#ffffff" },
        { name: "space", value: "#0b1437" },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  globalTypes: {
    locale: {
      description: "Active locale for next-intl messages",
      defaultValue: "en",
      toolbar: {
        icon: "globe",
        items: [
          { value: "en", title: "English" },
          { value: "th", title: "ไทย" },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const locale = (context.globals.locale ?? "en") as StoryLocale;

      return (
        <NextIntlClientProvider
          locale={locale}
          messages={messagesByLocale[locale]}
          timeZone="Asia/Bangkok"
        >
          <div className="text-resume-ink font-sans">
            <Story />
          </div>
        </NextIntlClientProvider>
      );
    },
  ],
};

export default preview;
