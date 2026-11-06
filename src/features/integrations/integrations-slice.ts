import { createEntityAdapter, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { dummyIntegrations } from "@/data/integrations";
import type { Integration } from "./types";

const integrationsAdapter = createEntityAdapter<Integration>();
const initialState = integrationsAdapter.setAll(
  integrationsAdapter.getInitialState<{ selectedId: string | null }>({ selectedId: dummyIntegrations[0]?.id ?? null }),
  dummyIntegrations,
);

const integrationsSlice = createSlice({
  name: "integrations",
  initialState,
  reducers: {
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

export const { selectIntegration, replaceIntegrations } = integrationsSlice.actions;
export const integrationSelectors = integrationsAdapter.getSelectors();
export default integrationsSlice.reducer;
