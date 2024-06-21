import { App } from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const router = createBrowserRouter([
  {
    element: <App />,
    path: "/",
  },
  {
    element: <App />,
    path: "/aroundyou",
  },
  {
    element: <App />,
    path: "/songs/:songId",
  },
  {
    element: <App />,
    path: "/artists/:artistId",
  },
  {
    element: <App />,
    path: "/topcharts",
  },
  {
    element: <App />,
    path: "/topartists",
  },
  {
    element: <App />,
    path: "/search/:searchTerm",
  },
  {
    element: <App />,
    path: "/uploadsongs",
  },
  {
    element: <App />,
    path: "/mymusic",
  },
  {
    element: <Login />,
    path: "/login",
  },
  {
    element: <Signup />,
    path: "/signup",
  },
  {
    element: <App />,
    path: "/createplaylist",
  },
  {
    element: <App />,
    path: "/myplaylists",
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <RouterProvider router={router} />
  // </React.StrictMode>
);
