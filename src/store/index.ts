import { configureStore } from "@reduxjs/toolkit";
import integrationsReducer from "@/features/integrations/integrations-slice";

// A factory prevents sharing mutable state between Next.js server requests.
export const makeStore = () => configureStore({
  reducer: { integrations: integrationsReducer },
  devTools: process.env.NODE_ENV !== "production",
});

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
