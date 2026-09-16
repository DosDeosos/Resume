import { LottieIcon } from "@/components/lottie/lottie-icon";
import { Counter } from "@/components/motion/counter";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { TiltCard } from "@/components/motion/tilt-card";
import { Typewriter } from "@/components/motion/typewriter";
import { lottie } from "@/data/resume";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Motion/Primitives",
  tags: ["autodocs"],
} satisfies Meta;

export default meta;

export const Tilt: StoryObj = {
  render: () => (
    <TiltCard className="card-stack card-stack-purple w-72 text-center">
      <p className="font-bold text-blue-900">Hover me</p>
      <p className="text-sm">Pointer-driven 3D tilt with a glare layer.</p>
    </TiltCard>
  ),
};

export const TypewriterLines: StoryObj = {
  render: () => (
    <h1 className="text-[32px] font-bold text-blue-900">
      <Typewriter
        lines={["I'm Vuttipat Srisumran", "A Full-Stack Developer"]}
      />
    </h1>
  ),
};

export const AnimatedCounter: StoryObj = {
  render: () => (
    <p className="text-3xl font-bold text-blue-900">
      <Counter value={31} render={(value) => `${value} months`} />
    </p>
  ),
};

export const StaggeredReveal: StoryObj = {
  render: () => (
    <Stagger className="grid w-160 grid-cols-3 gap-6">
      {(["cyan", "green", "purple", "pink", "cyan", "green"] as const).map(
        (tone, index) => (
          <StaggerItem key={index}>
            <div className={`card-stack card-stack-${tone} text-center`}>
              Card {index + 1}
            </div>
          </StaggerItem>
        ),
      )}
    </Stagger>
  ),
};

export const RevealDirections: StoryObj = {
  render: () => (
    <div className="flex gap-6">
      {(["up", "down", "left", "right"] as const).map((direction) => (
        <Reveal
          key={direction}
          direction={direction}
          once={false}
          className="card-stack card-stack-cyan w-32 text-center"
        >
          {direction}
        </Reveal>
      ))}
    </div>
  ),
};

export const LottieIcons: StoryObj = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      {Object.entries(lottie).map(([name, src]) => (
        <div
          key={name}
          className="flex flex-col items-center gap-1 text-xs font-semibold"
        >
          <LottieIcon src={src} className="size-16" />
          {name}
        </div>
      ))}
    </div>
  ),
};
