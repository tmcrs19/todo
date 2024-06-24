import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./api/baseApi";
import { feedSlice } from "./slices/feed/slice";
import { listenerMiddleware } from "./listenerMiddleware";

export const makeStore = () => {
  return configureStore({
    reducer: {
      [feedSlice.name]: feedSlice.reducer,
      [baseApi.reducerPath]: baseApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
      })
        .prepend(listenerMiddleware.middleware)
        .concat(baseApi.middleware),
    devTools: process.env.NODE_ENV !== "production",
  });
};
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
