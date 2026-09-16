"use client";

import { Button } from "@/components/ui/button";
import { profile } from "@/data/resume";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Send } from "lucide-react";
import { useTranslations } from "next-intl";
import { useId, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(2, "nameMin"),
  email: z.email("emailInvalid"),
  message: z.string().trim().min(10, "messageMin"),
});

type ContactValues = z.infer<typeof contactSchema>;
type ErrorKey = "nameMin" | "emailInvalid" | "messageMin";

const FIELD_CLASS =
  "w-full rounded-xl border-2 border-blue-900/15 bg-white/80 px-3 py-2 text-sm text-cyan-950 outline-none transition-colors placeholder:text-cyan-950/40 focus:border-blue-900/60 aria-invalid:border-red-500";

export function ContactForm({ className }: Readonly<{ className?: string }>) {
  const t = useTranslations("showcase.form");
  const id = useId();
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    mode: "onBlur",
  });

  const errorText = (key?: string) =>
    key ? t(`errors.${key as ErrorKey}`) : null;

  const onSubmit = (values: ContactValues) => {
    const subject = encodeURIComponent(`Resume contact from ${values.name}`);
    const body = encodeURIComponent(
      `${values.message}\n\n— ${values.name} <${values.email}>`,
    );
    window.location.assign(
      `mailto:${profile.email}?subject=${subject}&body=${body}`,
    );
    setSent(true);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className={cn("flex flex-col gap-3 text-left", className)}
    >
      <div>
        <label
          htmlFor={`${id}-name`}
          className="mb-1 block text-xs font-bold text-blue-900"
        >
          {t("name")}
        </label>
        <input
          id={`${id}-name`}
          type="text"
          autoComplete="name"
          placeholder={t("namePlaceholder")}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? `${id}-name-error` : undefined}
          className={FIELD_CLASS}
          {...register("name")}
        />
        {errors.name ? (
          <p
            id={`${id}-name-error`}
            className="mt-1 text-xs font-semibold text-red-600"
          >
            {errorText(errors.name.message)}
          </p>
        ) : null}
      </div>
      <div>
        <label
          htmlFor={`${id}-email`}
          className="mb-1 block text-xs font-bold text-blue-900"
        >
          {t("email")}
        </label>
        <input
          id={`${id}-email`}
          type="email"
          autoComplete="email"
          placeholder={t("emailPlaceholder")}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? `${id}-email-error` : undefined}
          className={FIELD_CLASS}
          {...register("email")}
        />
        {errors.email ? (
          <p
            id={`${id}-email-error`}
            className="mt-1 text-xs font-semibold text-red-600"
          >
            {errorText(errors.email.message)}
          </p>
        ) : null}
      </div>
      <div>
        <label
          htmlFor={`${id}-message`}
          className="mb-1 block text-xs font-bold text-blue-900"
        >
          {t("message")}
        </label>
        <textarea
          id={`${id}-message`}
          rows={4}
          placeholder={t("messagePlaceholder")}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? `${id}-message-error` : undefined}
          className={cn(FIELD_CLASS, "resize-y")}
          {...register("message")}
        />
        {errors.message ? (
          <p
            id={`${id}-message-error`}
            className="mt-1 text-xs font-semibold text-red-600"
          >
            {errorText(errors.message.message)}
          </p>
        ) : null}
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" disabled={isSubmitting}>
          <Send aria-hidden />
          {t("submit")}
        </Button>
        {sent ? (
          <span
            role="status"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700"
          >
            <CheckCircle2 className="size-4" aria-hidden />
            {t("success")}
          </span>
        ) : null}
      </div>
    </form>
  );
}
