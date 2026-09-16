import { Reveal } from "@/components/motion/reveal";
import type { SectionId } from "@/data/resume";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type SectionProps = Readonly<{
  id: SectionId;
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}>;

export function Section({
  id,
  title,
  subtitle,
  children,
  className,
}: SectionProps) {
  return (
    <section
      id={id}
      data-tour={id}
      aria-labelledby={`${id}-title`}
      className={cn("scroll-mt-24 px-5 pt-10", className)}
    >
      <Reveal direction="up" className="text-center">
        <h2 id={`${id}-title`} className="section-title">
          {title}
        </h2>
        {subtitle ? (
          <p className="mt-1 text-sm text-cyan-950/70 md:text-base">
            {subtitle}
          </p>
        ) : null}
      </Reveal>
      <div className="mt-4">{children}</div>
    </section>
  );
}
