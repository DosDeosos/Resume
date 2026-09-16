"use client";

import { Section } from "@/components/layout/section";
import { LottieIcon } from "@/components/lottie/lottie-icon";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { StackCategoryCard } from "@/components/sections/stack-category-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { lottie, stackCategories } from "@/data/resume";
import { LayoutGrid, Orbit, Radar } from "lucide-react";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";

const SkillOrbit = dynamic(
  () =>
    import("@/components/three/skill-orbit").then(
      (module) => module.SkillOrbit,
    ),
  {
    ssr: false,
    loading: () => (
      <div className="h-115 animate-pulse rounded-2xl bg-[#0b1437]/80" />
    ),
  },
);

const StackRadarChart = dynamic(
  () =>
    import("@/components/charts/stack-radar-chart").then(
      (module) => module.StackRadarChart,
    ),
  {
    ssr: false,
    loading: () => (
      <div className="h-115 animate-pulse rounded-2xl bg-blue-900/5" />
    ),
  },
);

export function StackSection() {
  const t = useTranslations("stack");
  const tA11y = useTranslations("a11y");

  return (
    <Section id="stack" title={t("title")} subtitle={t("subtitle")}>
      <Reveal className="flex justify-center">
        <LottieIcon src={lottie.computer} className="size-20 md:size-30" />
      </Reveal>
      <Tabs defaultValue="cards" className="mt-2">
        <TabsList>
          <TabsTrigger value="cards">
            <LayoutGrid aria-hidden />
            {t("tabs.cards")}
          </TabsTrigger>
          <TabsTrigger value="orbit">
            <Orbit aria-hidden />
            {t("tabs.orbit")}
          </TabsTrigger>
          <TabsTrigger value="radar">
            <Radar aria-hidden />
            {t("tabs.radar")}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="cards">
          <Stagger
            className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
            stagger={0.05}
          >
            {stackCategories.map((category) => (
              <StaggerItem key={category.id} className="h-full">
                <StackCategoryCard category={category} />
              </StaggerItem>
            ))}
          </Stagger>
        </TabsContent>
        <TabsContent value="orbit">
          <div className="card-stack card-stack-purple overflow-hidden p-0">
            <SkillOrbit
              className="h-115 w-full"
              label={tA11y("decorativeScene")}
            />
          </div>
          <p className="mt-3 text-center text-xs font-semibold text-blue-900/60">
            {t("orbitHint")}
          </p>
        </TabsContent>
        <TabsContent value="radar">
          <div className="card-stack card-stack-cyan">
            <StackRadarChart />
          </div>
        </TabsContent>
      </Tabs>
    </Section>
  );
}
