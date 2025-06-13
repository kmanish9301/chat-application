import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import ChatMainContainer from "../components/main/ChatMainContainer";
import ProtectedRoute from "./ProtectedRoute";
import Profile from "../components/main/Profile";
import Layout from "../components/_layout/Layout";

// Preload critical components
const PageNotFound = lazy(() => import("../commoncomponents/PageNotFound"));
const Login = lazy(() => import("../components/login/Login"));
const Register = lazy(() => import("../components/login/Register"));
const DefaultChatComponent = lazy(() => import("../components/main/DefaultChatComponent"));

// Loading component
const LoadingFallback = () => (
  <div className="flex items-center justify-center h-screen bg-gray-900">
    <div className="text-white">Loading...</div>
  </div>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        path: "",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <Layout />
          </Suspense>
        ),
        errorElement: <PageNotFound />,
        children: [
          { index: true, element: <DefaultChatComponent /> },
          { path: "chats/:chatId", element: <ChatMainContainer /> },
          { path: "profile", element: <Profile /> },
          { path: "chat", element: <DefaultChatComponent /> },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: "/register",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <Register />
      </Suspense>
    ),
  },
  { path: "*", element: <PageNotFound /> },
]);

export default router;
