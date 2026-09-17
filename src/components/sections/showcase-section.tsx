"use client";

import { Section } from "@/components/layout/section";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { TiltCard } from "@/components/motion/tilt-card";
import { ContactQr } from "@/components/showcase/contact-qr";
import { ExportButtons } from "@/components/showcase/export-buttons";
import { GithubActivity } from "@/components/showcase/github-activity";
import { LocationMap } from "@/components/showcase/location-map";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import type { ReactNode } from "react";

type DemoCardProps = Readonly<{
  id: string;
  title: string;
  children: ReactNode;
  tone?: "cyan" | "green" | "purple" | "pink";
  className?: string;
}>;

function DemoCard({
  id,
  title,
  children,
  tone = "cyan",
  className,
}: DemoCardProps) {
  return (
    <StaggerItem className={cn("h-full", className)}>
      <TiltCard
        className={cn(
          "card-stack flex h-full scroll-mt-24 flex-col text-left",
          `card-stack-${tone}`,
        )}
        maxTilt={4}
        glare={false}
      >
        <div id={`showcase-${id}`} className="scroll-mt-28">
          <h3 className="mb-3 text-lg font-bold text-blue-900">{title}</h3>
        </div>
        <div className="grow">{children}</div>
      </TiltCard>
    </StaggerItem>
  );
}

export function ShowcaseSection() {
  const t = useTranslations("showcase");
  const tNav = useTranslations("nav");

  return (
    <Section id="showcase" label={tNav("showcase")}>
      <Stagger className="grid grid-cols-1 gap-8 md:grid-cols-2" stagger={0.07}>
        <DemoCard id="github" tone="cyan" title={t("cards.github.title")}>
          <GithubActivity />
        </DemoCard>
        <DemoCard id="export" tone="pink" title={t("cards.export.title")}>
          <ExportButtons className="h-full items-center" />
        </DemoCard>
        <DemoCard id="qr" tone="green" title={t("cards.qr.title")}>
          <ContactQr />
        </DemoCard>
        <DemoCard id="map" tone="purple" title={t("cards.map.title")}>
          <LocationMap title={t("cards.map.title")} />
        </DemoCard>
      </Stagger>
    </Section>
  );
}
