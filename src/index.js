import axios from "axios";
import React from "react";
import { CookiesProvider } from "react-cookie";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./Router";

const root = ReactDOM.createRoot(document.getElementById("root"));
axios.defaults.withCredentials = true;

root.render(
  <CookiesProvider>
    <RouterProvider router={router} />
  </CookiesProvider>
);
