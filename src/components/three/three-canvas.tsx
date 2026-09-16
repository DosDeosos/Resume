"use client";

import { cn } from "@/lib/utils";
import { Canvas, type CanvasProps } from "@react-three/fiber";
import { useInView, useReducedMotion } from "framer-motion";
import { useRef, type ReactNode } from "react";

type ThreeCanvasProps = Readonly<{
  children: ReactNode;
  className?: string;
  label?: string;
  camera?: CanvasProps["camera"];
  orthographic?: boolean;
  alwaysAnimate?: boolean;
}>;

export function ThreeCanvas({
  children,
  className,
  label,
  camera,
  orthographic = false,
  alwaysAnimate = false,
}: ThreeCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { amount: 0.05 });
  const reducedMotion = useReducedMotion();
  const animate = alwaysAnimate || (inView && !reducedMotion);

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      {label ? <span className="sr-only">{label}</span> : null}
      <Canvas
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        camera={camera}
        orthographic={orthographic}
        frameloop={animate ? "always" : "demand"}
        className="size-full"
      >
        {children}
      </Canvas>
    </div>
  );
}
