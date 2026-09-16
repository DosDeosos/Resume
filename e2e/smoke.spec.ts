import { expect, test } from "@playwright/test";

test("root redirects to the default locale", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL(/\/en$/);
});

test("english resume renders every section", async ({ page }) => {
  await page.goto("/en");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    /Vuttipat|Full-Stack/,
  );
  for (const id of [
    "about",
    "experience",
    "applications",
    "stack",
    "softSkills",
    "education",
    "showcase",
  ]) {
    await expect(page.locator(`section#${id}`)).toBeVisible();
  }
});

test("locale switcher moves to thai and back", async ({ page }) => {
  await page.goto("/en");
  await page.getByRole("button", { name: "TH", exact: true }).click();
  await expect(page).toHaveURL(/\/th$/);
  await expect(
    page.getByRole("heading", { name: "เกี่ยวกับผม" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "EN", exact: true }).click();
  await expect(page).toHaveURL(/\/en$/);
});

test("stack tabs switch between cards, orbit and radar", async ({ page }) => {
  await page.goto("/en");
  await page.locator("section#stack").scrollIntoViewIfNeeded();
  await page.getByRole("tab", { name: "3D orbit" }).click();
  await expect(page.locator("section#stack canvas")).toBeVisible();
  await page.getByRole("tab", { name: "Radar" }).click();
  await expect(page.locator("section#stack canvas")).toBeVisible();
});

test("guided tour opens from the showcase", async ({ page }) => {
  await page.goto("/en");
  await page.locator("section#showcase").scrollIntoViewIfNeeded();
  await page.getByRole("button", { name: "Start tour" }).click();
  await expect(page.locator(".driver-popover")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.locator(".driver-popover")).toBeHidden();
});

test("contact form validates before sending", async ({ page }) => {
  await page.goto("/en");
  await page.locator("section#showcase").scrollIntoViewIfNeeded();
  await page.getByRole("button", { name: "Send email" }).click();
  await expect(
    page.getByText("Please enter at least 2 characters."),
  ).toBeVisible();
});
