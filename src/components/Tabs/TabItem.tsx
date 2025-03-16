import React from "react";
import { TabComponentItemsProps } from "./types";

const TabsItem: React.FC<React.PropsWithChildren<TabComponentItemsProps>> = ({
  pageIndex,
  currentTabIndex,
  children,
}) => {
  if (pageIndex !== currentTabIndex) return null;

  return <React.Fragment>{children}</React.Fragment>;
};

export { TabsItem };
