import Taro from "@tarojs/taro";
import * as React from "react";

export interface SvgProps {
  src: any;
  width: string;
  height: string;
  className?: string;
}

const AsSVG: React.FC<SvgProps> = ({ src, className, width, height }) => {
  return <img className={className} src={src} width={width} height={height} />;
};

export default AsSVG;
