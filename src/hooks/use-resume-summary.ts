"use client";

import {
  applications,
  education,
  experience,
  profile,
  softSkillIds,
  stackCategories,
} from "@/data/resume";
import type { ResumeSummary } from "@/lib/exports/resume-summary";
import { useFormatter, useTranslations } from "next-intl";
import { useMemo } from "react";

export function useResumeSummary(): ResumeSummary {
  const tMeta = useTranslations("metadata");
  const tHero = useTranslations("hero");
  const tExperience = useTranslations("experience");
  const tApps = useTranslations("apps");
  const tStack = useTranslations("stack");
  const tSoft = useTranslations("softSkills");
  const tEducation = useTranslations("education");
  const tExport = useTranslations("showcase.export");
  const format = useFormatter();

  return useMemo(() => {
    const period = (iso: string) =>
      format.dateTime(new Date(`${iso}T00:00:00Z`), {
        month: "short",
        year: "numeric",
        timeZone: "UTC",
      });

    return {
      title: tExport("pdfTitle"),
      name: profile.name,
      headline: tHero("lines.role"),
      contacts: [
        profile.email,
        profile.phoneDisplay,
        profile.githubHref,
        profile.linkedinHref,
        tHero("addressValue"),
      ],
      sections: {
        experience: tExperience("title"),
        applications: tApps("title"),
        stack: tStack("title"),
        softSkills: tSoft("title"),
        education: tEducation("title"),
      },
      roles: experience.map((role) => ({
        company: tExperience(`roles.${role.id}.company`),
        role: tExperience(`roles.${role.id}.role`),
        period: `${period(role.start)} – ${period(role.end)}`,
        summary: tExperience(`roles.${role.id}.summary`),
      })),
      apps: applications.map((app) => ({
        name: tApps(`items.${app.id}.name`),
        kind: tApps(`items.${app.id}.kind`),
        href: app.href,
      })),
      categories: stackCategories.map((category) => ({
        label: tStack(`categories.${category.id}`),
        level: category.level,
        items: category.items,
      })),
      softSkills: softSkillIds.map((id) => tSoft(`items.${id}`)),
      education: [
        tEducation("degreeLabel", { degree: tEducation("degree") }),
        tEducation("facultyLabel", { faculty: tEducation("faculty") }),
        `${tEducation("startYear", { year: education.startYear })} · ${tEducation("endYear", { year: education.endYear })}`,
      ],
      columns: {
        category: tExport("columns.category"),
        level: tExport("columns.level"),
        tools: tExport("columns.tools"),
      },
      sheetName: tExport("sheetName"),
      description: tMeta("description"),
    };
  }, [
    format,
    tApps,
    tEducation,
    tExperience,
    tExport,
    tHero,
    tMeta,
    tSoft,
    tStack,
  ]);
}
