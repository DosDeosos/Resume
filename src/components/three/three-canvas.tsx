"use client";

import { cn } from "@/lib/utils";
import {
  Canvas,
  events as createPointerEvents,
  type CanvasProps,
  type EventManager,
  type RootStore,
} from "@react-three/fiber";
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

function detachSafeEvents(store: RootStore): EventManager<HTMLElement> {
  const manager = createPointerEvents(store);
  return {
    ...manager,
    connect: (target: HTMLElement | null) => {
      if (target) manager.connect?.(target);
    },
  };
}

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
        events={detachSafeEvents}
        className="size-full"
      >
        {children}
      </Canvas>
    </div>
  );
}
