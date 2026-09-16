export function storybookHref() {
  return process.env.NEXT_PUBLIC_STORYBOOK_URL ?? "/storybook/index.html";
}

export function siteOrigin() {
  return process.env.NEXT_PUBLIC_SITE_ORIGIN ?? "http://localhost:3000";
}
