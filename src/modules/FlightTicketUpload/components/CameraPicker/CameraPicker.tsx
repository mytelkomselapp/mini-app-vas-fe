import Show from "../../components/Show";
import * as React from "react";
import Camera from "react-html5-camera-photo";
import ArrowLeft from "../../assets/arrow-left.svg";
import style from "./CameraPicker.module.css";

interface Props {
  open: boolean;
  onCapture: (dataUri: string) => void;
  onClose: () => void;
}

const CameraPicker: React.FC<Props> = ({ open, onCapture, onClose }) => {
  const handleTakePhoto = (dataUri: string) => {
    console.log({ dataUri });
    onCapture?.(dataUri);
    onClose?.();
  };

  return (
    <Show when={open}>
      <div className="fixed w-full bg-transparent top-0 left-0 bottom-0 flex justify-center items-center">
        <div className="w-full max-w-[425px] h-full bg-black flex flex-col justify-center">
          <div className="fixed top-0 transparent h-[50px] w-full flex items-center px-[16px]">
            <img
              src={ArrowLeft}
              onClick={onClose}
              className={style["arrow-left"]}
            />
          </div>
          <Camera onTakePhoto={handleTakePhoto} isImageMirror isSilentMode />
        </div>
      </div>
    </Show>
  );
};

export default CameraPicker;
