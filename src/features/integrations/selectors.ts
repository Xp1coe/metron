import type { RootState } from "@/store";
import { integrationSelectors } from "./integrations-slice";

export const selectAllIntegrations = (state: RootState) => integrationSelectors.selectAll(state.integrations);
export const selectSelectedIntegration = (state: RootState) => {
  const { selectedId, entities } = state.integrations;
  return selectedId ? entities[selectedId] : undefined;
};
