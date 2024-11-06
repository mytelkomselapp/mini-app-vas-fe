import * as React from "react";
import { Sheet } from "react-modal-sheet";
import style from "./FlightSearch.module.css";
import ArrowLeft from "../../assets/arrow-left.svg";
import InputComponent from "./components/InputComponent";
import FlightSearchHistory from "./components/FlightSearchHistory";
import FlightSearchRecommendation from "./components/FlightSearchRecommendation";
import { cn as classNames } from "../../lib/utils";
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
    <Sheet
      isOpen={open}
      disableDrag
      onClose={handleClose}
      detent="full-height"
      animate={false}
      className={style["modal"]}
    >
      <Sheet.Container
        className={classNames("bg-inactiveGrey", style["container"])}
      >
        <Sheet.Header>
          <div className="w-full flex gap-x-2 p-[16px] h-auto items-center">
            <img src={ArrowLeft} onClick={handleClose} />
            <div className="w-full">
              <InputComponent
                isLoading={isLoading}
                value={keyword}
                onChange={handleChangeKeyword}
                onTyping={setIsTyping}
              />
            </div>
          </div>
        </Sheet.Header>
        <Sheet.Content className="px-[16px] mt-[8px] flex flex-col gap-y-[24px]">
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
            <FlightSearchResult
              onSelect={handleSelect}
              data={dataFlightSearch}
            />
          </Show>
        </Sheet.Content>
      </Sheet.Container>
    </Sheet>
  );
};

export default FlightSearch;
