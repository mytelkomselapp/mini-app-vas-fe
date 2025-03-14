import { View } from "@tarojs/components";
import React from "react";
import "./BottomSheet.scss";

interface BottomSheetProps {
  open: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  fullHeight?: boolean;
  containerClassname?: string;
  showHeader?: boolean;
  withoutPadding?: boolean;
}

const BottomSheet: React.FC<BottomSheetProps> = ({
  open,
  onClose,
  children,
  fullHeight = false,
  containerClassname = "",
  showHeader = true,
  withoutPadding = false,
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
