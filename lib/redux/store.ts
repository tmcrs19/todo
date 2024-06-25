import { configureStore } from "@reduxjs/toolkit";
import { todoSlice } from "./slices/todo/slice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      [todoSlice.name]: todoSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
      }),
    devTools: process.env.NODE_ENV !== "production",
  });
};
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
