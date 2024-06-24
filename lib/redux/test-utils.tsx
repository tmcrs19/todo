import type { RenderOptions } from "@testing-library/react";
import { cleanup, render } from "@testing-library/react";
import React, { PropsWithChildren, ReactNode } from "react";
import { Provider } from "react-redux";

import fetchMock from "jest-fetch-mock";
import { AppStore, makeStore } from "./store";

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  store?: AppStore;
}

export function renderWithProviders(
  ui: React.ReactElement,
  { store = makeStore(), ...renderOptions }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: { children: ReactNode }): JSX.Element {
    return <Provider store={store}>{children}</Provider>;
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
