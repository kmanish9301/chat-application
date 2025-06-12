import { useNavigate } from "react-router-dom";
import Header from "./Header";

const ChatSidebar = () => {
  const navigate = useNavigate();

  const handleUserClick = (id: number) => {
    navigate(`/chats/${id}`);
  };

  return (
    <div className="flex flex-col h-full bg-gray-900 text-white py-4">
      <Header />
      <div className="p-3">
        <input
          type="text"
          placeholder="Search users..."
          className="w-full p-3 rounded-3xl bg-gray-800 text-white placeholder-gray-400"
        />
      </div>
      <div className="flex-1 overflow-y-auto px-3 py-3 pb-3 space-y-4 scrollbar-custom mt-3">
        {Array.from({ length: 14 }, (_, i) => (
          <div
            key={i}
            onClick={() => handleUserClick(i + 1)}
            className="p-3 rounded bg-gray-700 hover:bg-gray-600 cursor-pointer flex gap-3 items-start h-[4rem] backdrop-blur-md bg-transparent"
          >
            <img
              src="https://via.placeholder.com/40x40.png?text=V"
              alt="Avatar"
              className="w-10 h-10 rounded-full object-cover"
            />

            <div className="flex-1">
              <div className="flex justify-between items-center">
                <h4 className="font-semibold text-white">Veirdo</h4>
                <span className="text-xs text-gray-400">1:30 PM</span>
              </div>

              <div className="text-sm text-gray-300 flex items-center gap-1 truncate w-full">
                <span>Hello Can’t stop thinking about IGNITE...</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatSidebar;
