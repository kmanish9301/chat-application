import { Outlet } from "react-router-dom";
import ChatSidebarLayout from "./ChatSidebarLayout";

const Layout = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <ChatSidebarLayout />
      <div className="flex flex-col flex-1">
        <div className="flex-1 overflow-auto bg-gray-800 text-white">
          <main className="p-4 min-h-0 h-full">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
