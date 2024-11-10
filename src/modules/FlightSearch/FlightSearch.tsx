import * as React from "react";
import "./FlightSearch.module.css";
import ArrowLeft from "../../assets/arrow-left.svg";
import InputComponent from "./components/InputComponent";
import FlightSearchHistory from "./components/FlightSearchHistory";
import FlightSearchRecommendation from "./components/FlightSearchRecommendation";
import Show from "../../components/Show";
import useDebounce from "../../hooks/useDebounce";
import FlightSearchResult from "./components/FlightSearchResult";
import { useFetchFlightSearch } from "../../network";
import {
  DestinationOriginProps,
  useDestination,
  useFlightSearchHistory,
  useOrigin,
} from "../../store/flight";
import { CMSFlightLandingPopularCitiesSection } from "../../network/types/response-props";
import { toast } from "../../components/ui/use-toast";
import BottomSheet from "../../components/BottomSheet";
import { View } from "@tarojs/components";

interface Props {
  open: boolean;
  name: string;
  onClose: () => void;
  onSelect: (value: DestinationOriginProps, name: string) => void;
  dataPopularCities: CMSFlightLandingPopularCitiesSection[];
}

const FlightSearch: React.FC<Props> = ({
  open,
  onClose,
  onSelect,
  name,
  dataPopularCities,
}) => {
  const {
    flightSearchHistory,
    addFlightSearchHistory,
    removeFlightSearchHistory,
  } = useFlightSearchHistory();

  const { origin } = useOrigin();
  const { destination } = useDestination();

  const [isTyping, setIsTyping] = React.useState<boolean>(false);
  const [keyword, setKeyword] = React.useState<string>("");

  const {
    data: dataFlightRaw,
    refetch: fetchFlightData,
    isFetching,
  } = useFetchFlightSearch(keyword, false);

  const dataFlightSearch = dataFlightRaw?.data?.data ?? [];
  const dataFlightSearchHistory = flightSearchHistory ?? [];
  const toastClassName = "bg-[#181C21] text-white border-[#181C21]";

  const isLoading = isTyping || isFetching;
  const isShowResult = !isLoading && keyword?.length > 0;
  const isShowRecommendation =
    !isLoading && dataFlightSearch?.length <= 0 && keyword?.length <= 0;
  const isShowSearchHistory = dataFlightSearchHistory?.length > 0;

  const handleFetchSearchData = React.useCallback(() => {
    fetchFlightData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClose = () => {
    onClose?.();
    setIsTyping(false);
    setKeyword("");
  };

  const handleSelect = (value: DestinationOriginProps) => {
    if (name === "kota-asal" && value?.city === destination?.city) {
      handleClose();

      return toast({
        description: "Kota asal harus berbeda dengan kota tujuan",
        className: toastClassName,
      });
    }

    if (name === "kota-tujuan" && value?.city === origin?.city) {
      handleClose();

      return toast({
        description: "Kota tujuan harus berbeda dengan kota asal",
        className: toastClassName,
      });
    }

    onSelect?.(value, name);

    // store flight search history
    addFlightSearchHistory({
      cityName: value?.city ?? "",
      ...(value?.cityId ? { cityId: value?.cityId } : {}),
    });

    handleClose();
  };

  const handleRemoveHistory = () => {
    removeFlightSearchHistory();
  };

  const handleChangeKeyword = (value: string) => {
    setKeyword(value);
  };

  useDebounce(
    () => {
      setIsTyping(false);

      if (keyword?.length > 0) return handleFetchSearchData();
    },
    300,
    [keyword]
  );

  return (
    <BottomSheet
      showHeader={false}
      fullHeight
      open={open}
      onClose={handleClose}
      containerClassname={"container"}
    >
      <View>
        <div
          style={{ marginBottom: 16 }}
          className="flex gap-x-[8px] h-auto items-center"
        >
          <img
            src={ArrowLeft}
            onClick={handleClose}
            style={{ width: "1.2rem", height: "1.2rem" }}
          />
          <InputComponent
            isLoading={isLoading}
            value={keyword}
            onChange={handleChangeKeyword}
            onTyping={setIsTyping}
          />
        </div>
        <Show when={isShowRecommendation}>
          <Show when={isShowSearchHistory}>
            <FlightSearchHistory
              data={dataFlightSearchHistory}
              onSelect={handleSelect}
              onRemove={handleRemoveHistory}
            />
          </Show>
          <FlightSearchRecommendation
            data={dataPopularCities}
            onSelect={handleSelect}
          />
        </Show>
        <Show when={isShowResult}>
          <FlightSearchResult onSelect={handleSelect} data={dataFlightSearch} />
        </Show>
      </View>
      {/* <div className="max-w-[90vw]">
        <div className="w-full flex gap-x-2 h-auto items-center">
          <img
            src={ArrowLeft}
            onClick={handleClose}
            style={{ width: "1rem", height: "1rem" }}
          />
          <div className="w-full">
            <InputComponent
              isLoading={isLoading}
              value={keyword}
              onChange={handleChangeKeyword}
              onTyping={setIsTyping}
            />
          </div>
        </div>
        <Show when={isShowRecommendation}>
          <Show when={isShowSearchHistory}>
            <FlightSearchHistory
              data={dataFlightSearchHistory}
              onSelect={handleSelect}
              onRemove={handleRemoveHistory}
            />
          </Show>
          <FlightSearchRecommendation
            data={dataPopularCities}
            onSelect={handleSelect}
          />
        </Show>
        <Show when={isShowResult}>
          <FlightSearchResult onSelect={handleSelect} data={dataFlightSearch} />
        </Show>
      </div> */}
    </BottomSheet>
  );
};

export default FlightSearch;
