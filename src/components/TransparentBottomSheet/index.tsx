import { View } from "@tarojs/components";
import React from "react";
import "./TransparentBottomSheet.scss";
import Show from "../Show";

interface TransparentBottomSheetProps {
  open: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  fullHeight?: boolean;
  containerClassname?: string;
  showHeader?: boolean;
  snapPoints?: number[]; // Array of percentage heights (e.g., [25, 50, 100])
  initialSnap?: number; // Initial snap point index
}

const TransparentBottomSheet: React.FC<TransparentBottomSheetProps> = ({
  open,
  onClose,
  children,
  fullHeight = false,
  containerClassname = "",
  showHeader = true,
  snapPoints = [100],
  initialSnap = 0,
}) => {
  const [currentSnap, setCurrentSnap] = React.useState(initialSnap);
  const [isDragging, setIsDragging] = React.useState(false);
  const [startY, setStartY] = React.useState(0);
  const [currentY, setCurrentY] = React.useState(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartY(e.touches[0].clientY);
    setCurrentY(e.touches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    setCurrentY(e.touches[0].clientY);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    const diff = currentY - startY;
    const threshold = 50; // pixels

    if (Math.abs(diff) > threshold) {
      // Determine which snap point to go to
      if (diff > 0) {
        // Dragging down
        const nextSnap = Math.max(currentSnap - 1, 0);
        setCurrentSnap(nextSnap);
      } else {
        // Dragging up
        const nextSnap = Math.min(currentSnap + 1, snapPoints.length - 1);
        setCurrentSnap(nextSnap);
      }
    }
  };

  const currentHeight = snapPoints[currentSnap];

  return (
    <View className={`${open ? "visible" : ""}`}>
      {/* Backdrop overlay */}
      {/* <View className={`backdrop ${open ? "active" : ""}`} onClick={onClose} /> */}

      {/* Bottom Sheet */}
      <View
        className={`bottom-sheet ${containerClassname} ${open ? "open" : ""} ${
          fullHeight ? "full-height" : ""
        }`}
        style={{ height: `${currentHeight}%` }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {showHeader && (
          <View className="sheet-header">
            <View className="drag-handle" />
          </View>
        )}

        <View className="sheet-content">{children}</View>
      </View>
    </View>
  );
};

export default TransparentBottomSheet;
