import { View, Text, Button } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useLoad } from "@tarojs/taro";

export default function Index() {
  useLoad(() => {
    console.log("Page loaded.");
  });

  const navigateToLandingPagePesawat = () => {
    Taro.navigateTo({ url: "/pages/landingPagePesawat/index" });
  };

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
}
