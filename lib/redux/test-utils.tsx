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

/**
 * Find a PUT or POST request in fetch mock or find it by url
 *
 * @param {string} url - finds request with given url
 * @param {boolean} withUrl - adds the requests url path to the return object
 */
export const getMockPostOrPutRequest = (options?: {
  url?: string;
  withUrl?: boolean;
}) => {
  const request = fetchMock.mock.calls.find(
    (call) =>
      call[0] &&
      typeof call[0] !== "string" &&
      (options?.url
        ? call[0].url.includes(options?.url)
        : ["PUT", "POST", "PATCH", "DELETE"].includes(call[0].method))
  )?.[0];
  if (!request || typeof request === "string")
    throw Error("mock request not found");

  return {
    method: request.method,
    body: request.body ? JSON.parse(request.body.toString()) : undefined,
    ...(options?.withUrl && { url: request.url }),
  };
};
