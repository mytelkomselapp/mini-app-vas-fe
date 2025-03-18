import { useState } from "react";
import { View, Image, ImageProps } from "@tarojs/components";

export interface ZoomableImageProps extends ImageProps {
  src: string;
  className: string;
}

const ZoomableImage: React.FC<ZoomableImageProps> = (props) => {
  const [scale, setScale] = useState(1);

  const handleTouchMove = (e) => {
    if (e.touches.length === 2) {
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const distance = Math.hypot(
        touch2.clientX - touch1.clientX,
        touch2.clientY - touch1.clientY
      );
      setScale(distance / 200);
    }
  };

  const handleTouchEnd = () => {
    setScale(1);
  };

  return (
    <Image
      {...props}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      src={props?.src}
      className={`${props?.className}`}
      style={{ transform: `scale(${scale})`, transition: "transform 0.2s" }}
    />
  );
};

export default ZoomableImage;
