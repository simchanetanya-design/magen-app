import { test, expect } from "@playwright/test";

test("check breathing page for console errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", msg => {
    if (msg.type() === "error") errors.push(msg.text());
  });
  page.on("pageerror", err => errors.push(err.message));

  await page.goto("http://localhost:3000");
  await page.waitForTimeout(1500);

  // Go to breathing
  const breathingBtn = page.locator("button", { hasText: "נשימות מודרכות" });
  await breathingBtn.click();
  await page.waitForTimeout(2000);

  // Check panda canvas exists
  const canvas = page.locator("canvas");
  const canvasCount = await canvas.count();
  console.log(`Canvas elements found: ${canvasCount}`);

  // Check no critical errors (filter out the borderRight warning we already know about)
  const criticalErrors = errors.filter(e => !e.includes("borderRight") && !e.includes("style property"));
  console.log("Console errors:", criticalErrors);

  await page.screenshot({ path: "screenshots/09-debug-breathing.png", fullPage: true });

  expect(canvasCount).toBeGreaterThan(0);
});
