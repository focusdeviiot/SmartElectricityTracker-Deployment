// AlertComponent.tsx
import React, { useEffect, useMemo, useState } from "react";
import { VscError } from "react-icons/vsc";
import { IoWarningOutline, IoCheckmarkCircleOutline, IoInformationCircleOutline } from "react-icons/io5";

interface AlertProps {
  id: string;
  message: string;
  type?: string;
  removeAlert: (id: string) => void;
}

const AlertComponent: React.FC<AlertProps> = ({ id, message, type, removeAlert }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);

  const alertType = useMemo(() => {
    switch (type) {
      case "error":
        return "bg-red-500 text-white";
      case "success":
        return "bg-green-500 text-white";
      case "warning":
        return "bg-yellow-500 text-black";
      default:
        return "bg-blue-500 text-white";
    }
  }, [type]);

  const icon = useMemo(() => {
    switch (type) {
      case "error":
        return <VscError />;
      case "success":
        return <IoCheckmarkCircleOutline />;
      case "warning":
        return <IoWarningOutline />;
      default:
        return <IoInformationCircleOutline />;
    }
  }, [type]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFading(true);
      setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => {
          removeAlert(id);
        }, 300); // เพิ่มเวลาเล็กน้อยเพื่อให้แอนิเมชั่นการหายทำงาน
      }, 300); // ระยะเวลาของแอนิเมชั่นการหาย
    }, 3000);

    return () => clearTimeout(timer);
  }, [id, removeAlert]);

  if (!isVisible) {
    return null;
  }

  return (
    <div
      role="alert"
      className={`alert ${alertType} animate-slideUp transition-opacity duration-300 ${isFading ? 'opacity-0' : 'opacity-100'}`}
      onClick={() => {
        setIsFading(true);
        setTimeout(() => {
          setIsVisible(false);
          setTimeout(() => removeAlert(id), 300); // เพิ่มเวลาเล็กน้อยเพื่อให้แอนิเมชั่นการหายทำงาน
        }, 300); // ระยะเวลาของแอนิเมชั่นการหาย
      }}
    >
      <div className="flex items-center">
        <div className="mr-2">{icon}</div>
        <span>{message}</span>
      </div>
    </div>
  );
};

export default AlertComponent;