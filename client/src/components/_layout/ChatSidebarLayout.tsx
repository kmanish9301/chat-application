import {
  ChatBubbleLeftRightIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import ChatSidebar from "./ChatSidebar";
import { useNavigate, useLocation } from "react-router-dom";

const ChatSidebarLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<"chat" | "profile">("chat");

  useEffect(() => {
    // Update active tab based on current route
    if (location.pathname === "/profile") {
      setActiveTab("profile");
    } else {
      setActiveTab("chat");
    }
  }, [location.pathname]);

  const renderSidebarContent = () => {
    switch (activeTab) {
      case "chat":
        return <ChatSidebar />;
      case "profile":
        return null; // Remove profile from sidebar since it's in main content
      default:
        return null;
    }
  };

  const handleProfile = () => {
    setActiveTab("profile");
    navigate("/profile");
  };

  const handleChat = () => {
    setActiveTab("chat");
    navigate("/chat");
  };

  return (
    <div className="flex h-full bg-gray-900 text-white">
      <div className="w-[4.5rem] flex flex-col items-center justify-between py-8 space-y-6 bg-gray-800">
        <button onClick={handleChat}>
          <ChatBubbleLeftRightIcon
            className={`w-8 ${
              activeTab === "chat" ? "text-white" : "text-gray-400"
            }`}
          />
        </button>
        <button onClick={handleProfile}>
          <UserCircleIcon
            className={`w-8 ${
              activeTab === "profile" ? "text-white" : "text-gray-400"
            }`}
          />
        </button>
      </div>

      <div className="w-[30rem] flex flex-col border-l border-gray-800">
        {renderSidebarContent()}
      </div>
    </div>
  );
};

export default ChatSidebarLayout;
