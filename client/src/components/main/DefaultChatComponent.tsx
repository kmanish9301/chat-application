const DefaultChatComponent = () => {
  return (
    <div className="flex items-center justify-center h-full text-white text-center px-6">
      <div className="flex flex-col items-center max-w-xl">
        <div className="p-1 rounded-full bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 shadow-xl mb-6 animate-pulse">
          <div className="bg-gray-900 p-6 rounded-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 8h10M7 12h6m-1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
              />
            </svg>
          </div>
        </div>

        <h1 className="text-4xl font-extrabold mb-3 tracking-tight leading-tight">
          Welcome to{" "}
          <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-400 text-transparent bg-clip-text">
            Chit Chat
          </span>{" "}
          💬
        </h1>

        <p className="text-gray-300 text-base mb-4">
          Your friendly space to talk, share, and connect — all in real-time.
        </p>

        <p className="text-gray-400 mb-6">
          ✨ Whether you're catching up with friends or collaborating with
          teammates,
          <br />
          Chit Chat offers a smooth and lively chatting experience that just
          feels right.
        </p>

        <div className="border-t border-gray-700 w-full mb-6"></div>

        <p className="text-sm text-gray-300 italic">
          "Great conversations begin with a single message..."
        </p>

        <p className="text-xs text-gray-400 mt-2">
          Tip: No awkward silences here — just pick a chat and start typing.
          Magic happens when you say hello! 👋
        </p>
      </div>
    </div>
  );
};

export default DefaultChatComponent;
