import * as React from "react";

import Show from "../../../../components/Show";

import { View } from "@tarojs/components";
import { InputComponent } from "./components";
import SearchEmptyState from "./components/SearchEmptyState";
import SearchResult from "./components/SearchResult";
import { RamadhanSearchLocationProps } from "../../../../network/types/response-props";
import useDebounce from "../../../../hooks/useDebounce";
import {
  useRamadhanSearchLocation,
  useHistoryRamadhanSearchLocation,
} from "../../../../store/ramadhan";
import Taro from "@tarojs/taro";
import { useFetchSearchCity, useUserUpdateCity } from "../../../../network";
import { queryClient } from "../../../../hoc/withProvider";

const RamadhanSearchLocation = () => {
  const [isTyping, setIsTyping] = React.useState<boolean>(false);
  const [keyword, setKeyword] = React.useState<string>("");

  const { setData } = useRamadhanSearchLocation() || {};
  const {
    data: dataHistoryRamadhanSearchLocation,
    setData: setDataHistoryRamadhanSearchLocation,
  } = useHistoryRamadhanSearchLocation();

  console.log({ dataHistoryRamadhanSearchLocation });

  const {
    data: searchCityData,
    isLoading: isLoadingSearchCity,
    refetch: refetchSearchCity,
  } = useFetchSearchCity({ search: keyword }, false);

  const { mutate: mutateUserUpdateCity } = useUserUpdateCity();

  const dataSearchCity = searchCityData?.data?.data || [];

  const isLoading = isTyping || isLoadingSearchCity;
  const isEmptyState =
    keyword?.length > 0 && dataSearchCity?.length <= 0 && !isLoading;

  const isShowSearchResult = dataSearchCity?.length > 0;
  const isShowHistorySearchResult = !isShowSearchResult;
  console.log({ isShowSearchResult, isShowHistorySearchResult });

  const handleChangeKeyword = (value: string) => {
    if (value?.length <= 0) {
      setKeyword("");
    }

    setKeyword(value);
  };

  const handleSelectCity = (data: RamadhanSearchLocationProps) => {
    if (!data) return;

    queryClient.invalidateQueries(["Post Register User"]);
    mutateUserUpdateCity({ city_id: data?.id });

    setData(data);
    setDataHistoryRamadhanSearchLocation(data);
    Taro.navigateBack({
      delta: 1, // Number of pages to go back. Default is 1.
    });
  };

  const handleFetchSearchData = React.useCallback(() => {
    refetchSearchCity();
  }, []);

  useDebounce(
    () => {
      setIsTyping(false);

      if (keyword?.length > 0) return handleFetchSearchData();
    },
    600,
    [keyword]
  );

  return (
    <View className="bg-white min-h-[100vh] h-auto">
      <div className="flex gap-x-[8px] pt-[32px] pb-[8px] px-[20px] h-auto items-center">
        <InputComponent
          isLoading={isLoading}
          value={keyword}
          onChange={handleChangeKeyword}
          onTyping={setIsTyping}
          isShowClearButton={false}
          placeholder="Ketik lokasi kecamatan/kota kamu"
        />
      </div>

      <Show when={isShowHistorySearchResult}>
        <SearchResult
          data={dataSearchCity}
          onSelect={handleSelectCity}
          itemHistory={dataHistoryRamadhanSearchLocation}
          type="history"
        />
      </Show>
      <Show when={isShowSearchResult}>
        <SearchResult
          type="list"
          data={dataSearchCity}
          onSelect={handleSelectCity}
        />
      </Show>

      <Show when={isEmptyState}>
        <SearchEmptyState />
      </Show>
    </View>
  );
};

export default RamadhanSearchLocation;
