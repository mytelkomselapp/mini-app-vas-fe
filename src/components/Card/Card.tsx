import { View } from "@tarojs/components";

export interface CardProps {
  bgColor?: string;
  /** Border radius in css */
  borderRadius?: number;
  /** Padding in css  */
  padding?: string;
  className?: string;
  border?: string;
}

const Card: React.FC<React.PropsWithChildren<CardProps>> = ({
  bgColor = "white",
  borderRadius = "12px",
  padding = "8px",
  children,
  className = "",
  border = "",
}) => {
  return (
    <View
      style={{
        backgroundColor: bgColor,
        borderRadius,
        padding,
        border,
      }}
      className={`shadow-lg ${className}`}
    >
      {children}
    </View>
  );
};

export default Card;
