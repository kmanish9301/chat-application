import Dashboard from "../main/Dashboard";
import Header from "./Header";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-800 text-white p-4">
      <Header />

      <div>
        <Dashboard />
        <Header />
      </div>
    </aside>
  );
};

export default Sidebar;
