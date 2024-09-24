import React, { createContext, useContext, useState } from "react";
import Notification from "../Notification/Notification"; // Adjust the path

interface NotificationContextProps {
  showNotification: (message: string, type: "success" | "error" | "warning") => void;
}

const NotificationContext = createContext<NotificationContextProps | undefined>(undefined);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotification must be used within a NotificationProvider");
  }
  return context;
};

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notification, setNotification] = useState<{ message: string; type: "success" | "error"| "warning" } | null>(null);

  const showNotification = (message: string, type: "success" | "error" | "warning") => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 3000); 
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
    </NotificationContext.Provider>
  );
};
