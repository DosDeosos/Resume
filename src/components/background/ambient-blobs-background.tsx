"use client";

import dynamic from "next/dynamic";

const AmbientBlobsCanvas = dynamic(
  () =>
    import("./ambient-blobs-canvas").then(
      (module) => module.AmbientBlobsCanvas,
    ),
  { ssr: false },
);

export function AmbientBlobsBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 mix-blend-multiply"
    >
      <AmbientBlobsCanvas className="size-full" />
    </div>
  );
}
