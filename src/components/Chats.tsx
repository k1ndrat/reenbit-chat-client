import { IChat } from "../types/Message";
import { useAuth } from "../context/authContext";
import { useEffect, useState } from "react";
import { getChats } from "../api/chat";
import { useAppContext } from "../context/appContext";
import UpdateChatDialog from "./UpdateChatDialog";
import DeleteChatDialog from "./DeleteChatDialog";
import Button from "./Button";

const Chats = ({ search }: { search: string }) => {
  const { currenrUser } = useAuth();
  const { chats, setChats, setCurrentChat, currentChat } = useAppContext();

  const [filteredChats, setFilteredChats] = useState<IChat[]>([]);
  const [isLoadingChats, setIsLoadingChats] = useState<boolean>(true);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [deleteIsOpen, setDeleteIsOpen] = useState<boolean>(false);
  const [updateOpt, setUpdateOpt] = useState<IChat>(null!);
  const [deleteOpt, setDeleteOpt] = useState<string>("");

  const clickChat = (chat: IChat) => {
    setCurrentChat(chat);
  };

  useEffect(() => {
    const receiveChats = async () => {
      const data = await getChats(currenrUser?.uid!);
      setIsLoadingChats(false);
      setChats(data);
      setFilteredChats(data);
    };

    setIsLoadingChats(true);
    receiveChats();
  }, []);

  useEffect(() => {
    setFilteredChats(
      chats.filter((chat) => {
        const parts = search.toLowerCase().split(" ");
        if (!parts[1]) parts[1] = "";

        return (
          (chat.bot_name.toLowerCase().startsWith(parts[0]) &&
            chat.bot_surname.toLowerCase().startsWith(parts[1])) ||
          (chat.bot_name.toLowerCase().startsWith(parts[1]) &&
            chat.bot_surname.toLowerCase().startsWith(parts[0]))
        );
      })
    );
  }, [search, chats]);

  return (
    <div className="overflow-y-auto py-4">
      <h3 className="p-4 text-xl opacity-50">Chats</h3>
      {!isLoadingChats && (
        <ul className="flex flex-col py-4">
          {filteredChats.map((chat, index) => (
            <li
              className={`p-4 cursor-pointer transition-all flex items-center gap-3 border-b border-[#c0bdbd] ${
                currentChat?._id === chat._id ? "bg-[#F5F5F5] font-bold" : ""
              }`}
              key={index}
              onClick={() => {
                clickChat(chat);
              }}
            >
              <img
                className="rounded-full h-12 w-12"
                src={
                  "https://cdn3.iconfinder.com/data/icons/avatars-flat/33/man_5-512.png"
                }
                alt="Image"
              />
              <div className="w-full">
                <div className="flex justify-between">
                  <p>
                    {chat.bot_name} {chat.bot_surname}
                  </p>
                  <p className="font-normal text-xs">Aug 17, 2022</p>
                </div>
                <p className="font-normal">Lorem ipsum dolor sit amet.</p>
              </div>
              <div className="flex flex-col gap-1 text-sm">
                <Button
                  title="Update"
                  isSmall={true}
                  onClick={(e) => {
                    e.stopPropagation();
                    setUpdateOpt({
                      ...chat,
                      bot_name: chat.bot_name,
                      bot_surname: chat.bot_surname,
                    });
                    setIsOpen(true);
                  }}
                />

                <Button
                  className="text-red-700"
                  title="Delete"
                  isSmall={true}
                  onClick={(e) => {
                    e.stopPropagation();
                    setDeleteOpt(chat._id);
                    setDeleteIsOpen(true);
                  }}
                />
              </div>
            </li>
          ))}
        </ul>
      )}

      {isLoadingChats && <p className="p-4">Loading...</p>}

      <UpdateChatDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        chat={updateOpt}
      />
      <DeleteChatDialog
        chatID={deleteOpt}
        isOpen={deleteIsOpen}
        setIsOpen={setDeleteIsOpen}
      />
    </div>
  );
};

export default Chats;
