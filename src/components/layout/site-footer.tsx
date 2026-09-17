import { GithubIcon } from "@/components/icons/brand-icons";
import { profile } from "@/data/resume";
import { useTranslations } from "next-intl";

export function SiteFooter() {
  const t = useTranslations("footer");

  return (
    <footer className="mx-auto w-[min(92vw,1200px)] pb-10 text-center text-xs font-medium text-blue-900/70">
      <a
        href={`${profile.githubHref}/Resume`}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-1.5 font-bold text-blue-900 underline-offset-2 hover:underline"
      >
        <GithubIcon className="size-3.5" />
        {t("source")}
      </a>
    </footer>
  );
}
