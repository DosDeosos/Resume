import type { ResumeSummary } from "@/lib/exports/resume-summary";
import { jsPDF } from "jspdf";

const PAGE_MARGIN = 16;
const LINE_HEIGHT = 5.4;
const FONT_NAME = "Prompt";

async function fontAsBase64(path: string) {
  const response = await fetch(path);
  const buffer = await response.arrayBuffer();
  let binary = "";
  const bytes = new Uint8Array(buffer);
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary);
}

async function registerFonts(doc: jsPDF) {
  const [regular, semiBold] = await Promise.all([
    fontAsBase64("/fonts/Prompt-Regular.ttf"),
    fontAsBase64("/fonts/Prompt-SemiBold.ttf"),
  ]);
  doc.addFileToVFS("Prompt-Regular.ttf", regular);
  doc.addFont("Prompt-Regular.ttf", FONT_NAME, "normal");
  doc.addFileToVFS("Prompt-SemiBold.ttf", semiBold);
  doc.addFont("Prompt-SemiBold.ttf", FONT_NAME, "bold");
}

class Writer {
  private y = PAGE_MARGIN;
  private readonly width: number;
  private readonly height: number;

  constructor(private readonly doc: jsPDF) {
    this.width = doc.internal.pageSize.getWidth() - PAGE_MARGIN * 2;
    this.height = doc.internal.pageSize.getHeight();
  }

  private ensure(lines: number) {
    if (this.y + lines * LINE_HEIGHT > this.height - PAGE_MARGIN) {
      this.doc.addPage();
      this.y = PAGE_MARGIN;
    }
  }

  heading(text: string) {
    this.ensure(2);
    this.y += 3;
    this.doc
      .setFont(FONT_NAME, "bold")
      .setFontSize(13)
      .setTextColor(30, 58, 138);
    this.doc.text(text, PAGE_MARGIN, this.y);
    this.doc.setDrawColor(219, 180, 255).setLineWidth(0.6);
    this.doc.line(
      PAGE_MARGIN,
      this.y + 1.5,
      PAGE_MARGIN + this.width,
      this.y + 1.5,
    );
    this.y += LINE_HEIGHT + 1;
  }

  paragraph(
    text: string,
    options: { bold?: boolean; size?: number; indent?: number } = {},
  ) {
    const { bold = false, size = 10, indent = 0 } = options;
    this.doc
      .setFont(FONT_NAME, bold ? "bold" : "normal")
      .setFontSize(size)
      .setTextColor(8, 51, 68);
    const lines = this.doc.splitTextToSize(
      text,
      this.width - indent,
    ) as string[];
    this.ensure(lines.length);
    this.doc.text(lines, PAGE_MARGIN + indent, this.y);
    this.y += lines.length * LINE_HEIGHT;
  }

  gap(amount = LINE_HEIGHT / 2) {
    this.y += amount;
  }
}

export async function exportResumePdf(summary: ResumeSummary) {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  await registerFonts(doc);
  const writer = new Writer(doc);

  writer.paragraph(summary.name, { bold: true, size: 20 });
  writer.paragraph(summary.headline, { size: 12 });
  writer.paragraph(summary.description, { size: 9 });
  writer.paragraph(summary.contacts.join("  ·  "), { size: 9 });

  writer.heading(summary.sections.experience);
  for (const role of summary.roles) {
    writer.paragraph(`${role.company} — ${role.role}`, { bold: true });
    writer.paragraph(role.period, { size: 9 });
    writer.paragraph(role.summary, { size: 9, indent: 3 });
    writer.gap();
  }

  writer.heading(summary.sections.applications);
  for (const app of summary.apps) {
    const link = app.href ? ` (${app.href})` : "";
    writer.paragraph(`• ${app.name} — ${app.kind}${link}`, { size: 9 });
  }

  writer.heading(summary.sections.stack);
  for (const category of summary.categories) {
    writer.paragraph(`${category.label}: ${category.items.join(", ")}`, {
      size: 9,
    });
  }

  writer.heading(summary.sections.softSkills);
  writer.paragraph(summary.softSkills.join(" · "), { size: 9 });

  writer.heading(summary.sections.education);
  for (const line of summary.education) writer.paragraph(line, { size: 9 });

  doc.setProperties({ title: summary.title, author: summary.name });
  doc.save(`${summary.name.replaceAll(" ", "-")}-resume.pdf`);
}
