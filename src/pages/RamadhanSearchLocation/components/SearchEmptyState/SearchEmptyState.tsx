import * as React from "react";
import { View } from "@tarojs/components";

import EmptySearchBox from "../../../../assets/empty-box-search.svg";

const SearchEmptyState = () => {
  return (
    <View className="h-[85vh] gap-y-[4px] flex justify-center items-center">
      <div className="flex justify-center items-center flex-col relative top-[-32px]">
        <img
          src={EmptySearchBox}
          alt="Empty Box Search"
          className="w-[80x] h-[80px]"
        />
        <p className="text-[12px] text-black">
          Maaf, lokasi yang dicari tidak ditemukan
        </p>
      </div>
    </View>
  );
};

export default SearchEmptyState;
