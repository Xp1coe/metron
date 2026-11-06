import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import { makeStore } from "../src/store";
import { selectIntegration, replaceIntegrations } from "../src/features/integrations/integrations-slice";
import { selectAllIntegrations, selectSelectedIntegration } from "../src/features/integrations/selectors";
import { dummyIntegrations } from "../src/data/integrations";

test("stores keep selections isolated between requests", () => {
  const first = makeStore();
  const second = makeStore();
  first.dispatch(selectIntegration("okta"));
  assert.equal(selectSelectedIntegration(first.getState())?.id, "okta");
  assert.equal(selectSelectedIntegration(second.getState())?.id, "armis");
  first.dispatch(selectIntegration("unknown"));
  assert.equal(selectSelectedIntegration(first.getState())?.id, "okta");
});

test("replacing data preserves a valid selection and handles removed or empty records", () => {
  const store = makeStore();
  store.dispatch(selectIntegration("okta"));
  store.dispatch(replaceIntegrations(dummyIntegrations.slice(1)));
  assert.equal(selectSelectedIntegration(store.getState())?.id, "okta");
  store.dispatch(replaceIntegrations([dummyIntegrations[0]]));
  assert.equal(selectSelectedIntegration(store.getState())?.id, "armis");
  store.dispatch(replaceIntegrations([]));
  assert.equal(selectSelectedIntegration(store.getState()), undefined);
  assert.deepEqual(selectAllIntegrations(store.getState()), []);
});

test("dummy records have unique IDs, required fields, and available local images", () => {
  assert.equal(new Set(dummyIntegrations.map(item => item.id)).size, dummyIntegrations.length);
  for (const item of dummyIntegrations) {
    assert.ok(item.serviceName && item.platform && item.category && item.image.alt);
    assert.ok(existsSync(path.join(process.cwd(), "public", item.image.src)));
    assert.ok(item.integrations.length > 0);
    for (const integration of item.integrations) assert.ok(integration.id && integration.name && integration.description);
  }
});
