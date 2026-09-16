"use client";

import { TiltCard } from "@/components/motion/tilt-card";
import type { StackCategoryId, stackCategories } from "@/data/resume";
import {
  Accessibility,
  ArrowDownRight,
  BarChart3,
  Boxes,
  Braces,
  ClipboardCheck,
  Cloud,
  Database,
  FileSpreadsheet,
  Globe2,
  Languages,
  Layers,
  Megaphone,
  Palette,
  Plug,
  Search,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";

const ICONS: Record<StackCategoryId, LucideIcon> = {
  languages: Braces,
  frameworks: Layers,
  stateData: Database,
  stylingUi: Palette,
  testing: ClipboardCheck,
  devops: Cloud,
  backendAuth: ShieldCheck,
  cms: Boxes,
  integrations: Plug,
  seo: Search,
  visualization: BarChart3,
  reporting: FileSpreadsheet,
  i18n: Languages,
  accessibility: Accessibility,
  marketing: Megaphone,
  maintainer: Globe2,
};

type StackCategoryCardProps = Readonly<{
  category: (typeof stackCategories)[number];
}>;

export function StackCategoryCard({ category }: StackCategoryCardProps) {
  const t = useTranslations("stack");
  const Icon = ICONS[category.id];

  return (
    <TiltCard
      className="card-stack card-stack-purple flex h-full flex-col text-left"
      maxTilt={8}
    >
      <div className="flex items-center gap-2">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-blue-900 text-white shadow">
          <Icon className="size-4" aria-hidden />
        </span>
        <h3 className="font-bold text-blue-900">
          {t(`categories.${category.id}`)}
        </h3>
      </div>
      <ul className="mt-2 flex grow flex-wrap gap-1.5">
        {category.items.map((item) => (
          <li
            key={item}
            className="rounded-full bg-white/80 px-2.5 py-0.5 text-xs font-semibold text-cyan-950 ring-1 ring-blue-900/10"
          >
            {item}
          </li>
        ))}
      </ul>
      <div className="mt-3 flex items-center justify-between">
        <div className="flex gap-1" aria-hidden>
          {Array.from({ length: 5 }, (_, index) => (
            <span
              key={index}
              className={`h-1.5 w-4 rounded-full ${index < category.level ? "bg-blue-900" : "bg-blue-900/15"}`}
            />
          ))}
        </div>
        {category.demo ? (
          <a
            href={`#showcase-${category.demo}`}
            className="inline-flex items-center gap-1 text-xs font-bold text-blue-900 underline-offset-2 hover:underline"
          >
            {t("seeDemo")}
            <ArrowDownRight className="size-3.5" aria-hidden />
          </a>
        ) : null}
      </div>
    </TiltCard>
  );
}
