import { useEffect, useRef } from "react";
import { ToastType } from "./ToastContext";

interface ToastProperties {
  message: string;
  close: () => void;
  type: ToastType;
}

const useTimeout = (callbackFunction: () => void) => {
  const savedCallback = useRef(callbackFunction);

  useEffect(() => {
    savedCallback.current = callbackFunction;
  }, [callbackFunction]);

  useEffect(() => {
    const functionId = setTimeout(() => savedCallback.current(), 5000);

    return () => clearTimeout(functionId);
  }, []);
};

const Toast = ({ message, close, type }: ToastProperties) => {
  useTimeout(() => {
    close();
  });
  return (
    <div
      className={`animate-slideIn  border border-[#c0bdbd] text-black rounded-md p-4 w-80 relative flex justify-between items-start shadow-xl ${
        type === "ERROR" ? "bg-red-600" : "bg-[#F5F5F5]"
      }`}
    >
      <p>{message}</p>
      <button className="" onClick={close}>
        {"\u274C"}
      </button>
    </div>
  );
};

export default Toast;
