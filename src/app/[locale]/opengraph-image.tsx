import { profile } from "@/data/resume";
import { defaultLocale, isLocale } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import { ImageResponse } from "next/og";

export const alt = "Vuttipat Srisumran";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const activeLocale = isLocale(locale) ? locale : defaultLocale;
  const t = await getTranslations({ locale: activeLocale, namespace: "hero" });

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: 80,
        background:
          "linear-gradient(135deg, #f4f3f6 0%, #e2ffa5 35%, #87ddfe 70%, #dbb4ff 100%)",
        color: "#1e3a8a",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ fontSize: 34, opacity: 0.8 }}>{t("greeting")}</div>
      <div style={{ fontSize: 72, fontWeight: 700, marginTop: 8 }}>
        {profile.name}
      </div>
      <div style={{ fontSize: 44, marginTop: 8, color: "#083344" }}>
        {t("lines.role")}
      </div>
      <div
        style={{ fontSize: 26, marginTop: 40, color: "#083344", opacity: 0.8 }}
      >
        {profile.email} · {profile.githubHref}
      </div>
    </div>,
    size,
  );
}
