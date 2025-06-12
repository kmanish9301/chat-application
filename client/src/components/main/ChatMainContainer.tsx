const ChatMainContainer = () => {
  return (
    <div className="flex flex-col h-full w-full bg-gray-900 text-white">
      <div className="flex items-center gap-5 p-4 bg-gray-800 border-b border-gray-700 shadow-sm">
        <img
          src="https://via.placeholder.com/40"
          alt="User Avatar"
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="text-lg font-semibold">John Doe</div>
      </div>

      {/* Scrollable Chat Messages - starts from bottom */}
      <div className="flex-1 overflow-y-auto flex flex-col-reverse px-4 py-2 space-y-2 space-y-reverse">
        {Array.from({ length: 3 }, (_, i) => (
          <div
            key={i}
            className={`max-w-xs p-3 rounded-lg ${
              i % 2 === 0 ? "bg-indigo-600 self-end ml-auto" : "bg-gray-700"
            }`}
          >
            Message {i + 1}
          </div>
        ))}
      </div>

      <div className="p-4 bg-gray-800 border-t border-gray-700">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Type your message..."
            className="w-full px-4 py-2 pr-16 rounded-lg bg-gray-700 text-white focus:outline-none"
          />
          <button className="absolute right-1 top-1/2 -translate-y-1/2 bg-indigo-600 hover:bg-indigo-700 px-4 py-1.5 rounded-md text-sm">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatMainContainer;
