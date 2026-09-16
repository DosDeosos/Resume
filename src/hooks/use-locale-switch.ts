"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { useCallback } from "react";

export function useLocaleSwitch() {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();

  const switchLocale = useCallback(
    (nextLocale: Locale) => {
      if (nextLocale === locale) return;
      router.replace(pathname, { locale: nextLocale, scroll: false });
    },
    [locale, pathname, router],
  );

  return { switchLocale, locale };
}
