import chatIcon from "../../assets/chat-icon.png";
const Header = () => {
  return (
    <div className="px-4 py-2 flex align-middle justify-center gap-3">
      <img src={chatIcon} alt="chat icon" width={"40rem"} height={"1rem"} />
      <h1 className="text-3xl font-bold">Chit Chat</h1>
    </div>
  );
};

export default Header;
