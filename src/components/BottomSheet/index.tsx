import { Text, View } from "@tarojs/components";
import "./BottomSheet.scss";

interface BottomSheetProps {
  open: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  fullHeight?: boolean;
}

const BottomSheet = ({
  open,
  onClose,
  children,
  fullHeight = false,
}: BottomSheetProps) => {
  return (
    <>
      {open && (
        <View className="backdrop" onClick={onClose} /> // Close on backdrop click
      )}
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
    </>
  );
};

export default BottomSheet;
