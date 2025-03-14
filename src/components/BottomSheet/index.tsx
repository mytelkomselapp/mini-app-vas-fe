import { View } from "@tarojs/components";
import React from "react";
import "./BottomSheet.scss";
import IconClose from "../../assets/icon-close.svg";

interface BottomSheetProps {
  open: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  fullHeight?: boolean;
  containerClassname?: string;
  showHeader?: boolean;
  withoutPadding?: boolean;
  withFloatingCloseButton?: boolean;
}

const BottomSheet: React.FC<BottomSheetProps> = ({
  open,
  onClose,
  children,
  fullHeight = false,
  containerClassname = "",
  showHeader = true,
  withoutPadding = false,
  withFloatingCloseButton = false,
}) => {
  return (
    <View className={`bottom-sheet-container ${open ? "visible" : ""}`}>
      {/* Backdrop overlay */}
      <View className={`backdrop ${open ? "active" : ""}`} onClick={onClose} />

      {/* Bottom Sheet */}
      <View
        className={`bottom-sheet ${containerClassname} ${open ? "open" : ""} ${
          fullHeight ? "full-height" : ""
        }`}
      >
        {withFloatingCloseButton && open && (
          <div
            onClick={onClose}
            className="fixed top-[-42px] w-full flex justify-end h-[32px] right-[16px] pb-[16px] bg-opacity-0"
          >
            <img src={IconClose} width={"32px"} height={"32px"} />
          </div>
        )}
        {showHeader && (
          <View className="sheet-header">
            <View className="drag-handle" />
          </View>
        )}
        <View
          className={`${
            withoutPadding ? "sheet-content-without-padding" : "sheet-content"
          }`}
        >
          {children}
        </View>
      </View>
    </View>
  );
};

export default BottomSheet;
