import * as React from "react";

import Show from "../../../../components/Show";

import { View } from "@tarojs/components";
import { InputComponent } from "./components";
import SearchEmptyState from "./components/SearchEmptyState";
import SearchResult from "./components/SearchResult";
import { DUMMY_SEARCH_LOCATION } from "./constants";
import { RamadhanSearchLocationProps } from "../../../../network/types/response-props";
import useDebounce from "../../../../hooks/useDebounce";
import { useRamadhanSearchLocation } from "../../../../store/ramadhan";
import Taro from "@tarojs/taro";

const RamadhanSearchLocation = () => {
  const { setData } = useRamadhanSearchLocation();

  /* Dummy data remove soon when endpoint ready*/
  const [searchData, setSearchData] = React.useState<
    RamadhanSearchLocationProps[]
  >([]);

  const [isTyping, setIsTyping] = React.useState<boolean>(false);
  const [keyword, setKeyword] = React.useState<string>("");

  const isLoading = isTyping;
  const isEmptyState =
    keyword?.length > 0 && searchData?.length <= 0 && !isLoading;
  const isShowSearchResult = searchData?.length > 0;

  const handleChangeKeyword = (value: string) => {
    if (value?.length <= 0) {
      setKeyword("");
      return setSearchData([]);
    }

    setKeyword(value);
  };

  const handleSelectCity = (data: RamadhanSearchLocationProps) => {
    if (!data) return;

    setData(data);
    Taro.navigateBack({
      delta: 1, // Number of pages to go back. Default is 1.
    });
  };

  const handleFetchSearchData = React.useCallback((keyword: string) => {
    const newData = DUMMY_SEARCH_LOCATION.filter((data) =>
      keyword
        ? data?.city?.toLowerCase().includes(keyword.toLowerCase())
        : false
    );

    setSearchData(newData);
  }, []);

  useDebounce(
    () => {
      setIsTyping(false);

      if (keyword?.length > 0) return handleFetchSearchData(keyword);
    },
    600,
    [keyword]
  );

  return (
    <View className="bg-white min-h-[100vh] h-auto">
      <div className="flex gap-x-[8px] py-[32px] px-[20px] h-auto items-center">
        <InputComponent
          isLoading={isLoading}
          value={keyword}
          onChange={handleChangeKeyword}
          onTyping={setIsTyping}
          isShowClearButton={false}
          placeholder="Ketik lokasi kecamatan/kota kamu"
        />
      </div>

      <Show when={isShowSearchResult}>
        <SearchResult data={searchData} onSelect={handleSelectCity} />
      </Show>

      <Show when={isEmptyState}>
        <SearchEmptyState />
      </Show>
    </View>
  );
};

export default RamadhanSearchLocation;
