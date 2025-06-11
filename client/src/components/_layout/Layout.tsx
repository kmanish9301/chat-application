import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Sidebar from "./Sidebar";

const Layout = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <main className="flex-1 p-4 overflow-auto bg-white">
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default Layout;
