import chatIcon from "../../assets/chat-icon.png";

const Header = () => {
  return (
    <div className="px-4 py-3 flex items-center gap-3">
      <img src={chatIcon} alt="chat icon" className="w-10 h-10" />
      <h1 className="text-2xl font-bold text-white">Chit Chat</h1>
    </div>
  );
};

export default Header;
