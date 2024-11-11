import { View } from "@tarojs/components";
import React from "react";
import "./BottomSheet.scss";
import Show from "../Show";

interface BottomSheetProps {
  open: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  fullHeight?: boolean;
  containerClassname?: string;
  showHeader?: boolean;
}

const BottomSheet: React.FC<BottomSheetProps> = ({
  open,
  onClose,
  children,
  fullHeight = false,
  containerClassname,
  showHeader = true,
}) => {
  return (
    <View className={`bottom-sheet-container ${open ? "visible" : ""}`}>
      {/* Backdrop overlay */}
      {open && <View className="backdrop" onClick={onClose} />}

      {/* Bottom Sheet */}
      <View
        className={`bottom-sheet ${containerClassname} ${open ? "open" : ""} ${
          fullHeight ? "full-height" : ""
        }`}
      >
        <Show when={showHeader}>
          <View className="sheet-header">
            <View className="drag-handle" />
          </View>
        </Show>

        <View className="sheet-content">{children}</View>
      </View>
    </View>
  );
};

export default BottomSheet;
