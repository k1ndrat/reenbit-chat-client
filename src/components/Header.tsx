import { useState } from "react";
import { useAuth } from "../context/authContext";
import { doSignOut } from "../firebase/auth";
import CreateChatDialog from "./CreateChatDialog";
import { useAppContext } from "../context/appContext";
import Button from "./Button";
import { useToast } from "./Toast/ToastContext";

const Header = ({
  search,
  setSearch,
}: {
  search: string;
  setSearch: (value: string) => void;
}) => {
  const { currenrUser } = useAuth();
  const { setCurrentChat, setChats, socket } = useAppContext();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [showCreateButton, setShowCreateButton] = useState<boolean>(false);

  const { setToasts } = useToast();
  return (
    <header className="p-4 bg-[#F5F5F5] border-b border-[#c0bdbd]">
      <div className="flex items-center justify-between mb-8">
        <div className="flex gap-4 items-center">
          <img
            className="rounded-full h-12 w-12"
            src={
              currenrUser?.photoURL ||
              "https://png.pngtree.com/png-vector/20220807/ourmid/pngtree-man-avatar-wearing-gray-suit-png-image_6102786.png"
            }
            alt="Image"
          />
          <p>{currenrUser?.email}</p>
        </div>

        <Button
          title={"Log out"}
          isSmall={true}
          onClick={() => {
            doSignOut();
            setCurrentChat(null!);
            setChats([]);
            setToasts([]);
            socket.close();
          }}
        />
      </div>
      <div>
        <div className="py-2 px-3 w-full rounded-3xl border border-[#c0bdbd] bg-[#FAFAFA] flex items-center">
          <img
            className="h-3"
            src="https://www.svgrepo.com/show/7109/search.svg"
            alt="search-icon"
          />
          <input
            className="bg-transparent px-2 w-full outline-none placeholder:font-semibold"
            type="text"
            placeholder="Search or start new chat"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => {
              setShowCreateButton(true);
            }}
            // onBlur={() => {
            //   setShowCreateButton(false);
            // }}
          />
        </div>

        {showCreateButton && (
          <Button
            title="Create new chat"
            className="mt-4"
            onClick={() => {
              setIsOpen(true);
              console.log("open");
            }}
          />
        )}
      </div>

      <CreateChatDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        // setChats={setChats}
      />
    </header>
  );
};

export default Header;
