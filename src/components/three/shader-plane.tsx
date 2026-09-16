"use client";

import { ThreeCanvas } from "@/components/three/three-canvas";
import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { Color, type ShaderMaterial, Vector2 } from "three";

const VERTEX_SHADER = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const FRAGMENT_SHADER = `
precision highp float;
uniform float uTime;
uniform vec2 uPointer;
uniform vec3 uColorA;
uniform vec3 uColorB;
uniform vec3 uColorC;
varying vec2 vUv;

vec2 hash(vec2 p) {
  p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
  return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(dot(hash(i), f), dot(hash(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)), u.x),
    mix(dot(hash(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)), dot(hash(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float value = 0.0;
  float amplitude = 0.5;
  for (int i = 0; i < 5; i++) {
    value += amplitude * noise(p);
    p *= 2.02;
    amplitude *= 0.5;
  }
  return value;
}

void main() {
  vec2 uv = vUv;
  float t = uTime * 0.15;
  vec2 q = vec2(fbm(uv * 3.0 + t), fbm(uv * 3.0 - t));
  vec2 r = vec2(fbm(uv * 3.0 + q * 1.8 + vec2(1.7, 9.2) + t), fbm(uv * 3.0 + q * 1.8 + vec2(8.3, 2.8) - t));
  float f = fbm(uv * 3.0 + r * 1.6);
  float glow = smoothstep(0.35, 0.0, distance(uv, uPointer));
  vec3 color = mix(uColorA, uColorB, clamp(f * 2.2, 0.0, 1.0));
  color = mix(color, uColorC, clamp(length(q), 0.0, 1.0));
  color += glow * 0.35;
  gl_FragColor = vec4(color, 1.0);
}
`;

function NoisePlane() {
  const material = useRef<ShaderMaterial>(null);
  const { viewport, pointer } = useThree();
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPointer: { value: new Vector2(0.5, 0.5) },
      uColorA: { value: new Color("#87ddfe") },
      uColorB: { value: new Color("#dbb4ff") },
      uColorC: { value: new Color("#fa7ca6") },
    }),
    [],
  );

  useFrame(({ clock }) => {
    if (!material.current) return;
    material.current.uniforms.uTime.value = clock.getElapsedTime();
    material.current.uniforms.uPointer.value.set(
      (pointer.x + 1) / 2,
      (pointer.y + 1) / 2,
    );
  });

  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={material}
        uniforms={uniforms}
        vertexShader={VERTEX_SHADER}
        fragmentShader={FRAGMENT_SHADER}
      />
    </mesh>
  );
}

export function ShaderPlane({
  className,
  label,
}: Readonly<{ className?: string; label?: string }>) {
  return (
    <ThreeCanvas
      className={className}
      label={label}
      camera={{ position: [0, 0, 1], fov: 60 }}
    >
      <NoisePlane />
    </ThreeCanvas>
  );
}
