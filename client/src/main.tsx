import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./state/store.ts";
import { BrowserRouter, Route, Routes } from "react-router";
import RequireAuth from "./components/auth/RequireAuth.tsx";
import Authenticated from "./components/Authenticated.tsx";
import Login from "./components/auth/Login.tsx";
import RedirectIfAuthenticated from "./components/auth/RedirectIfAuthenticated.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route
              index
              element={
                <RedirectIfAuthenticated>
                  <Login />
                </RedirectIfAuthenticated>
              }
            />
            <Route
              path="/dashboard"
              element={
                <RequireAuth>
                  <Authenticated />
                </RequireAuth>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
