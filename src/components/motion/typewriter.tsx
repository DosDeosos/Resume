"use client";

import { cn } from "@/lib/utils";
import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

type TypewriterProps = Readonly<{
  lines: readonly string[];
  className?: string;
  typingMs?: number;
  holdMs?: number;
}>;

export function Typewriter({
  lines,
  className,
  typingMs = 50,
  holdMs = 2000,
}: TypewriterProps) {
  const reducedMotion = useReducedMotion();
  const [lineIndex, setLineIndex] = useState(0);
  const [length, setLength] = useState(0);
  const current = lines[lineIndex] ?? "";

  useEffect(() => {
    if (reducedMotion) return;
    if (length < current.length) {
      const timer = window.setTimeout(
        () => setLength((value) => value + 1),
        typingMs,
      );
      return () => window.clearTimeout(timer);
    }
    const timer = window.setTimeout(() => {
      setLength(0);
      setLineIndex((value) => (value + 1) % lines.length);
    }, holdMs);
    return () => window.clearTimeout(timer);
  }, [current.length, holdMs, length, lines.length, reducedMotion, typingMs]);

  const text = reducedMotion ? lines[0] : current.slice(0, length);

  return (
    <span className={cn("inline-block", className)}>
      <span className="sr-only">{lines.join(". ")}</span>
      <span aria-hidden>{text}</span>
      <span
        aria-hidden
        className="animate-caret ml-0.5 inline-block h-[0.9em] w-0.75 bg-current align-middle"
      />
    </span>
  );
}
