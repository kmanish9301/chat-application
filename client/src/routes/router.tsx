import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import ChatMainContainer from "../components/main/ChatMainContainer";
import ProtectedRoute from "./ProtectedRoute";

const PageNotFound = lazy(() => import("../commoncomponents/PageNotFound"));
const Login = lazy(() => import("../components/login/Login"));
const Register = lazy(() => import("../components/login/Register"));
const Dashboard = lazy(() => import("../components/main/Dashboard"));
const Layout = lazy(() => import("../components/_layout/Layout"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        path: "",
        element: <Layout />,
        errorElement: <PageNotFound />,
        children: [
          { index: true, element: <Dashboard /> },
          { path: "chats", element: <ChatMainContainer /> },
        ],
      },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "*", element: <PageNotFound /> },
]);

export default router;
