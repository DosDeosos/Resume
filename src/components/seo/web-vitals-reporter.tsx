"use client";

import { useEffect } from "react";
import { onCLS, onINP, onLCP, type Metric } from "web-vitals";

function report(metric: Metric) {
  if (process.env.NODE_ENV !== "development") return;
  console.info(
    `[web-vitals] ${metric.name}=${metric.value.toFixed(2)} (${metric.rating})`,
  );
}

export function WebVitalsReporter() {
  useEffect(() => {
    onCLS(report);
    onINP(report);
    onLCP(report);
  }, []);

  return null;
}
