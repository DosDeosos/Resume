"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type CounterProps = Readonly<{
  value: number;
  durationMs?: number;
  render: (value: number) => string;
}>;

export function Counter({ value, durationMs = 1400, render }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reducedMotion = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView || reducedMotion) return;
    const controls = animate(0, value, {
      duration: durationMs / 1000,
      ease: "easeOut",
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });
    return () => controls.stop();
  }, [durationMs, inView, reducedMotion, value]);

  const shown = reducedMotion ? value : display;

  return <span ref={ref}>{render(shown)}</span>;
}
