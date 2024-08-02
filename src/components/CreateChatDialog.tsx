import { useState } from "react";
import { useAuth } from "../context/authContext";
import { createChat, getChats } from "../api/chat";
import { useAppContext } from "../context/appContext";
import Dialog from "./Dialog";
import Button from "./Button";

const CreateChatDialog = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}) => {
  const { currenrUser } = useAuth();
  const { setChats, setCurrentChat } = useAppContext();

  const [bot_name, setBotName] = useState<string>("");
  const [bot_surname, setBotSurname] = useState<string>("");

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
          title="Create"
          onClick={async (e) => {
            e.preventDefault();
            if (bot_name && bot_surname) {
              const createdChat = await createChat({
                bot_name,
                bot_surname,
                userID: currenrUser?.uid!,
              });
              setBotName("");
              setBotSurname("");
              setIsOpen(false);
              const data = await getChats(currenrUser?.uid!);
              setChats(data);
              setCurrentChat(createdChat);
            }
          }}
        />
      </form>
    </Dialog>
  );
};

export default CreateChatDialog;
