import { useEffect, useRef, useState } from "react";
import { IMessage } from "../types/Message";
import { useAuth } from "../context/authContext";
import { useAppContext } from "../context/appContext";
import { getMessages } from "../api/chat";

const Chat = () => {
  const { currenrUser } = useAuth();
  const { socket, currentChat, updateChats } = useAppContext();

  const [input, setInput] = useState<string>("");
  const [messageList, setMessageList] = useState<IMessage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const inputRef = useRef<HTMLInputElement>(null!);
  const bottomRef = useRef<HTMLDivElement>(null!);

  const sendMessage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (input) {
      const messageData: IMessage = {
        author: currenrUser?.uid || "",
        message: input,
        chatID: currentChat._id,
        bot: currentChat.bot_name + " " + currentChat.bot_surname,
        createdAt: new Date(Date.now()).toISOString(),
      };

      socket.emit("message", messageData);

      updateChats(messageData);

      setMessageList((prev) => [...prev, messageData]);
      setInput("");
    }
  };

  const scrollBottom = () => {
    bottomRef.current &&
      bottomRef.current.scrollIntoView({
        behavior: "instant",
      });
  };

  useEffect(scrollBottom, [messageList]);

  useEffect(() => {
    const handleReceive = (data: IMessage) => {
      if (currentChat._id == data.chatID) {
        setMessageList((prev) => [...prev, data]);
        updateChats(data);
      }
    };

    socket.emit("join_chat", currentChat._id);
    socket.on("receive_message", handleReceive);

    return () => {
      socket.off("receive_message", handleReceive);
    };
  }, [socket, setMessageList, currentChat]);

  useEffect(() => {
    const fetchMessages = async () => {
      setIsLoading(true);
      const data = await getMessages(currentChat._id);

      setMessageList(data);

      setIsLoading(false);
    };

    fetchMessages();
    inputRef.current.focus();
    setInput("");
  }, [currentChat]);

  const getTimeFromISO = (dateString: string) => {
    const date = new Date(dateString);

    const formattedDate = date.toLocaleString("en-GB", {
      hour12: true,
    });

    return formattedDate.toUpperCase();
  };

  return (
    <div className="w-full flex flex-col max-h-screen">
      <div className="sticky py-4 px-8 bg-[#F5F5F5] font-bold border-b border-[#c0bdbd] flex gap-4 items-center">
        <img
          className="rounded-full h-8 w-8"
          src={
            "https://cdn3.iconfinder.com/data/icons/avatars-flat/33/man_5-512.png"
          }
          alt="Image"
        />
        <p>
          {currentChat.bot_name} {currentChat.bot_surname}
        </p>
      </div>
      <div className="flex-grow overflow-y-scroll p-4">
        {!isLoading && messageList.length > 0 && (
          <>
            <ul className="flex flex-col gap-4">
              {messageList.map((messageContent, index) => (
                <li
                  key={index}
                  className={`max-w-[70%] flex flex-col ${
                    messageContent.author === currenrUser?.uid
                      ? "self-end items-end"
                      : "self-start "
                  }`}
                >
                  <div
                    className={`rounded-[21px] py-3 px-5 border-black ${
                      messageContent.author === currenrUser?.uid
                        ? " bg-[#DFDFDF]"
                        : " bg-[#3A4255] text-white"
                    }`}
                  >
                    {`${messageContent.message}`}
                  </div>
                  <div
                    className={`text-xs mt-2 ${
                      messageContent.author === currenrUser?.uid
                        ? "text-right"
                        : ""
                    }`}
                  >
                    {getTimeFromISO(messageContent.createdAt) || ""}
                  </div>
                </li>
              ))}
            </ul>
            <div ref={bottomRef} />
          </>
        )}
        {isLoading && (
          <div className="grid place-content-center h-full">Loading...</div>
        )}
        {!isLoading && messageList.length === 0 && (
          <div className="grid place-content-center h-full font-semibold">
            Please start conversation
          </div>
        )}
      </div>
      <form className="flex p-5 border-t  bg-[#F5F5F5]  border-[#c0bdbd] ">
        <div className="w-full flex py-3 px-3 rounded-xl border border-[#c0bdbd]">
          <input
            className="px-2 flex-grow bg-transparent placeholder:font-semibold outline-none"
            type="text"
            placeholder="Your message"
            onChange={(e) => {
              setInput(e.target.value);
            }}
            value={input}
            ref={inputRef}
          />
          <button className="px-2" onClick={sendMessage}>
            <img
              className="h-6"
              src="https://static-00.iconduck.com/assets.00/send-icon-1024x1011-38wtwa0n.png"
              alt="send-icon"
            />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chat;
