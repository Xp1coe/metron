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
  isMobile,
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

      if (view === "spiral" && !isMobile) {
        await expect(section.locator(".snapshots-details")).toBeVisible();
        await expect(
          section
            .locator(".snapshots-details")
            .getByRole("heading", { name: "Okta", level: 3, exact: true }),
        ).toBeVisible();
        await expect(page.getByRole("dialog")).toBeHidden();
        continue;
      }
      if (view === "wall")
        await expect(section.locator(".snapshots-details")).toHaveCount(0);
      else await expect(section.locator(".snapshots-details")).toBeHidden();
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

test("search and category controls stay synchronized across galleries", async ({
  page,
}) => {
  await page.goto("/");
  const spiral = page.locator('[data-gallery-view="spiral"]');
  const wall = page.locator('[data-gallery-view="wall"]');
  await spiral.getByLabel("Search integrations").fill("wiz");
  await expect(spiral.locator('[role="listitem"]')).toHaveCount(1);
  await expect(wall.getByLabel("Search integrations")).toHaveValue("wiz");
  await spiral.getByLabel("Filter by category").selectOption("CSPM");
  await expect(wall.getByLabel("Filter by category")).toHaveValue("CSPM");
  await expect(spiral.getByRole("status")).toHaveText(
    "Showing 1 of 108 platforms",
  );
  await spiral.getByLabel("Filter by category").selectOption("SOAR");
  await expect(
    spiral.getByText("No integrations match your search.", { exact: false }),
  ).toBeVisible();
  await expect(spiral.getByRole("status")).toHaveText(
    "Showing 0 of 108 platforms",
  );
  await spiral.getByRole("button", { name: "Reset filters" }).click();
  await expect(spiral.locator('[role="listitem"]')).toHaveCount(108);
  await expect(wall.getByLabel("Search integrations")).toHaveValue("");
  await expect(wall.getByLabel("Filter by category")).toHaveValue("");
  await expect(
    spiral.locator('[role="listitem"]').first().locator("img"),
  ).toHaveAttribute(
    "alt",
    "Qualys platform integration listed under Threat Intelligence",
  );
});

test("server metadata includes the image catalog and a working social preview", async ({
  page,
  request,
}) => {
  const response = await request.get("/");
  const html = await response.text();
  expect(html).toContain("application/ld+json");
  expect(html).toContain('"numberOfItems":108');
  expect(html).toContain(
    "Qualys platform integration listed under Threat Intelligence",
  );
  await page.goto("/");
  await expect(page).toHaveTitle(
    "Case Snapshots | Metron Security Integrations",
  );
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    "content",
    /108 security and ITOps platforms across 8 categories/,
  );
  await expect(page.locator('meta[property="og:image:alt"]')).toHaveAttribute(
    "content",
    /Metron Security Case Snapshots/,
  );
  await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
    "content",
    "summary_large_image",
  );
  const imageUrl = await page
    .locator('meta[property="og:image"]')
    .getAttribute("content");
  expect(imageUrl).toBeTruthy();
  const image = await request.get(imageUrl!);
  expect(image.ok()).toBe(true);
  expect(image.headers()["content-type"]).toContain("image/png");
});
