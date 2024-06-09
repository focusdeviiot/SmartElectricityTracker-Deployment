import React, { useMemo, useState } from "react";
import { cn } from "../../helpers/MergeClassName";

interface AsyncButtonProps {
  title?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => Promise<void>;
  children: React.ReactNode;
  className?: string;
  loading?: boolean;
  disabled?: boolean;
}

const AsyncButton: React.FC<AsyncButtonProps> = ({
  title,
  type,
  onClick,
  children,
  className,
  loading,
  disabled ,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const handleClick = async () => {
    if (!onClick || loadingValid) return;
    setIsLoading(true);
    try {
      await onClick();
    } finally {
      setIsLoading(false);
    }
  };

  const loadingValid = useMemo(() => {
    return loading ?? isLoading;
  }, [loading, isLoading]);

  const ButtonLoading: React.FC = () => {
    return (
      <div className="flex items-center justify-center gap-2">
        <span className="loading loading-spinner loading-xs"></span>
        <p>Loading</p>
      </div>
    );
  };

  return (
    <button
      title={title}
      type={type}
      onClick={type === "button" ? handleClick : undefined} // ถ้าเป็น submit หรือ reset ให้ไม่ต้องเรียก handleClick
      disabled={disabled}
      className={cn( 
        "btn btn-primary btn-sm shadow-lg shadow-blue-500/50 disabled:opacity-50 disabled:bg-blue-500 disabled:text-base-300 disabled:shadow-none",
        className,
        loadingValid && "!cursor-progress",
        disabled  && "!cursor-no-drop"
      )}
    >
      {loadingValid ? <ButtonLoading /> : children}
    </button>
  );
};

export default AsyncButton;
