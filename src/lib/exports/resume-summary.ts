export type SummaryRole = {
  company: string;
  role: string;
  period: string;
  summary: string;
};

export type SummaryApp = {
  name: string;
  kind: string;
  href: string | null;
};

export type SummaryCategory = {
  label: string;
  items: readonly string[];
};

export type ResumeSummary = {
  title: string;
  name: string;
  headline: string;
  contacts: readonly string[];
  sections: {
    experience: string;
    applications: string;
    stack: string;
    softSkills: string;
    education: string;
  };
  roles: readonly SummaryRole[];
  apps: readonly SummaryApp[];
  categories: readonly SummaryCategory[];
  softSkills: readonly string[];
  education: readonly string[];
  columns: { category: string; tools: string };
  sheetName: string;
  description: string;
};
