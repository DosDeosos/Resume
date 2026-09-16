"use client";

import { stackCategories } from "@/data/resume";
import ReactEChartsCore from "echarts-for-react/lib/core";
import { RadarChart } from "echarts/charts";
import { LegendComponent, TooltipComponent } from "echarts/components";
import * as echarts from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { useTranslations } from "next-intl";
import { useMemo } from "react";

echarts.use([RadarChart, TooltipComponent, LegendComponent, CanvasRenderer]);

export function StackRadarChart({
  className,
}: Readonly<{ className?: string }>) {
  const t = useTranslations("stack");

  const option = useMemo(
    () => ({
      animationDuration: 1400,
      animationEasing: "cubicOut",
      tooltip: {
        trigger: "item",
        borderColor: "#dbe4ff",
        borderRadius: 12,
        textStyle: { fontSize: 12 },
      },
      radar: {
        shape: "circle",
        radius: "68%",
        splitNumber: 5,
        axisName: { color: "#1e3a8a", fontSize: 11, fontWeight: 600 },
        splitLine: { lineStyle: { color: "rgba(30, 58, 138, 0.15)" } },
        splitArea: {
          areaStyle: {
            color: [
              "rgba(171,243,227,0.12)",
              "rgba(219,140,255,0.08)",
              "rgba(180,255,193,0.1)",
              "rgba(253,138,196,0.08)",
              "rgba(135,221,254,0.12)",
            ],
          },
        },
        axisLine: { lineStyle: { color: "rgba(30, 58, 138, 0.2)" } },
        indicator: stackCategories.map((category) => ({
          name: t(`categories.${category.id}`),
          max: 5,
        })),
      },
      series: [
        {
          type: "radar",
          name: t("radarSeries"),
          symbol: "circle",
          symbolSize: 6,
          lineStyle: { width: 2.5, color: "#1e3a8a" },
          itemStyle: {
            color: "#dbb4ff",
            borderColor: "#1e3a8a",
            borderWidth: 1.5,
          },
          areaStyle: {
            color: new echarts.graphic.RadialGradient(0.5, 0.5, 1, [
              { offset: 0, color: "rgba(135,221,254,0.65)" },
              { offset: 1, color: "rgba(219,140,255,0.35)" },
            ]),
          },
          data: [
            {
              value: stackCategories.map((category) => category.level),
              name: t("radarSeries"),
            },
          ],
        },
      ],
    }),
    [t],
  );

  return (
    <ReactEChartsCore
      echarts={echarts}
      option={option}
      className={className}
      style={{ height: 460, width: "100%" }}
      opts={{ renderer: "canvas" }}
      notMerge
      lazyUpdate
    />
  );
}
