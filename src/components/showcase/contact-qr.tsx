"use client";

import { profile } from "@/data/resume";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { QRCodeSVG } from "qrcode.react";

const TARGETS = [
  { id: "line", href: profile.lineHref, color: "#06c755" },
  { id: "github", href: profile.githubHref, color: "#1e3a8a" },
] as const;

export function ContactQr({ className }: Readonly<{ className?: string }>) {
  const t = useTranslations("showcase.qr");

  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-center gap-6",
        className,
      )}
    >
      {TARGETS.map((target, index) => (
        <motion.a
          key={target.id}
          href={target.href}
          target="_blank"
          rel="noreferrer"
          initial={{ opacity: 0, rotateY: -90 }}
          whileInView={{ opacity: 1, rotateY: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.15, duration: 0.6, ease: "easeOut" }}
          whileHover={{ scale: 1.05 }}
          className="flex flex-col items-center gap-2 rounded-2xl bg-white p-3 shadow-md ring-1 ring-blue-900/10"
        >
          <QRCodeSVG
            value={target.href}
            size={132}
            level="M"
            fgColor={target.color}
            bgColor="#ffffff"
            marginSize={1}
            title={t(target.id)}
          />
          <span className="text-xs font-bold text-blue-900">
            {t(target.id)}
          </span>
        </motion.a>
      ))}
    </div>
  );
}
