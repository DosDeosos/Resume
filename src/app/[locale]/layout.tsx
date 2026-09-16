import { AmbientBlobsBackground } from "@/components/background/ambient-blobs-background";
import { LocaleHtmlAttrs } from "@/components/i18n/locale-html-attrs";
import { WebVitalsReporter } from "@/components/seo/web-vitals-reporter";
import { profile } from "@/data/resume";
import { defaultLocale, isLocale, locales } from "@/i18n/routing";
import { QueryProvider } from "@/providers/query-provider";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

type LocaleLayoutProps = Readonly<{
  children: ReactNode;
  params: Promise<{ locale: string }>;
}>;

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: Omit<LocaleLayoutProps, "children">): Promise<Metadata> {
  const { locale } = await params;
  const activeLocale = isLocale(locale) ? locale : defaultLocale;
  const t = await getTranslations({
    locale: activeLocale,
    namespace: "metadata",
  });
  const origin = process.env.NEXT_PUBLIC_SITE_ORIGIN ?? "http://localhost:3000";

  return {
    metadataBase: new URL(origin),
    title: t("title"),
    description: t("description"),
    authors: [{ name: profile.name, url: profile.githubHref }],
    creator: profile.name,
    alternates: {
      canonical: `/${activeLocale}`,
      languages: Object.fromEntries(
        locales.map((value) => [value, `/${value}`]),
      ),
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      type: "profile",
      locale: activeLocale === "th" ? "th_TH" : "en_US",
      url: `/${activeLocale}`,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages({ locale });

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <LocaleHtmlAttrs locale={locale} />
      <WebVitalsReporter />
      <QueryProvider>
        <AmbientBlobsBackground />
        <div className="relative z-10">{children}</div>
      </QueryProvider>
    </NextIntlClientProvider>
  );
}
