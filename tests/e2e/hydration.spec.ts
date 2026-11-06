import { expect, test as base } from "@playwright/test";

const hydrationMessage = /hydrat|server[- ]rendered.*(?:match|differ)|didn.t match|did not match|minified react error #(418|423|425)/i;

// Attach before navigation: React often reports mismatches through console.error,
// without throwing a pageerror or failing the production build.
const test = base.extend<{ browserDiagnostics: void }>({
  browserDiagnostics: [async ({ page }, use) => {
    const failures: string[] = [];
    page.on("console", message => {
      if (["error", "warning"].includes(message.type()) && hydrationMessage.test(message.text())) {
        failures.push(message.text());
      }
    });
    page.on("pageerror", error => failures.push(error.message));
    await use();
    expect(failures, "Hydration warnings or uncaught browser errors").toEqual([]);
  }, { auto: true }],
});

test("initial load and reload hydrate cleanly and support platform selection", async ({ page, isMobile }) => {
  for (let visit = 0; visit < 2; visit++) {
    if (visit === 0) await page.goto("/");
    else await page.reload();

    await expect(page.getByRole("heading", { name: "Case Snapshots" })).toBeVisible();
    // This only changes after client effects have run; then exercise Redux handlers.
    await expect.poll(async () => page.locator('[role="listitem"]').first().evaluate(element => element.style.opacity)).not.toBe("");
    const okta = page.getByRole("button", { name: "Okta", exact: true });
    await okta.focus();
    await expect(okta).toHaveAttribute("aria-pressed", "true");

    if (isMobile) {
      await expect(page.locator(".snapshots-details")).toBeHidden();
      await expect(page.getByRole("dialog")).toBeHidden();
      await page.keyboard.press("Enter");
      const dialog = page.getByRole("dialog");
      await expect(dialog).toBeVisible();
      await expect(dialog.getByRole("heading", { name: "Okta", level: 3, exact: true })).toBeVisible();
      await expect(dialog.locator("header")).toBeVisible();
      await expect(dialog.locator("footer")).toBeVisible();
      await dialog.getByRole("button", { name: "Done", exact: true }).click();
      await expect(dialog).toBeHidden();
      await expect(okta).toBeFocused();
    } else {
      await expect(page.locator(".snapshots-details").getByRole("heading", { name: "Okta", level: 3, exact: true })).toBeVisible();
      await expect(page.getByRole("dialog")).toBeHidden();
    }
  }
});
