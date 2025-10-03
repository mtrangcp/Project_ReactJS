import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { NotFound } from "../pages/NotFound";
import Dashboard from "../pages/Dashboard";

export const routers = createBrowserRouter([
  { path: "/", element: <Login /> },
  //   login, logout
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },

  // dashboard
  { path: "/dashboard", element: <Dashboard /> },

  //   not found
  { path: "*", element: <NotFound /> },
]);
