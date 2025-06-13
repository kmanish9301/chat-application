import { useNavigate } from "react-router-dom";
import Header from "./Header";
import { useEffect, useState } from "react";
import axios from "axios";
import { usersEndpoint } from "../../store/ApiEndpoints";
import { apiUrl } from "../../store/_urls";
import { formatTime } from "../../utils/_utils";

interface IUser {
  id: string;
  user_name: string;
  email: string;
  role: string;
  isActive: boolean;
  avatar?: string;
  lastMessage?: string;
  lastActive?: string;
}

const ChatSidebar = () => {
  const navigate = useNavigate();
  const [userList, setUserList] = useState<IUser[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleUserClick = (id: string) => {
    navigate(`/chats/${id}`);
  };

  const handleChange = (value: string) => {
    setSearchTerm(value);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const query = searchTerm
          ? `?searchString=${encodeURIComponent(searchTerm)}`
          : "";
        const res = await axios.get(`${apiUrl}${usersEndpoint}${query}`);
        if (Array.isArray(res.data.results)) {
          setUserList(res.data.results);
        } else {
          console.warn("Unexpected user data format", res.data);
        }
      } catch (error) {
        console.error("Failed to fetch users", error);
      }
    };

    const debounceTimeout = setTimeout(() => {
      fetchUsers();
    }, 500); // Wait 500ms after typing stops

    return () => clearTimeout(debounceTimeout);
  }, [searchTerm]);

  return (
    <div className="flex flex-col h-full bg-gray-900 text-white py-4">
      <Header />
      <div className="p-3">
        <input
          type="text"
          placeholder="Search users..."
          className="w-full p-3 rounded-3xl bg-gray-800 text-white placeholder-gray-400"
          onChange={(e) => handleChange(e.target.value)}
        />
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-4 scrollbar-custom mt-3">
        {userList.map((user) => (
          <div
            key={user.id}
            onClick={() => handleUserClick(user.id)}
            className="p-3 rounded bg-gray-700 hover:bg-gray-600 cursor-pointer flex gap-3 items-start h-[4rem]"
          >
            <img
              src={
                user.avatar ||
                "https://www.svgrepo.com/show/382106/avatar-default.svg"
              }
              alt="Avatar"
              className="w-10 h-10 rounded-full object-cover"
            />

            <div className="flex-1">
              <div className="flex justify-between items-center">
                <h4 className="font-semibold text-white truncate flex items-center gap-2">
                  {user.user_name}
                  {user.isActive && (
                    <span className="w-2 h-2 bg-green-500 rounded-full inline-block" />
                  )}
                </h4>
                <span className="text-xs text-gray-400">
                  {user.isActive
                    ? "Online"
                    : user.lastActive
                    ? formatTime(user.lastActive)
                    : "Offline"}
                </span>
              </div>

              <div className="text-sm text-gray-300 truncate w-full">
                {user.lastMessage || "No recent message"}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatSidebar;
