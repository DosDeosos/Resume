"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right" | "none";

type RevealProps = Readonly<{
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: Direction;
  once?: boolean;
}>;

const OFFSET = 28;
const EASE = [0.22, 1, 0.36, 1] as const;

const OFFSETS: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: OFFSET },
  down: { x: 0, y: -OFFSET },
  left: { x: OFFSET, y: 0 },
  right: { x: -OFFSET, y: 0 },
  none: { x: 0, y: 0 },
};

export function Reveal({
  children,
  className,
  delay = 0,
  direction = "up",
  once = true,
}: RevealProps) {
  const reducedMotion = useReducedMotion();
  const variants: Variants = {
    hidden: reducedMotion
      ? { opacity: 1 }
      : { opacity: 0, ...OFFSETS[direction] },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.6, ease: EASE, delay },
    },
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.2 }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}

type StaggerProps = Readonly<{
  children: ReactNode;
  className?: string;
  stagger?: number;
}>;

export function Stagger({ children, className, stagger = 0.08 }: StaggerProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      transition={{ staggerChildren: stagger }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: Readonly<{ children: ReactNode; className?: string }>) {
  const reducedMotion = useReducedMotion();
  const variants: Variants = {
    hidden: reducedMotion ? { opacity: 1 } : { opacity: 0, y: 24, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: EASE },
    },
  };

  return (
    <motion.div className={className} variants={variants}>
      {children}
    </motion.div>
  );
}
