import { createContext, useContext, useState } from "react";
import Toast from "./Toast";

interface TextContextValue {
  open: (message: string, type?: ToastType) => void;
  close: (id: number) => void;
  setToasts: (value: IToast[]) => void;
}

export const ToastContext = createContext<TextContextValue>(null!);

export const useToast = () => useContext(ToastContext);

interface ToastProviderProperties {
  children: React.ReactElement;
}

export type ToastType = "ERROR" | "PRIMARY";

interface IToast {
  message: string;
  id: number;
  type: ToastType;
}

export function ToastProvider({ children }: ToastProviderProperties) {
  const [toasts, setToasts] = useState<IToast[]>([]);

  const openToast = (message: string, type: ToastType = "PRIMARY") => {
    const newToast = {
      id: Date.now(),
      message,
      type,
    };
    setToasts((prev) => [...prev, newToast]);
  };

  const closeToast = (id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const value = {
    open: openToast,
    close: closeToast,
    setToasts,
  };
  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="toasts fixed top-4 right-8 flex flex-col gap-3">
        {toasts &&
          toasts.map((toast) => (
            <Toast
              key={toast.id}
              message={toast.message}
              close={() => closeToast(toast.id)}
              type={toast.type}
            />
          ))}
      </div>
    </ToastContext.Provider>
  );
}
