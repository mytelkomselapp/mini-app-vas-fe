import React from "react";
import { View } from "@tarojs/components";
import Tabs, { TabItemProps, TabsItem } from "../../components/Tabs";
import ActiveContent from "./components/ActiveContent";
import EndedContent from "./components/EndedContent";
import Taro from "@tarojs/taro";

const MyCollection = () => {
  const searchParams = Taro.getCurrentInstance().router?.params;
  const order = Number(searchParams?.order || 0);
  const onChangeTab = (tab: TabItemProps) => {
    /** TODO: can refetch endpoint etc */
  };

  return (
    <View className="overflow-y-auto min-h-[95vh] bg-[#eaeef1]">
      <Tabs
        tabList={[
          {
            index: 0,
            title: "Konten Aktif",
          },
          {
            index: 1,
            title: "Konten Berakhir",
          },
        ]}
        onChangeTab={onChangeTab}
        defaultIndex={order}
      >
        {({ tabIndex }) => (
          <React.Fragment>
            <TabsItem pageIndex={0} currentTabIndex={tabIndex}>
              <ActiveContent />
            </TabsItem>
            <TabsItem pageIndex={1} currentTabIndex={tabIndex}>
              <EndedContent />
            </TabsItem>
          </React.Fragment>
        )}
      </Tabs>
    </View>
  );
};

export default MyCollection;
