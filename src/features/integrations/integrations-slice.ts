import {
  createEntityAdapter,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { integrationCatalog } from "@/data/integrations";
import type { Integration } from "./types";

const integrationsAdapter = createEntityAdapter<Integration>();
const initialState = integrationsAdapter.setAll(
  integrationsAdapter.getInitialState<{
    selectedId: string | null;
    searchQuery: string;
    category: string;
  }>({
    selectedId: integrationCatalog[0]?.id ?? null,
    searchQuery: "",
    category: "",
  }),
  integrationCatalog,
);

const integrationsSlice = createSlice({
  name: "integrations",
  initialState,
  reducers: {
    setIntegrationSearch(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    setIntegrationCategory(state, action: PayloadAction<string>) {
      state.category = action.payload;
    },
    resetIntegrationFilters(state) {
      state.searchQuery = "";
      state.category = "";
    },
    selectIntegration(state, action: PayloadAction<string>) {
      if (state.entities[action.payload]) state.selectedId = action.payload;
    },
    replaceIntegrations(state, action: PayloadAction<Integration[]>) {
      integrationsAdapter.setAll(state, action.payload);
      if (!state.selectedId || !state.entities[state.selectedId]) {
        state.selectedId = state.ids[0] ?? null;
      }
    },
  },
});

export const {
  selectIntegration,
  replaceIntegrations,
  setIntegrationSearch,
  setIntegrationCategory,
  resetIntegrationFilters,
} = integrationsSlice.actions;
export const integrationSelectors = integrationsAdapter.getSelectors();
export default integrationsSlice.reducer;
