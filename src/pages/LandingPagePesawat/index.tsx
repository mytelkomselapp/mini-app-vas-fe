import { withReactQuery } from "../../hoc";
import { View, Text, Button } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useLoad } from "@tarojs/taro";

import { useFetchCMSLandingPage } from "../../network";

const Index = () => {
  useLoad(() => {
    console.log("Page loaded.");
  });

  const navigateToLandingPagePesawat = () => {
    Taro.navigateTo({ url: "/pages/landingPagePesawat/index" });
  };

  const { data } = useFetchCMSLandingPage();

  console.log(data);

  return (
    <View className="index">
      <div>
        <h2>span</h2>
      </div>
      <Text>Hello world!</Text>
      <Button onClick={navigateToLandingPagePesawat}>
        Go to Landing Page Pesawat
      </Button>
    </View>
  );
};

export default withReactQuery(Index);
