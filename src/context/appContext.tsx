import { createContext, useContext, useState } from "react";
import { Socket } from "socket.io-client";
import { IChat } from "../types/Message";

interface IAppContext {
  socket: Socket;
  setSocket: (value: Socket) => void;
  setChats: (value: IChat[]) => void;
  chats: IChat[];
  setCurrentChat: (value: IChat) => void;
  currentChat: IChat;
}

const AppContext = createContext<IAppContext>(null!);

export function useAppContext() {
  return useContext(AppContext);
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [chats, setChats] = useState<IChat[]>([]);
  const [socket, setSocket] = useState<Socket>(null!);
  const [currentChat, setCurrentChat] = useState<IChat>(null!);

  const value = {
    socket,
    setSocket,
    chats,
    setChats,
    currentChat,
    setCurrentChat,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
