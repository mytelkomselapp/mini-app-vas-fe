import { Button, Text, View } from "@tarojs/components";
import { Routes, Route } from 'react-router-dom'
import Taro from "@tarojs/taro";
import DetailPenerbangan from "../DetailPenerbangan";
import ListPenerbangan from "../ListPenerbangan";



const Index = () => {
  const handleNavigate = (url: string) => {
    Taro.navigateTo({
      url,
    })
  }
  return (<>
    <View>
      <Text>Hello world!</Text>
      <Button onClick={() => handleNavigate('pages/ListPenerbangan/index')}>List Penerbangan</Button>
    </View>
    <Routes>
      <Route path="/pages/DetailPenerbangan/index" element={<DetailPenerbangan />}></Route>
      <Route path="/pages/ListPenerbangan/index" element={<ListPenerbangan />}></Route>
    </Routes>
  </>


  );
};

export default Index;
