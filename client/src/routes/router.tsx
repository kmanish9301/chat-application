import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import ChatMainContainer from "../components/main/ChatMainContainer";
import ProtectedRoute from "./ProtectedRoute";

const PageNotFound = lazy(() => import("../commoncomponents/PageNotFound"));
const Login = lazy(() => import("../components/login/Login"));
const Register = lazy(() => import("../components/login/Register"));
const DefaultChatComponent = lazy(
  () => import("../components/main/DefaultChatComponent")
);
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
          { index: true, element: <DefaultChatComponent /> },
          { path: "chats/:chatId", element: <ChatMainContainer /> },
        ],
      },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "*", element: <PageNotFound /> },
]);

export default router;
