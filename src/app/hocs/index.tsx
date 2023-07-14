import React from "react";

import { compose } from "@reduxjs/toolkit";

import { withRTK } from "./withRTK";

export const withHocs: (app: () => JSX.Element) => React.ComponentType =
  compose(withRTK);
