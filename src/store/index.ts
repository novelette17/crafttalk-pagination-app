import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import {
  Action,
  ThunkAction,
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { createLogger } from "redux-logger";

import { mainApi } from "@api/main";

import { isDevEnv } from "@src/envs";

const middlewares = [mainApi.middleware];

if (isDevEnv) {
  const logger = createLogger({
    collapsed: true,
    duration: true,
    timestamp: true,
  });

  middlewares.push(logger);
}

export const rootReducer = combineReducers({
  [mainApi.reducerPath]: mainApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (gDM) => gDM().concat(middlewares),
});

export type AppStore = typeof store;
export type AppState = ReturnType<typeof store.getState>;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
