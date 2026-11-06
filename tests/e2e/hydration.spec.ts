import { expect, test as base, type Page } from "@playwright/test";

const hydrationMessage =
  /hydrat|server[- ]rendered.*(?:match|differ)|didn.t match|did not match|minified react error #(418|423|425)/i;

// Attach before navigation: React often reports mismatches through console.error,
// without throwing a pageerror or failing the production build.
const test = base.extend<{ browserDiagnostics: void }>({
  browserDiagnostics: [
    async ({ page }, use) => {
      const failures: string[] = [];
      page.on("console", (message) => {
        if (
          ["error", "warning"].includes(message.type()) &&
          hydrationMessage.test(message.text())
        ) {
          failures.push(message.text());
        }
      });
      page.on("pageerror", (error) => failures.push(error.message));
      await use();
      expect(failures, "Hydration warnings or uncaught browser errors").toEqual(
        [],
      );
    },
    { auto: true },
  ],
});

async function measureSpiralUpdates(page: Page) {
  return page.locator('[aria-label="Security platform integrations"]').evaluate(
    (root) =>
      new Promise<{ cards: number; writes: number }>((resolve) => {
        const changed = new Set<Element>();
        let writes = 0;
        const observer = new MutationObserver((mutations) => {
          for (const mutation of mutations) {
            const card = mutation.target as Element;
            if (card.getAttribute("role") === "listitem") {
              changed.add(card);
              writes++;
            }
          }
        });
        observer.observe(root, {
          subtree: true,
          attributes: true,
          attributeFilter: ["style"],
        });
        setTimeout(() => {
          observer.disconnect();
          resolve({ cards: changed.size, writes });
        }, 450);
      }),
  );
}

test("spiral limits per-frame work and stops updates while idle or offscreen", async ({
  page,
}) => {
  await page.goto("/");
  const cards = page.locator('[role="listitem"]');
  await expect(cards).toHaveCount(108);
  await expect
    .poll(async () =>
      cards.first().evaluate((element) => element.style.opacity),
    )
    .not.toBe("");
  await page.mouse.move(0, 0);
  const moving = await measureSpiralUpdates(page);
  expect(moving.writes).toBeGreaterThan(0);
  expect(moving.cards).toBeLessThan(20);
  expect(await cards.locator("img[src]").count()).toBeLessThan(20);

  const spiral = page.locator('[data-gallery-view="spiral"]');
  await spiral.getByRole("button", { name: "Qualys", exact: true }).focus();
  await page.waitForTimeout(250);
  expect((await measureSpiralUpdates(page)).writes).toBe(0);

  await page.evaluate(() => (document.activeElement as HTMLElement)?.blur());
  await page.evaluate(() => {
    const spacer = document.createElement("div");
    spacer.style.height = "200vh";
    document.querySelector("main")!.prepend(spacer);
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(250);
  expect((await measureSpiralUpdates(page)).writes).toBe(0);
  await spiral.locator(".snapshots-spiral").scrollIntoViewIfNeeded();
  await expect
    .poll(async () => (await measureSpiralUpdates(page)).writes)
    .toBeGreaterThan(0);

  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.waitForTimeout(250);
  expect((await measureSpiralUpdates(page)).writes).toBe(0);
});

test("initial load and reload hydrate cleanly and support platform selection", async ({
  page,
}) => {
  for (let visit = 0; visit < 2; visit++) {
    if (visit === 0) await page.goto("/");
    else {
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.reload();
    }

    await expect(
      page.getByRole("heading", { name: "Case Snapshots", level: 1 }),
    ).toBeVisible();
    // This only changes after client effects have run; then exercise Redux handlers.
    await expect
      .poll(async () =>
        page
          .locator('[role="listitem"]')
          .first()
          .evaluate((element) => element.style.opacity),
      )
      .not.toBe("");
    const wallIsDistant = await page
      .locator('[data-gallery-view="wall"] .snapshots-spiral')
      .evaluate(
        (element) =>
          element.getBoundingClientRect().top > window.innerHeight + 200,
      );
    if (wallIsDistant)
      await expect(
        page.locator('[data-gallery-view="wall"] [data-drift-plane]'),
      ).toHaveCount(0);
    for (const view of ["spiral", "wall"]) {
      const section = page.locator(`[data-gallery-view="${view}"]`);
      await section.locator(".snapshots-spiral").scrollIntoViewIfNeeded();
      const okta =
        view === "wall"
          ? section
              .getByRole("button", { name: "Okta", exact: true })
              .and(page.locator('[tabindex="0"]'))
          : section.getByRole("button", { name: "Okta", exact: true });
      await okta.focus();
      await expect(okta).toHaveAttribute("aria-pressed", "true");

      await expect(section.locator(".snapshots-details")).toHaveCount(0);
      await expect(page.getByRole("dialog")).toBeHidden();
      await page.keyboard.press("Enter");
      const dialog = page.getByRole("dialog");
      await expect(dialog).toBeVisible();
      await expect(
        dialog.getByRole("heading", { name: "Okta", level: 3, exact: true }),
      ).toBeVisible();
      await expect(dialog.locator("header")).toBeVisible();
      await expect(dialog.locator("footer")).toBeVisible();
      await dialog.getByRole("button", { name: "Done", exact: true }).click();
      await expect(dialog).toBeHidden();
      await expect(okta).toBeFocused();
    }
  }
});
