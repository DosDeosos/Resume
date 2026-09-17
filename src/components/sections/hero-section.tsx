"use client";

import { LinkedinIcon } from "@/components/icons/brand-icons";
import { LottieIcon } from "@/components/lottie/lottie-icon";
import { Reveal } from "@/components/motion/reveal";
import { TiltCard } from "@/components/motion/tilt-card";
import { Typewriter } from "@/components/motion/typewriter";
import { lottie, profile } from "@/data/resume";
import { cn } from "@/lib/utils";
import { Tooltip } from "@heroui/react";
import { MapPin } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import type { ReactNode } from "react";

type ContactBubbleProps = Readonly<{
  href: string;
  label: string;
  external?: boolean;
  children: ReactNode;
  className?: string;
}>;

function ContactBubble({
  href,
  label,
  external = false,
  children,
  className,
}: ContactBubbleProps) {
  return (
    <Tooltip delay={200}>
      <Tooltip.Trigger>
        <a
          href={href}
          aria-label={label}
          target={external ? "_blank" : undefined}
          rel={external ? "noreferrer" : undefined}
          className={cn(
            "contact-bubble hover:-translate-y-1 hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-blue-900/60 focus-visible:outline-none",
            className,
          )}
        >
          {children}
        </a>
      </Tooltip.Trigger>
      <Tooltip.Content showArrow>{label}</Tooltip.Content>
    </Tooltip>
  );
}

export function HeroSection() {
  const t = useTranslations("hero");
  const tA11y = useTranslations("a11y");
  const bubbleIcon = "size-12.5 lg:size-15";

  return (
    <section
      id="hero"
      data-tour="hero"
      className="grid grid-cols-1 px-5 py-10 md:grid-cols-2"
    >
      <Reveal
        direction="right"
        className="ps-2 pt-5 text-left text-blue-900 md:pt-0 lg:ps-20"
      >
        <div className="flex flex-col justify-center">
          <div className="text-[20px]">{t("greeting")}</div>
          <h1 className="min-h-[1.4em] text-[25px] font-bold lg:text-[40px]">
            <Typewriter lines={[t("lines.name"), t("lines.role")]} />
          </h1>
          <p className="text-[16px] whitespace-pre-line text-cyan-950 lg:text-[20px]">
            {t("tagline")}
          </p>
          <div className="mt-6 grid w-fit grid-cols-3 gap-3">
            <ContactBubble
              href={`mailto:${profile.email}`}
              label={t("contacts.email")}
            >
              <LottieIcon src={lottie.mail} className={bubbleIcon} />
            </ContactBubble>
            <ContactBubble href={profile.phoneHref} label={t("contacts.phone")}>
              <LottieIcon src={lottie.phone} className={bubbleIcon} />
            </ContactBubble>
            <ContactBubble
              href={profile.lineHref}
              label={t("contacts.line")}
              external
              className="p-[17.5px]"
            >
              <LottieIcon src={lottie.line} className="size-7.5 lg:size-10" />
            </ContactBubble>
            <ContactBubble
              href={profile.githubHref}
              label={t("contacts.github")}
              external
            >
              <LottieIcon src={lottie.github} className={bubbleIcon} />
            </ContactBubble>
            <ContactBubble
              href={profile.linkedinHref}
              label={t("contacts.linkedin")}
              external
              className="size-16.5 text-[#0a66c2] lg:size-19"
            >
              <LinkedinIcon className="size-7 lg:size-8" />
            </ContactBubble>
            <ContactBubble
              href={profile.mapEmbedHref.replace("&output=embed", "")}
              label={`${t("contacts.address")}: ${t("addressValue")}`}
              external
              className="size-16.5 text-blue-900 lg:size-19"
            >
              <MapPin className="size-7 lg:size-8" aria-hidden />
            </ContactBubble>
          </div>
        </div>
      </Reveal>
      <Reveal
        direction="left"
        className="order-first flex justify-center md:order-2"
      >
        <TiltCard className="animate-bob rounded-full" maxTilt={6}>
          <Image
            src={profile.profileImage}
            alt={tA11y("profilePhoto")}
            width={450}
            height={450}
            priority
            className="aspect-square w-65 rounded-full object-cover shadow-xl md:w-90 lg:w-112.5"
          />
        </TiltCard>
      </Reveal>
    </section>
  );
}
