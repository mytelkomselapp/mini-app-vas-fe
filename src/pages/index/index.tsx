import { Button, Text, View } from "@tarojs/components";
import Taro from "@tarojs/taro";



const Index = () => {
  const handleNavigate = (url: string) => {
    Taro.navigateTo({
      url,
    })
  }
  return (
    <View>
      <Text>Hello world!</Text>
      <Button onClick={() => handleNavigate('pages/ListPenerbangan/index')}>List Penerbangan</Button>
    </View>
  );
};

export default Index;
