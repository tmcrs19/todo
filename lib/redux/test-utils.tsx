import type { RenderOptions } from "@testing-library/react";
import { render } from "@testing-library/react";
import React, { ReactNode } from "react";
import { Provider } from "react-redux";

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
