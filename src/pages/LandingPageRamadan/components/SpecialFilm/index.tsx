import { ScrollView, View } from "@tarojs/components";
import chevronRight from "../../../../assets/chevron-right.svg";
// import dummyEvermos from "../../../../assets/dummy-evermos.svg";

import maxStream from "../../../../assets/maxStream.png";
import dummyPosterMovie from "../../../../assets/dummy-poster-movie.png";
const SpecialFilm = () => {
  const Movie = () => {
    return (
      <div
        className="rounded-2xl p-4  shadow-sm flex items-start space-x-2] min-w-40 w-40 h-[214px]"
        style={{
          background: `linear-gradient(180deg, rgba(0, 0, 0, 0.80) 0%, rgba(0, 0, 0, 0.00) 100%)`,
          backgroundSize: "cover", // or 'contain' depending on your needs
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        {/* Product Details */}
        <div className="flex-1">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <img src={maxStream} alt="Evermos" className="w-5 h-5 mr-1" />
              <p className="text-[8px] font-semibold text-white">Maxstream</p>
            </div>

            <div className="bg-gray-800 text-white text-[8px] font-semibold px-2 py-1 rounded-full shadow-md">
              02:15:00
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <ScrollView className="overflow-x-scroll pl-4 pt-1 w-[100vw]" scrollX>
      <View className="flex flex-row space-x-4">
        <Movie />
        <Movie />
        <Movie />
      </View>
    </ScrollView>
  );
};

export default SpecialFilm;
