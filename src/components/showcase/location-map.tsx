"use client";

import { profile } from "@/data/resume";
import { cn } from "@/lib/utils";
import { useInView } from "framer-motion";
import { useRef } from "react";

export function LocationMap({
  className,
  title,
}: Readonly<{ className?: string; title: string }>) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "200px" });

  return (
    <div
      ref={ref}
      className={cn(
        "overflow-hidden rounded-2xl ring-1 ring-blue-900/10",
        className,
      )}
    >
      {inView ? (
        <iframe
          title={title}
          src={profile.mapEmbedHref}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
          className="h-55 w-full border-0"
        />
      ) : (
        <div className="h-55 w-full animate-pulse bg-blue-900/5" />
      )}
    </div>
  );
}
