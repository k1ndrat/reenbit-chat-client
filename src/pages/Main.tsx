import Chat from "../components/Chat";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../context/authContext";
import { useEffect } from "react";
import { IMessage } from "../types/Message";
import { useAppContext } from "../context/appContext";
import { useToast } from "../components/Toast/ToastContext";
import { io } from "socket.io-client";

const Main = () => {
  const { currenrUser } = useAuth();
  const { socket, currentChat, setSocket, updateChats } = useAppContext();

  const toast = useToast();

  useEffect(() => {
    const socketIO = io(import.meta.env.VITE_BASE_API_URL!, {
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
    });

    setSocket(socketIO);
  }, []);

  useEffect(() => {
    const handleNotification = (data: IMessage) => {
      if (
        currentChat?._id !== data.chatID &&
        currenrUser?.uid !== data.author
      ) {
        toast?.open(`${data.author}: ${data.message}`);
      }
      updateChats(data);
    };

    const handleConnect = () => {
      socket.emit("subscribe_notification", currenrUser?.uid);
      currentChat?._id && socket.emit("join_chat", currentChat._id);
    };

    socket && socket.on("receive_notification", handleNotification);
    socket && socket.on("connect", handleConnect);

    return () => {
      socket && socket.off("receive_notification", handleNotification);
      socket && socket.off("connect", handleConnect);
    };
  }, [socket, currentChat, updateChats]);

  return (
    <div className="flex">
      <Sidebar />
      {currentChat && <Chat />}
      {!currentChat && (
        <div className="grid place-content-center w-full font-semibold">
          Please choose chat
        </div>
      )}
    </div>
  );
};

export default Main;
