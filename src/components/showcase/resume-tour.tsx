"use client";

import { Button } from "@/components/ui/button";
import { driver } from "driver.js";
import { Compass } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCallback, type ComponentProps } from "react";

const TOUR_SECTIONS = [
  "hero",
  "about",
  "experience",
  "applications",
  "stack",
  "showcase",
] as const;

export function useResumeTour() {
  const t = useTranslations("showcase.tour");

  return useCallback(() => {
    const instance = driver({
      showProgress: true,
      animate: true,
      overlayOpacity: 0.55,
      stagePadding: 8,
      stageRadius: 12,
      nextBtnText: t("next"),
      prevBtnText: t("previous"),
      doneBtnText: t("done"),
      progressText: t("progress", {
        current: "{{current}}",
        total: "{{total}}",
      }),
      steps: TOUR_SECTIONS.map((id) => ({
        element: `[data-tour="${id}"]`,
        popover: {
          title: t(`steps.${id}.title`),
          description: t(`steps.${id}.description`),
          side: "top",
          align: "center",
        },
      })),
    });
    instance.drive();
  }, [t]);
}

type TourButtonProps = Readonly<
  Omit<ComponentProps<typeof Button>, "onClick" | "children"> & {
    label: string;
  }
>;

export function TourButton({ label, ...props }: TourButtonProps) {
  const startTour = useResumeTour();

  return (
    <Button type="button" onClick={startTour} {...props}>
      <Compass aria-hidden />
      {label}
    </Button>
  );
}
