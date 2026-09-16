import type { ResumeSummary } from "@/lib/exports/resume-summary";
import { Workbook } from "exceljs";

const HEADER_FILL = "FF1E3A8A";
const STRIPE_FILL = "FFF1EBFF";

export async function exportSkillsXlsx(summary: ResumeSummary) {
  const workbook = new Workbook();
  workbook.creator = summary.name;
  workbook.created = new Date();

  const sheet = workbook.addWorksheet(summary.sheetName, {
    views: [{ state: "frozen", ySplit: 1 }],
  });

  sheet.columns = [
    { header: summary.columns.category, key: "category", width: 28 },
    { header: summary.columns.level, key: "level", width: 14 },
    { header: summary.columns.tools, key: "tools", width: 80 },
  ];

  const header = sheet.getRow(1);
  header.font = { bold: true, color: { argb: "FFFFFFFF" } };
  header.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: HEADER_FILL },
  };
  header.alignment = { vertical: "middle" };
  header.height = 22;

  summary.categories.forEach((category, index) => {
    const row = sheet.addRow({
      category: category.label,
      level: category.level,
      tools: category.items.join(", "),
    });
    row.alignment = { vertical: "top", wrapText: true };
    if (index % 2 === 1) {
      row.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: STRIPE_FILL },
      };
    }
  });

  sheet.getColumn("level").alignment = { horizontal: "center" };
  sheet.autoFilter = { from: "A1", to: `C${summary.categories.length + 1}` };

  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `${summary.name.replaceAll(" ", "-")}-skills.xlsx`;
  anchor.click();
  URL.revokeObjectURL(url);
}
