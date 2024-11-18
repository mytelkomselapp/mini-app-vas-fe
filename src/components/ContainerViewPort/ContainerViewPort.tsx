import useWindowSize from "../../hooks/useWindowSize";
import * as React from "react";

const ContainerViewPort: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { height } = useWindowSize();
  // alert(height);
  const initialHeight = Number(height) - 30;

  return (
    <div style={{ height: initialHeight ?? "100%", width: "100%" }}>
      {children}
    </div>
  );
};

export default ContainerViewPort;
