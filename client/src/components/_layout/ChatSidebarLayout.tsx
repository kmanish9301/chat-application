import {
  ChatBubbleLeftRightIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import Profile from "../main/Profile";
import ChatSidebar from "./ChatSidebar";

const ChatSidebarLayout = () => {
  const [activeTab, setActiveTab] = useState<"chat" | "profile">("chat");

  const renderSidebarContent = () => {
    switch (activeTab) {
      case "chat":
        return <ChatSidebar />;
      case "profile":
        return <Profile />;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-full bg-gray-900 text-white">
      <div className="w-[4.5rem] flex flex-col items-center justify-between py-8 space-y-6 bg-gray-800">
        <button onClick={() => setActiveTab("chat")}>
          <ChatBubbleLeftRightIcon
            className={`w-8 ${
              activeTab === "chat" ? "text-white" : "text-gray-400"
            }`}
          />
        </button>
        <button onClick={() => setActiveTab("profile")}>
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
