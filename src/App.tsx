import { useEffect } from "react";
import "./App.css";
import { useSignInMutation } from "./api/main";
import { withHocs } from "./app/hocs";
import { selectIsAuthenticated } from "./store/reducers/auth";
import { useSelector } from "react-redux";
import Grid from "./Gris";

export const App = withHocs(() => {
  const [signIn] = useSignInMutation();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  useEffect(() => {
    signIn({
      username: "kminchelle",
      password: "0lelplR",
    });
  }, []);

  if (!isAuthenticated) {
    return <h3>Авторизация...</h3>;
  }

  return <Grid />;
});
