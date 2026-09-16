"use client";

import { ThreeCanvas } from "@/components/three/three-canvas";
import { useFrame, useThree } from "@react-three/fiber";
import { useReducedMotion } from "framer-motion";
import { useLayoutEffect, useMemo, useRef } from "react";
import { Color, type InstancedMesh, Object3D } from "three";

export const BLOB_PALETTE = [
  "#ffe960",
  "#87ddfe",
  "#8cff81",
  "#fa7ca6",
  "#e2ffa5",
] as const;

const BLOB_COUNT = 35;
const SIZE_MIN = 5;
const SIZE_MAX = 120;
const SPEED_X_MAX = 0.2;
const SPEED_Y_MAX = 0.4;
const PULSE = 0.1;

type Blob = {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  phase: number;
};

function seeded(seed: number) {
  let state = seed;
  return () => {
    state = (state * 1664525 + 1013904223) % 4294967296;
    return state / 4294967296;
  };
}

function createBlobs(width: number, height: number): Blob[] {
  const random = seeded(20240217);
  return Array.from({ length: BLOB_COUNT }, () => ({
    x: (random() - 0.5) * width,
    y: (random() - 0.5) * height,
    radius: SIZE_MIN + random() * (SIZE_MAX - SIZE_MIN),
    vx: (random() - 0.5) * 2 * SPEED_X_MAX,
    vy: (random() - 0.5) * 2 * SPEED_Y_MAX,
    phase: random() * Math.PI * 2,
  }));
}

function BlobField({ animate }: Readonly<{ animate: boolean }>) {
  const meshRef = useRef<InstancedMesh>(null);
  const { size } = useThree();
  const blobs = useMemo(
    () => createBlobs(size.width, size.height),
    [size.width, size.height],
  );
  const proxy = useMemo(() => new Object3D(), []);
  const colors = useMemo(() => BLOB_PALETTE.map((hex) => new Color(hex)), []);

  useLayoutEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    blobs.forEach((_, index) =>
      mesh.setColorAt(index, colors[index % colors.length]),
    );
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  }, [blobs, colors]);

  useFrame(({ clock }) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const halfWidth = size.width / 2 + SIZE_MAX;
    const halfHeight = size.height / 2 + SIZE_MAX;
    const time = clock.getElapsedTime();
    blobs.forEach((blob, index) => {
      if (animate) {
        blob.x += blob.vx;
        blob.y += blob.vy;
        if (blob.x > halfWidth) blob.x = -halfWidth;
        if (blob.x < -halfWidth) blob.x = halfWidth;
        if (blob.y > halfHeight) blob.y = -halfHeight;
        if (blob.y < -halfHeight) blob.y = halfHeight;
      }
      const pulse = 1 + Math.sin(time + blob.phase) * PULSE;
      proxy.position.set(blob.x, blob.y, 0);
      proxy.scale.setScalar(blob.radius * pulse);
      proxy.updateMatrix();
      mesh.setMatrixAt(index, proxy.matrix);
    });
    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined, undefined, BLOB_COUNT]}
      frustumCulled={false}
    >
      <circleGeometry args={[1, 64]} />
      <meshBasicMaterial transparent opacity={0.55} toneMapped={false} />
    </instancedMesh>
  );
}

export function AmbientBlobsCanvas({
  className,
}: Readonly<{ className?: string }>) {
  const reducedMotion = useReducedMotion();

  return (
    <ThreeCanvas
      className={className}
      orthographic
      camera={{ position: [0, 0, 100], zoom: 1, near: 0.1, far: 1000 }}
      alwaysAnimate={!reducedMotion}
    >
      <BlobField animate={!reducedMotion} />
    </ThreeCanvas>
  );
}
