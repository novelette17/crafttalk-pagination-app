import React from "react";
import { Provider } from "react-redux";

import { store } from "@store";

export const withRTK = (Component: React.ComponentType) => () => (
  <Provider store={store}>
    <Component />
  </Provider>
);
