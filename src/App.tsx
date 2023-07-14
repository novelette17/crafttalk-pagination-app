import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useSignInMutation } from "./api/main";
import { withHocs } from "./app/hocs";
import { selectIsAuthenticated } from "./store/reducers/auth";
import { useSelector } from "react-redux";

export const App = withHocs(() => {
  const [count, setCount] = useState(0);
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

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR!
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
});
