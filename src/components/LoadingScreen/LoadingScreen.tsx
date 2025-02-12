import React from "react";
// import { ReactComponent as IcoLoader } from "../../assets/ico-loader.svg";
import IconLoader from "../../assets/ico-loader.svg";
interface Props {
  text: string;
  customClassName?: string;
}

const LoadingScreen: React.FC<Props> = ({ text, customClassName = "" }) => {
  return (
    <div className="flex justify-center items-center w-full h-full absolute bottom-0 left-0 right-0 top-0 bg-backdrop backdrop-blur-md max-w-[425px] m-auto">
      <div
        className={`flex flex-col justify-center items-center gap-y-4 bg-white rounded-[16px] px-4 py-6 w-[90%] ${customClassName}`}
      >
        <img src={IconLoader} className="w-20 h-20 animate-spin" />
        <p className="text-[14px] font-bold text-shadesBlack">
          {text ?? "Loading..."}
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;
