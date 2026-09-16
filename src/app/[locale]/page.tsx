import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { AboutSection } from "@/components/sections/about-section";
import { ApplicationsSection } from "@/components/sections/applications-section";
import { EducationSection } from "@/components/sections/education-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { HeroSection } from "@/components/sections/hero-section";
import { ShowcaseSection } from "@/components/sections/showcase-section";
import { SoftSkillsSection } from "@/components/sections/soft-skills-section";
import { StackSection } from "@/components/sections/stack-section";
import { getTranslations, setRequestLocale } from "next-intl/server";

type ResumePageProps = Readonly<{ params: Promise<{ locale: string }> }>;

export default async function ResumePage({ params }: ResumePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tA11y = await getTranslations("a11y");

  return (
    <>
      <a
        href="#main"
        className="sr-only z-50 rounded-full bg-blue-900 px-4 py-2 text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        {tA11y("skipToContent")}
      </a>
      <SiteHeader />
      <main id="main" className="resume-container pb-7.5 text-center">
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <ApplicationsSection />
        <StackSection />
        <SoftSkillsSection />
        <EducationSection />
        <ShowcaseSection />
      </main>
      <SiteFooter />
    </>
  );
}
