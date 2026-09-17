"use client";

import { useLocaleSwitch } from "@/hooks/use-locale-switch";
import { locales, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Languages } from "lucide-react";
import { useTranslations } from "next-intl";

type LocaleSwitcherProps = Readonly<{ className?: string; compact?: boolean }>;

export function LocaleSwitcher({
  className,
  compact = false,
}: LocaleSwitcherProps) {
  const { locale, switchLocale } = useLocaleSwitch();
  const t = useTranslations("nav");
  const tA11y = useTranslations("a11y");

  return (
    <fieldset
      className={cn(
        "inline-flex shrink-0 items-center gap-1 rounded-full bg-white/80 p-1 shadow-sm ring-1 ring-blue-900/15",
        compact ? "h-9" : "h-10",
        className,
      )}
    >
      <legend className="sr-only">{tA11y("languageMenu")}</legend>
      <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-blue-900/8 text-blue-900">
        <Languages className="size-3.5" aria-hidden />
      </span>
      {locales.map((value: Locale) => {
        const active = value === locale;
        return (
          <button
            key={value}
            type="button"
            aria-pressed={active}
            onClick={() => switchLocale(value)}
            className={cn(
              "relative h-7 cursor-pointer rounded-full px-3 text-[11px] font-black tracking-wide uppercase transition-colors outline-none focus-visible:ring-2 focus-visible:ring-blue-900/60",
              active ? "text-white" : "text-blue-900/60 hover:text-blue-900",
            )}
          >
            {active ? (
              <motion.span
                layoutId="locale-pill"
                className="absolute inset-0 rounded-full bg-blue-900"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            ) : null}
            <span className="relative">{t(`locales.${value}`)}</span>
          </button>
        );
      })}
    </fieldset>
  );
}
