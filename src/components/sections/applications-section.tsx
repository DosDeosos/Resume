"use client";

import { Section } from "@/components/layout/section";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { TiltCard } from "@/components/motion/tilt-card";
import { Button } from "@/components/ui/button";
import { applications } from "@/data/resume";
import { Chip } from "@heroui/react";
import { ExternalLink, Lock } from "lucide-react";
import { useTranslations } from "next-intl";

export function ApplicationsSection() {
  const t = useTranslations("apps");
  const tExperience = useTranslations("experience");
  const tA11y = useTranslations("a11y");

  return (
    <Section id="applications" title={t("title")}>
      <Stagger className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {applications.map((app) => (
          <StaggerItem key={app.id} className="h-full">
            <TiltCard className="card-stack card-stack-cyan flex h-full flex-col text-left">
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-lg font-bold text-blue-900">
                  {t(`items.${app.id}.name`)}
                </h3>
                <Chip
                  size="sm"
                  color={app.href ? "success" : "default"}
                  variant="soft"
                >
                  <Chip.Label>
                    {tExperience(`roles.${app.employer}.company`)}
                  </Chip.Label>
                </Chip>
              </div>
              <p className="text-sm font-semibold text-cyan-950">
                {t(`items.${app.id}.kind`)}
              </p>
              <p className="mt-2 grow text-sm font-normal text-cyan-950/80">
                {t(`items.${app.id}.description`)}
              </p>
              <div className="mt-4">
                {app.href ? (
                  <Button asChild size="sm" variant="outline">
                    <a href={app.href} target="_blank" rel="noreferrer">
                      <ExternalLink aria-hidden />
                      {t("visit")}
                      <span className="sr-only">{tA11y("openLink")}</span>
                    </a>
                  </Button>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-900/60">
                    <Lock className="size-3.5" aria-hidden />
                    {t("private")}
                  </span>
                )}
              </div>
            </TiltCard>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
