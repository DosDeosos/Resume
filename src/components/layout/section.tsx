import { Reveal } from "@/components/motion/reveal";
import type { SectionId } from "@/data/resume";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type SectionProps = Readonly<{
  id: SectionId;
  title?: string;
  subtitle?: string;
  label?: string;
  children: ReactNode;
  className?: string;
}>;

export function Section({
  id,
  title,
  subtitle,
  label,
  children,
  className,
}: SectionProps) {
  return (
    <section
      id={id}
      data-tour={id}
      aria-labelledby={title ? `${id}-title` : undefined}
      aria-label={title ? undefined : label}
      className={cn("scroll-mt-24 px-5 pt-10", className)}
    >
      {title ? (
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
      ) : null}
      <div className={cn(title && "mt-4")}>{children}</div>
    </section>
  );
}
