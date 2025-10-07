import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { NotFound } from "../pages/NotFound";
import Dashboard from "../pages/Dashboard";
import BoardDetail from "../pages/BoardDetail";
import Home from "../pages/Home";
import ProtectedRoute from "../pages/ProtectedRoute";

export const routers = createBrowserRouter([
  { path: "/", element: <Home /> },
  //   login, logout
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },

  // dashboard
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },

  // dashboard detail
  {
    path: "/dashboardDetail",
    element: (
      <ProtectedRoute>
        <BoardDetail />
      </ProtectedRoute>
    ),
  },

  //   not found
  { path: "*", element: <NotFound /> },
]);
