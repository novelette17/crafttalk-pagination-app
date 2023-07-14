export const appTokensManager = {
  setAccessToken(accessToken: string) {
    localStorage.setItem("accessToken", accessToken);
  },

  getAccessToken() {
    return localStorage.getItem("accessToken");
  },

  removeTokens() {
    localStorage.removeItem("accessToken");
  },
};
