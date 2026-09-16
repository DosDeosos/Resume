"use client";

import { Button } from "@/components/ui/button";
import { profile } from "@/data/resume";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { GitFork, RefreshCw, Star } from "lucide-react";
import { useFormatter, useNow, useTranslations } from "next-intl";
import { z } from "zod";

const repoSchema = z.object({
  id: z.number(),
  name: z.string(),
  html_url: z.url(),
  description: z.string().nullable(),
  language: z.string().nullable(),
  stargazers_count: z.number(),
  forks_count: z.number(),
  pushed_at: z.string(),
});

type Repo = z.infer<typeof repoSchema>;

async function fetchRepos(): Promise<Repo[]> {
  const url = `https://api.github.com/users/${profile.githubUser}/repos?sort=pushed&per_page=6`;
  const response = await fetch(url, {
    headers: { Accept: "application/vnd.github+json" },
  });
  if (!response.ok) throw new Error(`GitHub responded ${response.status}`);
  return z.array(repoSchema).parse(await response.json());
}

function RepoSkeleton() {
  return (
    <ul className="grid gap-2" aria-hidden>
      {Array.from({ length: 4 }, (_, index) => (
        <li
          key={index}
          className="h-14 animate-pulse rounded-xl bg-blue-900/5"
        />
      ))}
    </ul>
  );
}

export function GithubActivity({
  className,
}: Readonly<{ className?: string }>) {
  const t = useTranslations("showcase.github");
  const format = useFormatter();
  const now = useNow();
  const { data, isPending, isError, refetch, isFetching } = useQuery({
    queryKey: ["github", "repos", profile.githubUser],
    queryFn: fetchRepos,
  });

  if (isPending) {
    return (
      <div className={className}>
        <p className="sr-only" role="status">
          {t("loading")}
        </p>
        <RepoSkeleton />
      </div>
    );
  }

  if (isError) {
    return (
      <div className={cn("flex flex-col items-start gap-2", className)}>
        <p role="alert" className="text-sm font-semibold text-red-600">
          {t("error")}
        </p>
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={() => refetch()}
          disabled={isFetching}
        >
          <RefreshCw
            aria-hidden
            className={isFetching ? "animate-spin" : undefined}
          />
          {t("retry")}
        </Button>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <p className={cn("text-sm text-cyan-950/70", className)}>{t("empty")}</p>
    );
  }

  return (
    <ul className={cn("grid gap-2 text-left", className)}>
      {data.map((repo, index) => (
        <motion.li
          key={repo.id}
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.06, duration: 0.35 }}
        >
          <a
            href={repo.html_url}
            target="_blank"
            rel="noreferrer"
            className="block rounded-xl bg-white/80 px-3 py-2 ring-1 ring-blue-900/10 transition-colors hover:bg-white"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="truncate text-sm font-bold text-blue-900">
                {repo.name}
              </span>
              <span className="flex shrink-0 items-center gap-2 text-[11px] font-semibold text-cyan-950/70">
                <span className="inline-flex items-center gap-0.5">
                  <Star className="size-3" aria-hidden />
                  <span className="sr-only">
                    {t("stars", { count: repo.stargazers_count })}
                  </span>
                  <span aria-hidden>{repo.stargazers_count}</span>
                </span>
                <span className="inline-flex items-center gap-0.5">
                  <GitFork className="size-3" aria-hidden />
                  {repo.forks_count}
                </span>
              </span>
            </div>
            <p className="truncate text-xs text-cyan-950/70">
              {repo.language ? (
                <span className="mr-1 font-semibold">{repo.language} ·</span>
              ) : null}
              {repo.description ??
                t("updated", {
                  date: format.relativeTime(new Date(repo.pushed_at), now),
                })}
            </p>
          </a>
        </motion.li>
      ))}
    </ul>
  );
}
