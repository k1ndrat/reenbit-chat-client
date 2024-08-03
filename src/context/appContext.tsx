import { createContext, useContext, useState } from "react";
import { Socket } from "socket.io-client";
import { IChat, IMessage } from "../types/Message";

interface IAppContext {
  socket: Socket;
  setSocket: (value: Socket) => void;
  setChats: (value: IChat[]) => void;
  chats: IChat[];
  setCurrentChat: (value: IChat) => void;
  currentChat: IChat;
  updateChats: (value: IMessage) => void;
}

const AppContext = createContext<IAppContext>(null!);

export function useAppContext() {
  return useContext(AppContext);
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [chats, setChats] = useState<IChat[]>([]);
  const [socket, setSocket] = useState<Socket>(null!);
  const [currentChat, setCurrentChat] = useState<IChat>(null!);

  const updateChats = (data: IMessage) => {
    const foundChat = chats.find((chat) => chat._id === data.chatID);

    const filteredChats = chats.filter((chat) => chat._id !== data.chatID);

    setChats([{ ...foundChat!, last_message: data }, ...filteredChats]);
  };

  const value = {
    socket,
    setSocket,
    chats,
    setChats,
    currentChat,
    setCurrentChat,
    updateChats,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
