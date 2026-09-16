"use client";

import { cn } from "@/lib/utils";
import { DotLottieReact, setWasmUrl } from "@lottiefiles/dotlottie-react";
import { useReducedMotion } from "framer-motion";

setWasmUrl("/dotlottie-player.wasm");

type LottieIconProps = Readonly<{
  src: string;
  className?: string;
  loop?: boolean;
}>;

export function LottieIcon({ src, className, loop = true }: LottieIconProps) {
  const reducedMotion = useReducedMotion();

  return (
    <div className={cn("shrink-0", className)} aria-hidden>
      <DotLottieReact
        src={src}
        autoplay={!reducedMotion}
        loop={loop && !reducedMotion}
      />
    </div>
  );
}
