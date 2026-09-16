"use client";

import { experience } from "@/data/resume";
import { spanMonths } from "@/lib/tenure";
import { useTranslations } from "next-intl";
import {
  Bar,
  BarChart,
  Cell,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type Datum = { id: string; label: string; months: number; color: string };

export function TenureChart() {
  const t = useTranslations("experience");
  const data: Datum[] = experience.map((role) => ({
    id: role.id,
    label: t(`roles.${role.id}.company`),
    months: spanMonths(role),
    color: role.color,
  }));

  return (
    <figure className="w-full">
      <figcaption className="mb-2 text-center text-sm font-semibold text-blue-900/80">
        {t("chartTitle")}
      </figcaption>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ left: 8, right: 48, top: 4, bottom: 4 }}
        >
          <XAxis type="number" hide domain={[0, "dataMax + 2"]} />
          <YAxis
            type="category"
            dataKey="label"
            width={150}
            tickLine={false}
            axisLine={false}
            tick={{ fill: "#1e3a8a", fontSize: 12, fontWeight: 600 }}
          />
          <Tooltip
            cursor={{ fill: "rgba(30, 58, 138, 0.06)" }}
            formatter={(value) => t("chartMonths", { count: Number(value) })}
            contentStyle={{
              borderRadius: 12,
              borderColor: "#dbe4ff",
              fontSize: 12,
            }}
          />
          <Bar
            dataKey="months"
            radius={[0, 10, 10, 0]}
            isAnimationActive
            animationDuration={1200}
          >
            {data.map((entry) => (
              <Cell
                key={entry.id}
                fill={entry.color}
                stroke="#1e3a8a"
                strokeOpacity={0.25}
              />
            ))}
            <LabelList
              dataKey="months"
              position="right"
              formatter={(value) => t("chartMonths", { count: Number(value) })}
              style={{ fill: "#1e3a8a", fontSize: 12, fontWeight: 600 }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </figure>
  );
}
