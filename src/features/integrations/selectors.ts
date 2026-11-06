import type { RootState } from "@/store";
import { createSelector } from "@reduxjs/toolkit";
import { integrationSelectors } from "./integrations-slice";

export const selectAllIntegrations = (state: RootState) =>
  integrationSelectors.selectAll(state.integrations);
export const selectSelectedIntegration = (state: RootState) => {
  const { selectedId, entities } = state.integrations;
  return selectedId ? entities[selectedId] : undefined;
};

export const selectIntegrationSearch = (state: RootState) =>
  state.integrations.searchQuery;
export const selectIntegrationCategory = (state: RootState) =>
  state.integrations.category;
export const selectGalleryView = (state: RootState) => state.integrations.view;
export const selectGalleryLayout = (state: RootState) =>
  state.integrations.layout;
/** A search or category filter always shows its results as a grid of apps. */
export const selectIntegrationsFiltered = (state: RootState) =>
  Boolean(state.integrations.searchQuery.trim() || state.integrations.category);
export const selectShowsAppGrid = (state: RootState) =>
  state.integrations.layout === "grid" || selectIntegrationsFiltered(state);
export const selectIntegrationCategories = createSelector(
  [selectAllIntegrations],
  (items) => [...new Set(items.flatMap((item) => item.categories))].sort(),
);
export const selectFilteredIntegrations = createSelector(
  [selectAllIntegrations, selectIntegrationSearch, selectIntegrationCategory],
  (items, search, category) => {
    const query = search.trim().toLowerCase();
    if (!query && !category) return items;
    return items.filter(
      (item) =>
        (!category || item.categories.includes(category)) &&
        (!query ||
          [
            item.serviceName,
            item.platform,
            ...item.categories,
            ...item.integrations.flatMap((integration) => [
              integration.name,
              integration.description,
            ]),
          ]
            .join(" ")
            .toLowerCase()
            .includes(query)),
    );
  },
);
export const selectVisibleSelectedIntegration = createSelector(
  [selectFilteredIntegrations, selectSelectedIntegration],
  (items, selected) =>
    items.find((item) => item.id === selected?.id) ?? items[0],
);
