import { AmbientBlobsCanvas } from "@/components/background/ambient-blobs-canvas";
import { ShaderPlane } from "@/components/three/shader-plane";
import { SkillOrbit } from "@/components/three/skill-orbit";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "3D Toolbox/Scenes",
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
} satisfies Meta;

export default meta;

export const AmbientBlobs: StoryObj = {
  render: () => (
    <div className="bg-resume-bg relative h-[70vh] w-full">
      <div className="absolute inset-0 mix-blend-multiply">
        <AmbientBlobsCanvas className="size-full" />
      </div>
      <div className="resume-container relative flex h-[40vh] items-center justify-center">
        <p className="section-title">Ambient blobs</p>
      </div>
    </div>
  ),
};

export const Orbit: StoryObj = {
  render: () => <SkillOrbit className="h-[70vh] w-full" label="Skill orbit" />,
};

export const Shader: StoryObj = {
  render: () => (
    <ShaderPlane className="h-[70vh] w-full" label="WebGL noise shader" />
  ),
};
