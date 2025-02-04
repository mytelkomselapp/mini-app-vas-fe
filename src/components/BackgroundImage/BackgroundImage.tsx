import * as React from "react";

export interface BackgroundImageProps {
  imageUrl: any | string;
  className: string;
  /** The default is cover */
  bgSize?: "cover" | "contain";
  onClick?: () => void;
}

const BackgroundImage: React.FC<
  React.PropsWithChildren<BackgroundImageProps>
> = ({ children, imageUrl, className, bgSize = "cover", onClick }) => {
  return (
    <div
      onClick={onClick}
      style={{
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: bgSize,
        backgroundRepeat: "no-repeat",
      }}
      className={className}
    >
      {children}
    </div>
  );
};

export default BackgroundImage;
