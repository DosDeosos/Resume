"use client";

import { ThreeCanvas } from "@/components/three/three-canvas";
import { orbitBadges } from "@/data/resume";
import { Float, Html, OrbitControls, Stars } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { useRef } from "react";
import type { Group } from "three";

type RingProps = Readonly<{
  badges: readonly string[];
  radius: number;
  tilt: number;
  speed: number;
  color: string;
}>;

function Ring({ badges, radius, tilt, speed, color }: RingProps) {
  const group = useRef<Group>(null);

  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * speed;
  });

  return (
    <group rotation={[tilt, 0, 0]}>
      <group ref={group}>
        {badges.map((label, index) => {
          const angle = (index / badges.length) * Math.PI * 2;
          return (
            <group
              key={label}
              position={[Math.cos(angle) * radius, 0, Math.sin(angle) * radius]}
            >
              <mesh>
                <sphereGeometry args={[0.09, 24, 24]} />
                <meshStandardMaterial
                  color={color}
                  emissive={color}
                  emissiveIntensity={2}
                  toneMapped={false}
                />
              </mesh>
              <Html
                center
                zIndexRange={[10, 0]}
                className="pointer-events-none select-none"
              >
                <span className="rounded-full bg-white/90 px-2 py-0.5 text-[11px] font-bold whitespace-nowrap text-blue-900 shadow-md">
                  {label}
                </span>
              </Html>
            </group>
          );
        })}
      </group>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius, 0.008, 8, 160]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.45}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

function Core() {
  const ref = useRef<Group>(null);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x += delta * 0.2;
    ref.current.rotation.y += delta * 0.3;
  });

  return (
    <Float speed={2} rotationIntensity={0.6} floatIntensity={0.8}>
      <group ref={ref}>
        <mesh>
          <icosahedronGeometry args={[0.9, 1]} />
          <meshStandardMaterial
            color="#87ddfe"
            emissive="#4cc3ff"
            emissiveIntensity={0.6}
            wireframe
          />
        </mesh>
        <mesh>
          <icosahedronGeometry args={[0.55, 0]} />
          <meshStandardMaterial
            color="#fa7ca6"
            emissive="#fa7ca6"
            emissiveIntensity={1.2}
            toneMapped={false}
          />
        </mesh>
      </group>
    </Float>
  );
}

const RING_COLORS = ["#87ddfe", "#dbb4ff", "#8cff81"] as const;

export function SkillOrbit({
  className,
  label,
}: Readonly<{ className?: string; label?: string }>) {
  const third = Math.ceil(orbitBadges.length / 3);
  const rings = [
    orbitBadges.slice(0, third),
    orbitBadges.slice(third, third * 2),
    orbitBadges.slice(third * 2),
  ];

  return (
    <ThreeCanvas
      className={className}
      label={label}
      camera={{ position: [0, 2.2, 7.5], fov: 45 }}
    >
      <color attach="background" args={["#0b1437"]} />
      <ambientLight intensity={0.6} />
      <pointLight position={[4, 6, 4]} intensity={40} color="#ffffff" />
      <Stars radius={40} depth={20} count={1200} factor={3} fade speed={0.6} />
      <Core />
      {rings.map((badges, index) => (
        <Ring
          key={RING_COLORS[index]}
          badges={badges}
          radius={2.4 + index * 0.9}
          tilt={[0.35, -0.55, 0.9][index]}
          speed={[0.25, -0.18, 0.14][index]}
          color={RING_COLORS[index]}
        />
      ))}
      <EffectComposer>
        <Bloom luminanceThreshold={0.9} intensity={0.9} mipmapBlur />
      </EffectComposer>
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </ThreeCanvas>
  );
}
