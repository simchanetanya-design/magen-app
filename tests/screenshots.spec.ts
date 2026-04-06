import { test } from "@playwright/test";

test.describe("Magen App Screenshots", () => {
  test("main page - first aid", async ({ page }) => {
    await page.goto("http://localhost:3000");
    await page.waitForTimeout(2000);
    await page.screenshot({ path: "screenshots/01-first-aid.png", fullPage: true });
  });

  test("breathing - balloon with 3D panda", async ({ page }) => {
    await page.goto("http://localhost:3000");
    await page.waitForTimeout(1000);
    // Click on breathing nav
    const breathingBtn = page.locator("button", { hasText: "נשימות מודרכות" });
    await breathingBtn.click();
    await page.waitForTimeout(2000);
    await page.screenshot({ path: "screenshots/02-breathing-balloon.png", fullPage: true });
  });

  test("breathing - balloon running animation", async ({ page }) => {
    await page.goto("http://localhost:3000");
    await page.waitForTimeout(1000);
    const breathingBtn = page.locator("button", { hasText: "נשימות מודרכות" });
    await breathingBtn.click();
    await page.waitForTimeout(1500);
    // Click start button
    const startBtn = page.locator("button", { hasText: "התחל" });
    await startBtn.click();
    // Wait for inhale phase
    await page.waitForTimeout(3000);
    await page.screenshot({ path: "screenshots/03-breathing-inhale.png", fullPage: true });
    // Wait for exhale phase with stars
    await page.waitForTimeout(5000);
    await page.screenshot({ path: "screenshots/04-breathing-exhale.png", fullPage: true });
  });

  test("psychoedu section", async ({ page }) => {
    await page.goto("http://localhost:3000");
    await page.waitForTimeout(1000);
    const btn = page.locator("button", { hasText: "פסיכואדוקציה" });
    await btn.click();
    await page.waitForTimeout(1000);
    await page.screenshot({ path: "screenshots/05-psychoedu.png", fullPage: true });
  });

  test("parent art section", async ({ page }) => {
    await page.goto("http://localhost:3000");
    await page.waitForTimeout(1000);
    const btn = page.locator("button", { hasText: "אמנות להורים" });
    await btn.click();
    await page.waitForTimeout(1000);
    await page.screenshot({ path: "screenshots/06-parent-art.png", fullPage: true });
  });

  test("school section", async ({ page }) => {
    await page.goto("http://localhost:3000");
    await page.waitForTimeout(1000);
    const btn = page.locator("button", { hasText: "מענה חינוכי" });
    await btn.click();
    await page.waitForTimeout(1000);
    await page.screenshot({ path: "screenshots/07-school.png", fullPage: true });
  });

  test("AI chat open", async ({ page }) => {
    await page.goto("http://localhost:3000");
    await page.waitForTimeout(1000);
    const chatBtn = page.locator("button", { hasText: "יועץ AI" });
    await chatBtn.click();
    await page.waitForTimeout(1000);
    await page.screenshot({ path: "screenshots/08-ai-chat.png", fullPage: true });
  });
});
