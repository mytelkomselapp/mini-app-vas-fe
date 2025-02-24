import { Text } from "@tarojs/components";
import React, { useState } from "react";
import CancelBlack from "../../assets/cancel-black.svg";
import CheckBlack from "../../assets/check-black.svg";
import "./NotificationToast.css";

export interface NotificationToastProps {
  description: string;
  duration: number;
  show: boolean;
  onClose: () => void;
  type?: "success" | "error";
  fontWeight?: "bold" | "normal";
}

const NotificationToast: React.FC<NotificationToastProps> = ({
  description,
  duration,
  show,
  onClose,
  type = "error",
  fontWeight = "bold",
}) => {
  const [isShow, setIsShow] = useState(show);

  React.useEffect(() => {
    setIsShow(show);

    if (show) {
      const timeout = setTimeout(() => {
        setIsShow(false);
        onClose();
      }, duration);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [show, duration, onClose]);

  if (!isShow) return null;

  return (
    <div
      className="fixed top-8 left-0 h-full w-[calc(100%-32px)]"
      style={{ zIndex: 1001 }}
    >
      <div className="rounded-[100px] bg-white min-h-[58px] flex items-center gap-x-4 px-[16px] w-[90%] ml-[5%] animate-[slide-in-from-top_0.5s_ease-in-out_1_normal_backwards_running]">
        <img
          src={type === "error" ? CancelBlack : CheckBlack}
          alt="cancel"
          width="20px"
          height="20px"
        />
        <Text
          className={`text-[12px] ${
            fontWeight === "bold" ? "font-bold" : "font-normal"
          } text-black`}
        >
          {description}
        </Text>
      </div>
    </div>
  );
};

export default NotificationToast;
