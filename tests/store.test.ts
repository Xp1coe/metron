import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import { makeStore } from "../src/store";
import {
  selectIntegration,
  replaceIntegrations,
  setIntegrationSearch,
  setIntegrationCategory,
  resetIntegrationFilters,
} from "../src/features/integrations/integrations-slice";
import {
  selectAllIntegrations,
  selectSelectedIntegration,
  selectFilteredIntegrations,
  selectVisibleSelectedIntegration,
} from "../src/features/integrations/selectors";
import { integrationCatalog } from "../src/data/integrations";

test("stores keep selections isolated between requests", () => {
  const first = makeStore();
  const second = makeStore();
  first.dispatch(selectIntegration("okta"));
  assert.equal(selectSelectedIntegration(first.getState())?.id, "okta");
  assert.equal(
    selectSelectedIntegration(second.getState())?.id,
    integrationCatalog[0].id,
  );
  first.dispatch(selectIntegration("unknown"));
  assert.equal(selectSelectedIntegration(first.getState())?.id, "okta");
});

test("replacing data preserves a valid selection and handles removed or empty records", () => {
  const store = makeStore();
  store.dispatch(selectIntegration("okta"));
  store.dispatch(replaceIntegrations(integrationCatalog.slice(1)));
  assert.equal(selectSelectedIntegration(store.getState())?.id, "okta");
  store.dispatch(replaceIntegrations([integrationCatalog[0]]));
  assert.equal(
    selectSelectedIntegration(store.getState())?.id,
    integrationCatalog[0].id,
  );
  store.dispatch(replaceIntegrations([]));
  assert.equal(selectSelectedIntegration(store.getState()), undefined);
  assert.deepEqual(selectAllIntegrations(store.getState()), []);
});

test("platform records have unique IDs, required fields, and available local images", () => {
  assert.equal(
    new Set(integrationCatalog.map((item) => item.id)).size,
    integrationCatalog.length,
  );
  for (const item of integrationCatalog) {
    assert.ok(
      item.serviceName && item.platform && item.category && item.image.alt,
    );
    assert.ok(item.image.alt.includes(item.platform));
    for (const category of item.categories)
      assert.ok(item.image.alt.includes(category));
    assert.ok(existsSync(path.join(process.cwd(), "public", item.image.src)));
    assert.ok(item.integrations.length > 0);
    assert.ok(item.categories.length > 0);
    assert.equal(item.category, item.categories.join(", "));
    for (const integration of item.integrations) {
      assert.ok(integration.id && integration.name);
      assert.equal(typeof integration.description, "string");
    }
  }
});

test("search and category filters combine, retain multi-category platforms, and reset", () => {
  const store = makeStore();
  store.dispatch(setIntegrationSearch("  WiZ  "));
  assert.deepEqual(
    selectFilteredIntegrations(store.getState()).map((item) => item.id),
    ["wiz"],
  );
  assert.equal(selectVisibleSelectedIntegration(store.getState())?.id, "wiz");
  store.dispatch(setIntegrationCategory("CSPM"));
  assert.equal(selectFilteredIntegrations(store.getState()).length, 1);
  store.dispatch(setIntegrationCategory("Email Security"));
  assert.equal(selectFilteredIntegrations(store.getState()).length, 1);
  store.dispatch(setIntegrationCategory("SOAR"));
  assert.deepEqual(selectFilteredIntegrations(store.getState()), []);
  assert.equal(selectVisibleSelectedIntegration(store.getState()), undefined);
  store.dispatch(resetIntegrationFilters());
  assert.equal(selectFilteredIntegrations(store.getState()).length, 108);
  assert.equal(makeStore().getState().integrations.searchQuery, "");
});

test("search includes integration descriptions", () => {
  const store = makeStore();
  store.dispatch(
    replaceIntegrations([
      {
        ...integrationCatalog[0],
        integrations: [
          {
            id: "workflow",
            name: "Alert workflow",
            description: "Automated exposure triage",
          },
        ],
      },
    ]),
  );
  store.dispatch(setIntegrationSearch("TRIAGE"));
  assert.equal(
    selectFilteredIntegrations(store.getState())[0]?.id,
    integrationCatalog[0].id,
  );
});

test("platform palettes are unique and keep text contrast above 4.5 to 1", () => {
  const luminance = (hex: string) => {
    const channels = [1, 3, 5]
      .map((offset) => parseInt(hex.slice(offset, offset + 2), 16) / 255)
      .map((value) =>
        value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4,
      );
    return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
  };
  assert.equal(
    new Set(integrationCatalog.map((item) => item.palette.foreground)).size,
    108,
  );
  for (const item of integrationCatalog) {
    const contrast =
      (luminance(item.palette.background) + 0.05) /
      (luminance(item.palette.foreground) + 0.05);
    assert.ok(contrast >= 4.5, `${item.platform}: ${contrast}`);
  }
});

test("matched company images are real PNG assets and preserve vendor relationships", () => {
  const companyImages = integrationCatalog.filter((item) =>
    item.image.src.startsWith("/companies/"),
  );
  assert.equal(companyImages.length, 57);
  for (const item of companyImages) {
    const bytes = readFileSync(
      path.join(process.cwd(), "public", item.image.src),
    );
    assert.equal(
      bytes.subarray(0, 8).toString("hex"),
      "89504e470d0a1a0a",
      item.platform,
    );
  }
  assert.equal(
    integrationCatalog.find((item) => item.id === "qualys")?.image.src,
    "/companies/Qualys_b5822dab3b.png",
  );
  assert.equal(
    integrationCatalog.find((item) => item.id === "qualys-totalcloud")?.image
      .src,
    integrationCatalog.find((item) => item.id === "qualys")?.image.src,
  );
});

test("the workbook's category assignments are retained without fabricated descriptions", () => {
  assert.equal(integrationCatalog.length, 108);
  assert.equal(
    integrationCatalog.reduce(
      (count, item) => count + item.categories.length,
      0,
    ),
    111,
  );
  assert.equal(
    new Set(integrationCatalog.flatMap((item) => item.categories)).size,
    8,
  );
  assert.deepEqual(
    integrationCatalog.find((item) => item.id === "wiz")?.categories,
    ["CSPM", "Email Security"],
  );
  assert.deepEqual(
    integrationCatalog.find((item) => item.id === "orca-security")?.categories,
    ["CSPM", "Cloud Security"],
  );
  assert.deepEqual(
    integrationCatalog.find((item) => item.id === "aqua-security")?.categories,
    ["CSPM", "IT Operations"],
  );
  assert.ok(
    integrationCatalog.every((item) =>
      item.integrations.every((integration) => integration.description === ""),
    ),
  );
});
