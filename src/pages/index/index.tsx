import { Button, Text, View } from "@tarojs/components";
import { Routes, Route } from "react-router-dom";
import Taro from "@tarojs/taro";
import DetailPenerbangan from "../DetailPenerbangan";
import ListPenerbangan from "../ListPenerbangan";
import LandingPagePesawat from "../LandingPagePesawat";
import TransactionStatus from "../TransactionStatus/TransactionStatus";
import CreateDetailTicket from "../CreateDetailTicket";
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
        <Button onClick={() => handleNavigate("../LandingPagePesawat/index")}>
          List Penerbangan
        </Button>
      </View>
      <Routes>
        <Route
          path="../DetailPenerbangan/index"
          element={<DetailPenerbangan />}
        />
        <Route path="../ListPenerbangan/index" element={<ListPenerbangan />} />
        <Route
          path="../LandingPagePesawat/index"
          element={<LandingPagePesawat />}
        />
        <Route
          path="../TransactionStatus/index"
          element={<TransactionStatus />}
        />
        <Route
          path="../CreateDetailTicket/index"
          element={<CreateDetailTicket />}
        />
      </Routes>
    </>
  );
};

export default Index;
