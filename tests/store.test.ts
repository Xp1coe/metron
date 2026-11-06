import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import { makeStore } from "../src/store";
import { selectIntegration, replaceIntegrations } from "../src/features/integrations/integrations-slice";
import { selectAllIntegrations, selectSelectedIntegration } from "../src/features/integrations/selectors";
import { integrationCatalog } from "../src/data/integrations";

test("stores keep selections isolated between requests", () => {
  const first = makeStore();
  const second = makeStore();
  first.dispatch(selectIntegration("okta"));
  assert.equal(selectSelectedIntegration(first.getState())?.id, "okta");
  assert.equal(selectSelectedIntegration(second.getState())?.id, integrationCatalog[0].id);
  first.dispatch(selectIntegration("unknown"));
  assert.equal(selectSelectedIntegration(first.getState())?.id, "okta");
});

test("replacing data preserves a valid selection and handles removed or empty records", () => {
  const store = makeStore();
  store.dispatch(selectIntegration("okta"));
  store.dispatch(replaceIntegrations(integrationCatalog.slice(1)));
  assert.equal(selectSelectedIntegration(store.getState())?.id, "okta");
  store.dispatch(replaceIntegrations([integrationCatalog[0]]));
  assert.equal(selectSelectedIntegration(store.getState())?.id, integrationCatalog[0].id);
  store.dispatch(replaceIntegrations([]));
  assert.equal(selectSelectedIntegration(store.getState()), undefined);
  assert.deepEqual(selectAllIntegrations(store.getState()), []);
});

test("platform records have unique IDs, required fields, and available local images", () => {
  assert.equal(new Set(integrationCatalog.map(item => item.id)).size, integrationCatalog.length);
  for (const item of integrationCatalog) {
    assert.ok(item.serviceName && item.platform && item.category && item.image.alt);
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

test("the workbook's category assignments are retained without fabricated descriptions", () => {
  assert.equal(integrationCatalog.length, 108);
  assert.equal(integrationCatalog.reduce((count, item) => count + item.categories.length, 0), 111);
  assert.equal(new Set(integrationCatalog.flatMap(item => item.categories)).size, 8);
  assert.deepEqual(integrationCatalog.find(item => item.id === "wiz")?.categories, ["CSPM", "Email Security"]);
  assert.deepEqual(integrationCatalog.find(item => item.id === "orca-security")?.categories, ["CSPM", "Cloud Security"]);
  assert.deepEqual(integrationCatalog.find(item => item.id === "aqua-security")?.categories, ["CSPM", "IT Operations"]);
  assert.ok(integrationCatalog.every(item => item.integrations.every(integration => integration.description === "")));
});
