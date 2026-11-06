import {
  createEntityAdapter,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { integrationCatalog } from "@/data/integrations";
import type { GalleryLayout, GalleryView, Integration } from "./types";

const integrationsAdapter = createEntityAdapter<Integration>();
const initialState = integrationsAdapter.setAll(
  integrationsAdapter.getInitialState<{
    selectedId: string | null;
    searchQuery: string;
    category: string;
    view: GalleryView;
    layout: GalleryLayout;
  }>({
    selectedId: integrationCatalog[0]?.id ?? null,
    searchQuery: "",
    category: "",
    // Constant defaults keep the server and first client render identical.
    view: "wall",
    layout: "animation",
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
    setGalleryView(state, action: PayloadAction<GalleryView>) {
      state.view = action.payload;
    },
    setGalleryLayout(state, action: PayloadAction<GalleryLayout>) {
      state.layout = action.payload;
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
  setGalleryView,
  setGalleryLayout,
} = integrationsSlice.actions;
export const integrationSelectors = integrationsAdapter.getSelectors();
export default integrationsSlice.reducer;
