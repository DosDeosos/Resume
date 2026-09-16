"use client";

import { Section } from "@/components/layout/section";
import { LottieIcon } from "@/components/lottie/lottie-icon";
import { Reveal } from "@/components/motion/reveal";
import { TiltCard } from "@/components/motion/tilt-card";
import { education, lottie } from "@/data/resume";
import { useTranslations } from "next-intl";

export function EducationSection() {
  const t = useTranslations("education");

  return (
    <Section id="education" title={t("title")}>
      <Reveal className="flex justify-center">
        <TiltCard className="card-stack card-stack-green w-fit" maxTilt={5}>
          <div className="flex flex-col items-center gap-2 md:flex-row md:gap-6">
            <LottieIcon
              src={lottie.airplane}
              className="size-12.5 md:size-20"
            />
            <div className="w-fit text-left">
              <div className="flex items-center gap-2">
                <LottieIcon
                  src={lottie.calendar}
                  className="size-10 md:size-12.5"
                />
                <p>
                  {t("startYear", { year: education.startYear })}
                  <br />
                  {t("endYear", { year: education.endYear })}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <LottieIcon
                  src={lottie.degreeCap}
                  className="size-10 md:size-12.5"
                />
                <p>
                  {t("degreeLabel", { degree: t("degree") })}
                  <br />
                  {t("facultyLabel", { faculty: t("faculty") })}
                </p>
              </div>
            </div>
          </div>
        </TiltCard>
      </Reveal>
    </Section>
  );
}
