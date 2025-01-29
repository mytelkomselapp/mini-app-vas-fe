import * as React from "react";

export interface BackgroundImageProps {
  imageUrl: any | string;
  className: string;
  /** The default is cover */
  bgSize?: "cover" | "contain";
}

const BackgroundImage: React.FC<
  React.PropsWithChildren<BackgroundImageProps>
> = ({ children, imageUrl, className, bgSize = "cover" }) => {
  return (
    <div
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
