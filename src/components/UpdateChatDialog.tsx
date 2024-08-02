import { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import { getChats, updateChat } from "../api/chat";
import { useAppContext } from "../context/appContext";
import Dialog from "./Dialog";
import { IChat } from "../types/Message";
import Button from "./Button";

const UpdateChatDialog = ({
  isOpen,
  setIsOpen,
  chat,
}: {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  chat: IChat;
}) => {
  const { currenrUser } = useAuth();
  const { setChats, setCurrentChat, currentChat } = useAppContext();

  const [bot_name, setBotName] = useState<string>("");
  const [bot_surname, setBotSurname] = useState<string>("");

  useEffect(() => {
    setBotName(chat?.bot_name || "");
    setBotSurname(chat?.bot_surname || "");
  }, [chat]);

  return (
    <Dialog isOpen={isOpen} setIsOpen={setIsOpen}>
      <form className="">
        <input
          required
          className="py-2 w-full mb-2 bg-transparent px-4 outline-none placeholder:font-semibold  rounded-xl border border-[#c0bdbd]"
          type="text"
          placeholder="Name"
          onChange={(e) => setBotName(e.target.value)}
          value={bot_name}
        />
        <input
          required
          className="py-2 w-full mb-2 bg-transparent px-4 outline-none placeholder:font-semibold  rounded-xl border border-[#c0bdbd]"
          type="text"
          placeholder="Surname"
          onChange={(e) => setBotSurname(e.target.value)}
          value={bot_surname}
        />
        <Button
          title="Update"
          onClick={async (e) => {
            e.preventDefault();
            if (bot_name && bot_surname) {
              await updateChat({
                ...chat,
                bot_name,
                bot_surname,
              });
              setBotName("");
              setBotSurname("");
              setIsOpen(false);
              const data: IChat[] = await getChats(currenrUser?.uid!);
              setChats(data);

              const newCurrentChat = data.find(
                (chat) => chat._id === currentChat._id
              );

              newCurrentChat?.bot_name !== currentChat.bot_name ||
                (newCurrentChat?.bot_surname !== currentChat.bot_surname &&
                  setCurrentChat(newCurrentChat));
            }
          }}
        />
      </form>
    </Dialog>
  );
};

export default UpdateChatDialog;
