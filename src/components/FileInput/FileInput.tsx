import { View, Button } from "@tarojs/components";
import Taro from "@tarojs/taro";

interface Props {
  config: Taro.chooseImage.Option | Taro.chooseMessageFile.Option;
  type: "file" | "image";
}

const FileInput: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  config,
  type,
}) => {
  // Handler for selecting an image
  const handleFileSelect = () => {
    if (type === "image") {
      return Taro.chooseImage(config as Taro.chooseImage.Option);
    }

    Taro.chooseMessageFile(config as Taro.chooseMessageFile.Option);
  };

  return (
    <View
      style={{
        backgroundColor: "transparent",
        width: 56,
        height: 56,
        cursor: "pointer",
      }}
      className="flex justify-center items-center"
      onClick={handleFileSelect}
    >
      {children}
    </View>
  );
};

export default FileInput;
