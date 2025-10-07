import type { JSX } from "@emotion/react/jsx-runtime";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({
  children,
}: {
  children: JSX.Element;
}) {
  const token = localStorage.getItem("tokenIdLogin");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
