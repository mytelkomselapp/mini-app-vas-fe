import { Text, View } from "@tarojs/components";
import Header from "./components/Header";
import ProgressBar from "./components/ProgressBar";
import CardList from "./components/CardList";
import { handleNavigate } from "../../../../../../lib/utils";

const WidgetJurnalIbadah = () => {
  return (
    <View className="px-4 mt-4">
      <View className="flex flex-row items-center mb-2 justify-between">
        <Text className="font-batikSans font-bold text-[14px]">
          {"Jurnal Ibadah Ramadanmu"}
        </Text>
        <Text
          className="whitespace-pre-wrap text-xs text-grey "
          onClick={() => {
            handleNavigate(
              "/subpackages/subpackage5/pages/CatatanIbadah/index"
            );
          }}
        >
          {"Lihat Semua"}
        </Text>
      </View>
      <View
        style={{ border: "1px solid #dae0e9" }}
        className="mt-4 w-full h-[390px] rounded-[16px]"
      >
        <Header />
        <ProgressBar />
        <CardList />
      </View>
    </View>
  );
};

export default WidgetJurnalIbadah;
