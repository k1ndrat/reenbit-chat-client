import Chats from "./Chats";
import Header from "./Header";
import { useState } from "react";

const Sidebar = () => {
  const [search, setSearch] = useState<string>("");

  return (
    <div className="h-screen flex-[33%] min-w-96 flex-shrink-0 border-r border-[#c0bdbd] overflow-hidden flex flex-col">
      <Header search={search} setSearch={setSearch} />
      <Chats search={search} />
    </div>
  );
};

export default Sidebar;
