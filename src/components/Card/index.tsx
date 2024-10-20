import { cn } from "../../lib/utils";
import { PropsWithChildren } from "react";

interface Props {
  className?: string;
}

const Card: React.FC<PropsWithChildren & Props> = ({ children, className }) => {
  return (
    <div className={cn("flex rounded-2xl bg-white p-3", className)}>
      {children}
    </div>
  );
};

export default Card;
