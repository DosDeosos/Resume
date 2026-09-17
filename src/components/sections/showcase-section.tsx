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
  description: string;
  children: ReactNode;
  tone?: "cyan" | "green" | "purple" | "pink";
  className?: string;
}>;

function DemoCard({
  id,
  title,
  description,
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
          <h3 className="text-lg font-bold text-blue-900">{title}</h3>
          <p className="mb-3 text-sm font-normal text-cyan-950/80">
            {description}
          </p>
        </div>
        <div className="grow">{children}</div>
      </TiltCard>
    </StaggerItem>
  );
}

export function ShowcaseSection() {
  const t = useTranslations("showcase");

  return (
    <Section id="showcase" title={t("title")} subtitle={t("subtitle")}>
      <Stagger className="grid grid-cols-1 gap-8 md:grid-cols-2" stagger={0.07}>
        <DemoCard
          id="github"
          tone="cyan"
          title={t("cards.github.title")}
          description={t("cards.github.description")}
        >
          <GithubActivity />
        </DemoCard>
        <DemoCard
          id="export"
          tone="pink"
          title={t("cards.export.title")}
          description={t("cards.export.description")}
        >
          <ExportButtons className="h-full items-center" />
        </DemoCard>
        <DemoCard
          id="qr"
          tone="green"
          title={t("cards.qr.title")}
          description={t("cards.qr.description")}
        >
          <ContactQr />
        </DemoCard>
        <DemoCard
          id="map"
          tone="purple"
          title={t("cards.map.title")}
          description={t("cards.map.description")}
        >
          <LocationMap title={t("cards.map.title")} />
        </DemoCard>
      </Stagger>
    </Section>
  );
}
