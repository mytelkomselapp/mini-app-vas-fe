import { Text, View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { Route, Routes } from "react-router-dom";
import PreviewImageDocs from "../PreviewImageDocs";
export const COMMERCE_TRAVEL = "/travel";
export const FLIGHT_SPECIFIC = "/flight-specific";

const Index = () => {
  const handleNavigate = (url: string) => {
    Taro.navigateTo({
      url,
    });
  };
  return (
    <>
      <View>
        <Text>Hello world!</Text>
      </View>
      <Routes>
        <Route
          path="../PreviewImageDocs/index"
          element={<PreviewImageDocs />}
        />
      </Routes>
    </>
  );
};

export default Index;
