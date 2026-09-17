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

test("stack tabs switch between cards and orbit", async ({ page }) => {
  await page.goto("/en");
  await page.locator("section#stack").scrollIntoViewIfNeeded();
  await page.getByRole("tab", { name: "3D orbit" }).click();
  await expect(page.locator("section#stack canvas")).toBeVisible();
});

test("guided tour opens from the header", async ({ page }) => {
  await page.goto("/en");
  await page.getByRole("button", { name: "Take a tour" }).click();
  await expect(page.locator(".driver-popover")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.locator(".driver-popover")).toBeHidden();
});
