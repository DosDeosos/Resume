"use client";

import { Section } from "@/components/layout/section";
import { LottieIcon } from "@/components/lottie/lottie-icon";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { TiltCard } from "@/components/motion/tilt-card";
import { aboutItems } from "@/data/resume";
import { useTranslations } from "next-intl";

export function AboutSection() {
  const t = useTranslations("about");

  return (
    <Section id="about" title={t("title")}>
      <Stagger className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {aboutItems.map((item) => (
          <StaggerItem key={item.id}>
            <TiltCard className="card-stack card-stack-cyan h-full">
              <div className="flex h-full flex-col items-center justify-center gap-2 text-center">
                <LottieIcon src={item.icon} className="size-12.5 md:size-20" />
                <p className="whitespace-pre-line">{t(`items.${item.id}`)}</p>
              </div>
            </TiltCard>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
