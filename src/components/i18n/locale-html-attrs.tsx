"use client";

import type { Locale } from "@/i18n/routing";
import { useEffect } from "react";

export function LocaleHtmlAttrs({ locale }: Readonly<{ locale: Locale }>) {
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dataset.locale = locale;
  }, [locale]);

  return null;
}
