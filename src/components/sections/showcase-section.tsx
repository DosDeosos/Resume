"use client";

import { Section } from "@/components/layout/section";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { TiltCard } from "@/components/motion/tilt-card";
import { ContactForm } from "@/components/showcase/contact-form";
import { ContactQr } from "@/components/showcase/contact-qr";
import { ExportButtons } from "@/components/showcase/export-buttons";
import { GithubActivity } from "@/components/showcase/github-activity";
import { LocationMap } from "@/components/showcase/location-map";
import { TourButton } from "@/components/showcase/resume-tour";
import { Button } from "@/components/ui/button";
import { storybookHref } from "@/lib/links";
import { cn } from "@/lib/utils";
import { BookOpen } from "lucide-react";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import type { ReactNode } from "react";

const ShaderPlane = dynamic(
  () =>
    import("@/components/three/shader-plane").then(
      (module) => module.ShaderPlane,
    ),
  {
    ssr: false,
    loading: () => (
      <div className="h-55 animate-pulse rounded-2xl bg-blue-900/10" />
    ),
  },
);

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
  const tNav = useTranslations("nav");
  const tA11y = useTranslations("a11y");

  return (
    <Section id="showcase" title={t("title")} subtitle={t("subtitle")}>
      <Stagger className="grid grid-cols-1 gap-8 md:grid-cols-2" stagger={0.07}>
        <DemoCard
          id="shader"
          tone="purple"
          title={t("cards.shader.title")}
          description={t("cards.shader.description")}
        >
          <ShaderPlane
            className="h-55 w-full overflow-hidden rounded-2xl"
            label={tA11y("decorativeScene")}
          />
        </DemoCard>
        <DemoCard
          id="form"
          tone="green"
          title={t("cards.form.title")}
          description={t("cards.form.description")}
        >
          <ContactForm />
        </DemoCard>
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
          tone="cyan"
          title={t("cards.map.title")}
          description={t("cards.map.description")}
        >
          <LocationMap title={t("cards.map.title")} />
        </DemoCard>
        <DemoCard
          id="storybook"
          tone="purple"
          title={t("cards.storybook.title")}
          description={t("cards.storybook.description")}
        >
          <Button asChild>
            <a href={storybookHref()} target="_blank" rel="noreferrer">
              <BookOpen aria-hidden />
              {t("cards.storybook.action")}
              <span className="sr-only">{tA11y("openLink")}</span>
            </a>
          </Button>
        </DemoCard>
        <DemoCard
          id="tour"
          tone="pink"
          title={t("cards.tour.title")}
          description={t("cards.tour.description")}
        >
          <TourButton label={t("cards.tour.action")} variant="secondary" />
          <span className="sr-only">{tNav("tour")}</span>
        </DemoCard>
      </Stagger>
    </Section>
  );
}
