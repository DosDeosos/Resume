"use client";

import { cn } from "@/lib/utils";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef, type PointerEvent, type ReactNode } from "react";

type TiltCardProps = Readonly<{
  children: ReactNode;
  className?: string;
  maxTilt?: number;
  glare?: boolean;
}>;

const SPRING = { stiffness: 200, damping: 20 };

export function TiltCard({
  children,
  className,
  maxTilt = 10,
  glare = true,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const pointerX = useMotionValue(0.5);
  const pointerY = useMotionValue(0.5);
  const rotateX = useSpring(
    useTransform(pointerY, [0, 1], [maxTilt, -maxTilt]),
    SPRING,
  );
  const rotateY = useSpring(
    useTransform(pointerX, [0, 1], [-maxTilt, maxTilt]),
    SPRING,
  );
  const glareX = useTransform(pointerX, [0, 1], ["0%", "100%"]);
  const glareY = useTransform(pointerY, [0, 1], ["0%", "100%"]);
  const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.45), transparent 60%)`;

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    if (reducedMotion || !ref.current) return;
    const bounds = ref.current.getBoundingClientRect();
    pointerX.set((event.clientX - bounds.left) / bounds.width);
    pointerY.set((event.clientY - bounds.top) / bounds.height);
  }

  function onPointerLeave() {
    pointerX.set(0.5);
    pointerY.set(0.5);
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        transformPerspective: 900,
      }}
      whileHover={reducedMotion ? undefined : { scale: 1.02 }}
      className={cn("group relative will-change-transform", className)}
    >
      {children}
      {glare && !reducedMotion ? (
        <motion.div
          aria-hidden
          style={{ background: glareBackground }}
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
      ) : null}
    </motion.div>
  );
}
