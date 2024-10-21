import { Button, Text, View } from "@tarojs/components";
import Taro from "@tarojs/taro";

const Index = () => {
  const navigation = () => {
    Taro.navigateTo({
      url: '/pages/ListPenerbangan/index'
    })
  }
  return (
    <View>
      <Text>Hello world!</Text>
      <Button onClick={navigation}>Navigate</Button>
    </View>
  );
};

export default Index;
