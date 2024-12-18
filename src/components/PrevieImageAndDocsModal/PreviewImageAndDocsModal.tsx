import * as React from "react";
import BottomSheet from "../BottomSheet";
import ArrowLeft from "../../assets/arrow-left.svg";
import { View } from "@tarojs/components";
import Taro from "@tarojs/taro";

export interface PreviewImageAndDocsModalProps {
  fileUrl: string;
  open: boolean;
  onClose: () => void;
}

const PreviewImageAndDocsModal: React.FC<PreviewImageAndDocsModalProps> = ({
  open,
  fileUrl,
  onClose,
}) => {
  if (!fileUrl || !open) return null;
  return (
    <BottomSheet
      showHeader={false}
      fullHeight
      open={open}
      onClose={onClose}
      containerClassname={"container"}
    >
      <View>
        <div
          style={{ marginBottom: 16 }}
          className="flex gap-x-[8px] h-auto items-center"
        >
          <img
            src={ArrowLeft}
            onClick={onClose}
            style={{ width: "1.2rem", height: "1.2rem" }}
          />
        </div>
        <View
          style={{
            width: "100%",
            height: "500px",
            border: "1px solid #ccc",
            overflow: "hidden", // Prevent iframe from overflowing
            position: "relative", // Ensure proper placement
          }}
        >
          <iframe
            src={fileUrl}
            title="Preview Image"
            style={{
              width: "100%", // Set iframe width to match the container
              height: "100%", // Set iframe height to match the container
              border: "none", // Optional: Remove default iframe border
            }}
          ></iframe>
        </View>
      </View>
    </BottomSheet>
  );
};

export default PreviewImageAndDocsModal;
