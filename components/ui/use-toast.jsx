"use client"

import { createContext, useContext, useState, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback(
    ({ title, description, variant = "default", duration = 5000 }) => {
      const id = uuidv4();
      setToasts((prevToasts) => [
        ...prevToasts,
        { id, title, description, variant },
      ]);

      setTimeout(() => {
        setToasts((prevToasts) =>
          prevToasts.filter((toast) => toast.id !== id)
        );
      }, duration);
    },
    []
  );

  const removeToast = useCallback((id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} />
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === null) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

const ToastContainer = ({ toasts }) => (
  <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
    {toasts.map((toast) => (
      <Toast key={toast.id} {...toast} />
    ))}
  </div>
);

const Toast = ({ id, title, description, variant }) => {
  const { removeToast } = useToast();

  const variantClasses = {
    default: "bg-white text-gray-900",
    success: "bg-green-500 text-white",
    error: "bg-red-500 text-white",
    warning: "bg-yellow-500 text-white",
  };

  return (
    <div
      className={`p-4 rounded shadow-lg ${variantClasses[variant]} max-w-sm`}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold">{title}</h3>
          <p className="text-sm">{description}</p>
        </div>
        <button
          onClick={() => removeToast(id)}
          className="text-sm font-semibold"
        >
          ×
        </button>
      </div>
    </div>
  );
};
