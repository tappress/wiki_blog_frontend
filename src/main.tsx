import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { SignInPage } from "./pages/sign-in";
import { AppRoute } from "./lib/enums/app-route";
import { ThemeProvider } from "./lib/context/theme";
import { SignUpPage } from "./pages/sign-up";
import { LoginLayout } from "./layouts/login";
import { MainLayout } from "./layouts/main";
import { HomePage } from "./pages/home";
import { Provider } from "react-redux";
import { store } from "./store";
import { Toaster } from "sonner";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<LoginLayout />}>
        <Route element={<SignUpPage />} path={AppRoute.SIGN_UP} />
        <Route element={<SignInPage />} path={AppRoute.SIGN_IN} />
      </Route>

      <Route element={<MainLayout />}>
        <Route element={<HomePage />} path={AppRoute.HOME} />
      </Route>
    </>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
        <Toaster position="top-center"/>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);
