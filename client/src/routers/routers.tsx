import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { NotFound } from "../pages/NotFound";
import Dashboard from "../pages/Dashboard";
import BoardDetail from "../pages/BoardDetail";

export const routers = createBrowserRouter([
  { path: "/", element: <Login /> },
  //   login, logout
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },

  // dashboard
  { path: "/dashboard", element: <Dashboard /> },

  // dashboard detail
  { path: "/dashboardDetail", element: <BoardDetail /> },

  //   not found
  { path: "*", element: <NotFound /> },
]);
