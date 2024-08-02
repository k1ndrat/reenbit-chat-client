import { useAuth } from "../context/authContext";
import { deleteChat, getChats } from "../api/chat";
import { useAppContext } from "../context/appContext";
import Dialog from "./Dialog";
import Button from "./Button";

const DeleteChatDialog = ({
  isOpen,
  setIsOpen,
  chatID,
}: {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  chatID: string;
}) => {
  const { currenrUser } = useAuth();

  const { setChats, setCurrentChat, currentChat } = useAppContext();

  return (
    <Dialog isOpen={isOpen} setIsOpen={setIsOpen}>
      <h3 className="mb-4">Do you really want to delete this chat?</h3>
      <div className="flex gap-3">
        <Button
          title="Delete"
          className="py-2 px-8"
          onClick={async (e) => {
            e.preventDefault();

            await deleteChat(chatID);

            setIsOpen(false);
            const data = await getChats(currenrUser?.uid!);
            setChats(data);
            currentChat._id === chatID && setCurrentChat(null!);
          }}
        />

        <Button
          title="Cancel"
          className="py-2 px-8"
          onClick={() => {
            setIsOpen(false);
          }}
        />
      </div>
    </Dialog>
  );
};

export default DeleteChatDialog;
