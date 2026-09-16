"use client";

import { Button } from "@/components/ui/button";
import { useResumeSummary } from "@/hooks/use-resume-summary";
import { cn } from "@/lib/utils";
import { FileSpreadsheet, FileText, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

type Job = "pdf" | "xlsx" | null;

export function ExportButtons({ className }: Readonly<{ className?: string }>) {
  const t = useTranslations("showcase.export");
  const summary = useResumeSummary();
  const [job, setJob] = useState<Job>(null);

  async function run(kind: Exclude<Job, null>) {
    setJob(kind);
    try {
      if (kind === "pdf") {
        const { exportResumePdf } = await import("@/lib/exports/resume-pdf");
        await exportResumePdf(summary);
      } else {
        const { exportSkillsXlsx } = await import("@/lib/exports/skills-xlsx");
        await exportSkillsXlsx(summary);
      }
    } finally {
      setJob(null);
    }
  }

  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-center gap-3",
        className,
      )}
    >
      <Button type="button" onClick={() => run("pdf")} disabled={job !== null}>
        {job === "pdf" ? (
          <Loader2 className="animate-spin" aria-hidden />
        ) : (
          <FileText aria-hidden />
        )}
        {job === "pdf" ? t("working") : t("pdf")}
      </Button>
      <Button
        type="button"
        variant="secondary"
        onClick={() => run("xlsx")}
        disabled={job !== null}
      >
        {job === "xlsx" ? (
          <Loader2 className="animate-spin" aria-hidden />
        ) : (
          <FileSpreadsheet aria-hidden />
        )}
        {job === "xlsx" ? t("working") : t("xlsx")}
      </Button>
    </div>
  );
}
