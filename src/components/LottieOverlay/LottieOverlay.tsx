import React from "react";

export interface LottieOverlayProps {}

const LottieOverlay: React.FC<LottieOverlayProps> = () => {
  return (
    <div className="flex justify-center items-center absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.5)] z-50"></div>
  );
};

export default LottieOverlay;
