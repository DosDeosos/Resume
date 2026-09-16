"use client";

import { LocaleSwitcher } from "@/components/i18n/locale-switcher";
import { TourButton } from "@/components/showcase/resume-tour";
import { Button } from "@/components/ui/button";
import { profile, sectionIds } from "@/data/resume";
import { storybookHref } from "@/lib/links";
import { motion, useScroll, useSpring } from "framer-motion";
import { BookOpen, FileDown } from "lucide-react";
import { useTranslations } from "next-intl";

export function SiteHeader() {
  const t = useTranslations("nav");
  const tA11y = useTranslations("a11y");
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.3,
  });

  return (
    <header className="glass-bar sticky top-0 z-40">
      <motion.div
        aria-hidden
        style={{ scaleX: progress }}
        className="from-resume-cyan via-resume-purple to-resume-pink absolute inset-x-0 top-0 h-0.5 origin-left bg-linear-to-r"
      />
      <div className="mx-auto flex w-[min(92vw,1200px)] flex-wrap items-center gap-2 py-2">
        <a
          href="#hero"
          className="mr-auto text-sm font-bold tracking-wide text-blue-900 uppercase md:text-base"
        >
          {profile.name}
        </a>
        <nav
          aria-label={tA11y("sectionNav")}
          className="hidden items-center gap-0.5 xl:flex"
        >
          {sectionIds
            .filter((id) => id !== "hero")
            .map((id) => (
              <a
                key={id}
                href={`#${id}`}
                className="rounded-full px-3 py-1.5 text-xs font-semibold text-blue-900/70 transition-colors hover:bg-blue-900/8 hover:text-blue-900"
              >
                {t(id)}
              </a>
            ))}
        </nav>
        <TourButton
          label={t("tour")}
          variant="ghost"
          size="sm"
          className="hidden sm:inline-flex"
        />
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="hidden sm:inline-flex"
        >
          <a href={storybookHref()} target="_blank" rel="noreferrer">
            <BookOpen aria-hidden />
            {t("storybook")}
          </a>
        </Button>
        <Button asChild variant="secondary" size="sm">
          <a href={profile.resumePdfHref} download>
            <FileDown aria-hidden />
            {t("downloadPdf")}
          </a>
        </Button>
        <LocaleSwitcher />
      </div>
    </header>
  );
}
