import { createSlice } from "@reduxjs/toolkit";
import { appTokensManager } from "@src/api/appTokensManager";
import { mainApi } from "@src/api/main";
import { AppState } from "@store";

interface AuthState {
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false,
};

const slice = createSlice({
  name: `auth`,
  initialState,
  reducers: {
    login: (state) => {
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      appTokensManager.removeTokens();
    },
  },

  extraReducers: (builder) => {
    builder.addMatcher(mainApi.endpoints.signIn.matchFulfilled, (state) => {
      state.isAuthenticated = true;
    });
  },
});

export const { logout, login } = slice.actions;

export const authReducer = slice.reducer;

export const selectIsAuthenticated = (state: AppState) =>
  state.auth.isAuthenticated;
