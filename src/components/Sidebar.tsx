import Chats from "./Chats";
import Header from "./Header";
import { useState } from "react";

const Sidebar = ({}: // setCurrentChat,
{
  // setCurrentChat: (id: string) => void;
}) => {
  const [search, setSearch] = useState<string>("");

  return (
    <div className="h-screen min-w-[33%] border-r border-[#c0bdbd] overflow-hidden flex flex-col">
      <Header search={search} setSearch={setSearch} />
      <Chats search={search} />
    </div>
  );
};

export default Sidebar;
