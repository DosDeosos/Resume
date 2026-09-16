"use client";

import { Section } from "@/components/layout/section";
import { Counter } from "@/components/motion/counter";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { TiltCard } from "@/components/motion/tilt-card";
import { experience } from "@/data/resume";
import { splitMonths, totalTenureMonths } from "@/lib/tenure";
import { Chip } from "@heroui/react";
import { motion, useReducedMotion } from "framer-motion";
import { Briefcase } from "lucide-react";
import { useFormatter, useTranslations } from "next-intl";
import dynamic from "next/dynamic";

const TenureChart = dynamic(
  () =>
    import("@/components/charts/tenure-chart").then(
      (module) => module.TenureChart,
    ),
  {
    ssr: false,
    loading: () => (
      <div className="h-55 animate-pulse rounded-xl bg-blue-900/5" />
    ),
  },
);

function TenureBadge() {
  const t = useTranslations("experience");
  const total = totalTenureMonths(experience);

  return (
    <Reveal className="mx-auto mt-2 w-fit rounded-full bg-blue-900 px-5 py-2 text-white shadow-lg">
      <span className="text-xs font-semibold tracking-wide uppercase opacity-80">
        {t("tenureLabel")}
      </span>
      <span className="ml-3 text-base font-bold">
        <Counter
          value={total}
          render={(value) =>
            t("tenureValue", splitMonths(value)).replace(/^,\s*/, "").trim()
          }
        />
      </span>
    </Reveal>
  );
}

function TimelineSpine() {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      aria-hidden
      className="from-resume-purple via-resume-cyan to-resume-green absolute top-2 bottom-2 left-3.75 w-1 origin-top rounded-full bg-linear-to-b md:left-1/2 md:-translate-x-1/2"
      initial={reducedMotion ? { scaleY: 1 } : { scaleY: 0 }}
      whileInView={{ scaleY: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
    />
  );
}

export function ExperienceSection() {
  const t = useTranslations("experience");
  const format = useFormatter();
  const period = (iso: string) =>
    format.dateTime(new Date(`${iso}T00:00:00Z`), {
      month: "short",
      year: "numeric",
      timeZone: "UTC",
    });

  return (
    <Section id="experience" title={t("title")}>
      <TenureBadge />
      <div className="relative mt-8">
        <TimelineSpine />
        <Stagger className="flex flex-col gap-8" stagger={0.15}>
          {experience.map((role, index) => (
            <StaggerItem
              key={role.id}
              className={`relative pl-12 md:w-1/2 md:pl-0 ${index % 2 === 0 ? "md:pr-10" : "md:ml-auto md:pl-10"}`}
            >
              <span
                aria-hidden
                style={{ backgroundColor: role.color }}
                className={`absolute top-6 left-1.75 flex size-5 items-center justify-center rounded-full ring-4 ring-white md:left-auto ${index % 2 === 0 ? "md:-right-2.5" : "md:-left-2.5"}`}
              >
                <Briefcase className="size-3 text-blue-900" />
              </span>
              <TiltCard
                className="card-stack card-stack-purple text-left"
                maxTilt={5}
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-lg font-bold text-blue-900">
                    {t(`roles.${role.id}.company`)}
                  </h3>
                  <Chip size="sm" color="accent" variant="soft">
                    <Chip.Label>
                      {period(role.start)} – {period(role.end)}
                    </Chip.Label>
                  </Chip>
                </div>
                <p className="font-semibold text-cyan-950">
                  {t(`roles.${role.id}.role`)}
                </p>
                <p className="mt-2 text-sm font-normal text-cyan-950/80">
                  {t(`roles.${role.id}.summary`)}
                </p>
                <p className="mt-2 text-xs font-semibold text-blue-900/70">
                  {t("split", {
                    frontend: role.frontend,
                    backend: role.backend,
                  })}
                </p>
              </TiltCard>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
      <Reveal className="card-stack card-stack-cyan mx-auto mt-10 max-w-3xl">
        <TenureChart />
      </Reveal>
    </Section>
  );
}
