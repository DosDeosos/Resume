"use client";

import { LocaleSwitcher } from "@/components/i18n/locale-switcher";
import { TourButton } from "@/components/showcase/resume-tour";
import { Button } from "@/components/ui/button";
import { profile, type SectionId } from "@/data/resume";
import { motion, useScroll, useSpring } from "framer-motion";
import { FileDown } from "lucide-react";
import { useTranslations } from "next-intl";

const NAV_SECTIONS: readonly SectionId[] = [
  "about",
  "experience",
  "stack",
  "showcase",
];

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
      <div className="mx-auto flex h-14 w-[min(92vw,1200px)] items-center gap-2 whitespace-nowrap">
        <a
          href="#hero"
          className="mr-auto shrink-0 text-sm font-bold tracking-wide text-blue-900 uppercase"
        >
          {profile.name}
        </a>
        <nav
          aria-label={tA11y("sectionNav")}
          className="hidden items-center gap-0.5 md:flex"
        >
          {NAV_SECTIONS.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              className="rounded-full px-2.5 py-1.5 text-xs font-semibold text-blue-900/70 transition-colors hover:bg-blue-900/8 hover:text-blue-900"
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
        <Button asChild variant="secondary" size="sm">
          <a href={profile.resumePdfHref} download>
            <FileDown aria-hidden />
            <span className="hidden sm:inline">{t("downloadPdf")}</span>
            <span className="sm:hidden">PDF</span>
          </a>
        </Button>
        <LocaleSwitcher compact />
      </div>
    </header>
  );
}
