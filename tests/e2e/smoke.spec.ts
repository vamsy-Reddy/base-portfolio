import { test, expect } from "@playwright/test";

test.describe("portfolio smoke", () => {
  test("renders the hero and all major sections", async ({ page }) => {
    await page.goto("/");

    // Hero
    await expect(
      page.getByRole("heading", { level: 1, name: /atchi/i }),
    ).toBeVisible();

    // Each section heading is present (unique substrings to avoid ambiguity).
    for (const name of [
      /brought the engineering mindset/i,
      /from machines to interfaces/i,
      /things i've built/i,
      /what i build with/i,
      /fast and thoughtful/i,
    ]) {
      await expect(page.getByRole("heading", { name }).first()).toBeVisible();
    }
  });

  test("resume download link points to the PDF", async ({ page }) => {
    await page.goto("/");
    const resume = page
      .getByRole("link", { name: /download resume/i })
      .first();
    await expect(resume).toHaveAttribute("href", /\.pdf$/);
    await expect(resume).toHaveAttribute("download", "");
  });

  test("has no horizontal overflow at mobile width", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    await expect(
      page.getByRole("heading", { level: 1, name: /atchi/i }),
    ).toBeVisible();

    // The page must not scroll horizontally on a phone.
    const overflow = await page.evaluate(
      () =>
        document.documentElement.scrollWidth -
        document.documentElement.clientWidth,
    );
    expect(overflow).toBeLessThanOrEqual(1);

    // Mobile nav collapses to the menu toggle.
    await expect(
      page.getByRole("button", { name: /toggle menu/i }),
    ).toBeVisible();
  });

  test("a project card opens its case study and closes", async ({ page }) => {
    await page.goto("/");
    await page
      .getByRole("button", { name: /open case study: fleetenable/i })
      .click();

    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(dialog.getByText(/problem/i).first()).toBeVisible();

    await page.getByRole("button", { name: /^close$/i }).click();
    await expect(dialog).toBeHidden();
  });
});
