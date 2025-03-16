export interface TabItemProps {
  index: number;
  title: string;
}

export interface TabComponentItemsProps {
  pageIndex: number;
  currentTabIndex: number;
}

export interface TabsProps {
  tabList: TabItemProps[];
  defaultIndex?: number;
  children: ({ tabIndex: number }) => React.ReactNode;
  onChangeTab: (tabs: TabItemProps) => void;
}
