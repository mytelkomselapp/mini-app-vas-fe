import { View } from "@tarojs/components";
import React from "react";
import "./BottomSheet.scss";

interface BottomSheetProps {
  open: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  fullHeight?: boolean;
}

const BottomSheet: React.FC<BottomSheetProps> = ({
  open,
  onClose,
  children,
  fullHeight = false,
}) => {
  return (
    <View className={`bottom-sheet-container ${open ? "visible" : ""}`}>
      {/* Backdrop overlay */}
      {open && <View className="backdrop" onClick={onClose} />}

      {/* Bottom Sheet */}
      <View
        className={`bottom-sheet ${open ? "open" : ""} ${
          fullHeight ? "full-height" : ""
        }`}
      >
        <View className="sheet-header">
          <View className="drag-handle" />
        </View>
        <View className="sheet-content">{children}</View>
      </View>
    </View>
  );
};

export default BottomSheet;
