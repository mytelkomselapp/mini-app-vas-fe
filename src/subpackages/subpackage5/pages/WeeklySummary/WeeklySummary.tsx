import { View } from "@tarojs/components";
import SharedCard from "./components/SharedCard";

const WeeklySummary = () => {
  return (
    <View
      style={{
        background: "linear-gradient(to bottom, #9C1015, #ED1C2F, #9C1015)",
      }}
      className="gap-y-[16px] h-[100vh] overflow-y-auto pt-[40px]"
    >
      <p className="text-[16px] whitespace-pre text-white font-semibold text-center">{`Bagikan progresmu dan ajak yang lain\nuntuk mengisi jurnal ibadah!`}</p>

      <SharedCard />
    </View>
  );
};

export default WeeklySummary;
