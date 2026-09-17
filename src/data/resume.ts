export const profile = {
  name: "Vuttipat Srisumran",
  githubUser: "DosDeosos",
  email: "dosdeosos@gmail.com",
  phoneDisplay: "+66 81 857 0121",
  phoneHref: "tel:+66818570121",
  lineId: "dosdeosos",
  lineHref: "https://line.me/ti/p/~dosdeosos",
  githubHref: "https://github.com/DosDeosos",
  linkedinHref: "https://www.linkedin.com/in/vuttipat-srisumran",
  mapEmbedHref:
    "https://www.google.com/maps?q=Lumpini+Townville+Permsin-Watcharapol+O-Ngoen+Sai+Mai+Bangkok+10220&output=embed",
  resumePdfHref: "/resume.pdf",
  profileImage: "/Profile-Image.jpg",
} as const;

export const lottie = {
  mail: "https://lottie.host/098511ec-58fe-4b8e-9ab9-ce96a65c041e/W8X2phGgHX.json",
  phone:
    "https://lottie.host/a696deaf-c21b-4109-9255-3b8d585de83a/yef7uzEf1L.json",
  line: "https://lottie.host/c236fae1-fa1c-4a9f-bdf2-a8bcef842927/zYbGcU3orP.json",
  github:
    "https://lottie.host/e07c432c-9a65-442a-8eea-bddaa3abf772/r5XY5XiY4a.json",
  anywhere:
    "https://lottie.host/4f708088-23f1-4c37-841f-7bd8069102dd/TzveQ5Lfd3.json",
  passion:
    "https://lottie.host/a95ec2eb-828c-4bee-a8e7-1cdc1cae3a72/ogTfJGs12I.json",
  selfLearning:
    "https://lottie.host/d648cc21-a59a-480f-b57d-5f8d3db218d6/tBBkPfu1tu.json",
  brain: "/lottie/brain.json",
  document: "/lottie/document.json",
  clock: "/lottie/clock.json",
  airplane: "/lottie/airplane.json",
  calendar: "/lottie/calendar.json",
  degreeCap: "/lottie/degreecap.json",
  computer: "/lottie/computer.json",
  hands: "/lottie/hands.json",
} as const;

export const aboutItems = [
  { id: "anywhere", icon: lottie.anywhere },
  { id: "passion", icon: lottie.passion },
  { id: "selfLearning", icon: lottie.selfLearning },
  { id: "openMinded", icon: lottie.brain },
  { id: "documents", icon: lottie.document },
  { id: "shifts", icon: lottie.clock },
] as const;

export type AboutItemId = (typeof aboutItems)[number]["id"];

export const experience = [
  {
    id: "trienpont",
    start: "2024-02-01",
    end: "2024-08-31",
    frontend: 50,
    backend: 50,
    color: "#dbb4ff",
  },
  {
    id: "inzoalvation",
    start: "2024-08-01",
    end: "2025-12-31",
    frontend: 100,
    backend: 0,
    color: "#87ddfe",
  },
  {
    id: "techswap",
    start: "2025-12-01",
    end: "2026-09-30",
    frontend: 80,
    backend: 20,
    color: "#b4ffc1",
  },
] as const;

export type ExperienceId = (typeof experience)[number]["id"];

export const applications = [
  {
    id: "compass",
    href: "https://compasshospitality.com",
    employer: "trienpont",
  },
  {
    id: "dependable",
    href: "https://dependableliftrentals.com",
    employer: "trienpont",
  },
  { id: "erp", href: null, employer: "inzoalvation" },
  { id: "solar", href: null, employer: "inzoalvation" },
  { id: "techswap", href: "https://techswap.co.th", employer: "techswap" },
] as const;

export type ApplicationId = (typeof applications)[number]["id"];

export const stackCategories = [
  {
    id: "languages",
    level: 5,
    demo: null,
    items: ["JavaScript", "TypeScript", "HTML5", "CSS3 / SASS"],
  },
  {
    id: "frameworks",
    level: 5,
    demo: null,
    items: ["Next.js (App Router, RSC)", "React", "Vite", "React Router"],
  },
  {
    id: "stateData",
    level: 4,
    demo: "github",
    items: [
      "TanStack Query",
      "GraphQL / Apollo",
      "REST",
      "Socket.IO",
      "Context API",
      "Zod",
      "React Hook Form",
    ],
  },
  {
    id: "stylingUi",
    level: 5,
    demo: null,
    items: [
      "Tailwind CSS v4",
      "Shadcn/UI",
      "Radix UI",
      "HeroUI",
      "Framer Motion",
      "Lucide",
      "Storybook",
    ],
  },
  {
    id: "testing",
    level: 4,
    demo: null,
    items: [
      "Playwright (E2E)",
      "API contract tests",
      "Performance budgets",
      "ESLint / SonarQube JS",
      "Prettier",
    ],
  },
  {
    id: "devops",
    level: 3,
    demo: null,
    items: ["Docker", "Vercel", "Multi-env promotion (dev / uat / prod)"],
  },
  {
    id: "backendAuth",
    level: 3,
    demo: null,
    items: [
      "Supabase",
      "Next-Auth",
      "Go REST API integration",
      "Role-Based Access Control (RBAC)",
    ],
  },
  {
    id: "cms",
    level: 3,
    demo: null,
    items: ["Strapi", "Payload CMS", "Headless WordPress"],
  },
  {
    id: "integrations",
    level: 4,
    demo: "qr",
    items: ["Google Maps", "LINE OA / LINE LIFF", "QR scanning"],
  },
  {
    id: "seo",
    level: 4,
    demo: null,
    items: ["Dynamic sitemaps", "SEO quality gates"],
  },
  {
    id: "visualization",
    level: 4,
    demo: null,
    items: [
      "ECharts",
      "Recharts",
      "Three.js / React Three Fiber",
      "WebGL animation",
      "3D assets toolbox",
    ],
  },
  {
    id: "reporting",
    level: 3,
    demo: "export",
    items: ["Puppeteer", "ExcelJS", "jsPDF", "html2pdf"],
  },
  {
    id: "i18n",
    level: 4,
    demo: null,
    items: ["next-intl multi-language platform"],
  },
  {
    id: "accessibility",
    level: 4,
    demo: null,
    items: ["Keyboard A11y", "Driver.js"],
  },
  {
    id: "marketing",
    level: 3,
    demo: null,
    items: ["Marketing-based UI integration"],
  },
  {
    id: "maintainer",
    level: 4,
    demo: null,
    items: ["Code maintainer / auditor"],
  },
] as const;

export type StackCategoryId = (typeof stackCategories)[number]["id"];

export const orbitBadges = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind v4",
  "Three.js",
  "R3F",
  "Storybook",
  "Playwright",
  "ECharts",
  "Recharts",
  "next-intl",
  "Zod",
  "TanStack",
  "GraphQL",
  "Socket.IO",
  "Docker",
  "Vercel",
  "Supabase",
  "Strapi",
  "Framer Motion",
  "Radix",
  "HeroUI",
  "jsPDF",
  "LINE LIFF",
] as const;

export const softSkillIds = [
  "empathy",
  "responsiveness",
  "activeListening",
  "ethicalAwareness",
  "adaptability",
  "collaboration",
  "curiosity",
  "languages",
] as const;

export type SoftSkillId = (typeof softSkillIds)[number];

export const education = {
  startYear: 2016,
  endYear: 2019,
} as const;

export const sectionIds = [
  "hero",
  "about",
  "experience",
  "applications",
  "stack",
  "softSkills",
  "education",
  "showcase",
] as const;

export type SectionId = (typeof sectionIds)[number];
