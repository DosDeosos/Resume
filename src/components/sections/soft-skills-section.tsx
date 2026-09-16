"use client";

import { Section } from "@/components/layout/section";
import { LottieIcon } from "@/components/lottie/lottie-icon";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { TiltCard } from "@/components/motion/tilt-card";
import { lottie, softSkillIds } from "@/data/resume";
import { Heart } from "lucide-react";
import { useTranslations } from "next-intl";

export function SoftSkillsSection() {
  const t = useTranslations("softSkills");

  return (
    <Section id="softSkills" title={t("title")}>
      <Reveal>
        <TiltCard
          className="card-stack card-stack-pink mx-auto max-w-4xl"
          maxTilt={4}
        >
          <div className="flex justify-center">
            <LottieIcon src={lottie.hands} className="size-20 md:size-30" />
          </div>
          <Stagger
            className="grid grid-cols-1 gap-3 text-left sm:grid-cols-2"
            stagger={0.06}
          >
            {softSkillIds.map((id) => (
              <StaggerItem key={id}>
                <div className="ring-resume-pink/60 flex items-center gap-3 rounded-xl bg-white/70 px-3 py-2 ring-1 transition-colors hover:bg-white">
                  <span className="bg-resume-pink flex size-8 shrink-0 items-center justify-center rounded-full text-blue-900">
                    <Heart className="size-4" aria-hidden />
                  </span>
                  <span className="text-sm font-semibold text-cyan-950 md:text-base">
                    {t(`items.${id}`)}
                  </span>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </TiltCard>
      </Reveal>
    </Section>
  );
}
