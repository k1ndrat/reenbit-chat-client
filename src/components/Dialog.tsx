const Dialog = ({
  isOpen,
  setIsOpen,
  children,
}: {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  children: React.ReactNode;
}) => {
  if (!isOpen) return <></>;

  return (
    <div
      className="w-screen h-screen absolute bg-[rgba(0,0,0,0.5)] left-0 top-0 place-content-center grid z-20"
      onClick={(e) => {
        e.currentTarget === e.target && setIsOpen(false);
      }}
    >
      <div className="max-w-sm w-full bg-white py-6 px-6 rounded-2xl shadow-xl">
        {children}
      </div>
    </div>
  );
};

export default Dialog;
