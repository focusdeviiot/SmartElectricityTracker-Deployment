// AlertContext.tsx
import React, { createContext, useContext, useState } from "react";
import AlertComponent from "../components/Alert/Alert";
import { v4 as uuidv4 } from 'uuid';

interface Alert {
  id: string;
  message: string;
  type?: string;
}

interface AlertContextProps {
  showAlert: (message: string, type?: string) => void;
}

const AlertContext = createContext<AlertContextProps | undefined>(undefined);

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert must be used within an AlertProvider");
  }
  return context;
};

export const AlertProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  const showAlert = (message: string, type?: string) => {
    const id = uuidv4();
    setAlerts((prevAlerts) => [...prevAlerts, { id, message, type }]);
  };

  const removeAlert = (id: string) => {
    setAlerts((prevAlerts) => prevAlerts.filter((alert) => alert.id !== id));
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 mb-4 px-4 py-2 rounded shadow-lg">
        {alerts.map((alert) => (
          <AlertComponent
            key={alert.id}
            id={alert.id}
            message={alert.message}
            type={alert.type}
            removeAlert={removeAlert}
          />
        ))}
      </div>
    </AlertContext.Provider>
  );
};
