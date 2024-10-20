import * as React from "react";
import Navbar from "../../components/Navbar";
import AutoCompleteInput from "../../components/AutocompleteInput/AutocompleteInput";
import { AutoCompleteDropdownOptionProps } from "../../components/AutocompleteInput/components/Dropdown/Dropdown";
import { DUMMY_DATA_OPTIONS } from "./constants";
import useDebounce from "../../hooks/useDebounce";
import TravelSearchHistory from "../../modules/TravelSearchHistory";
import { useTravelSearchHistory } from "../../store/travel";
import { useNavigate } from "react-router-dom";
import { COMMERCE_TRAVEL } from "../../App";
import { useFetchCMSLandingPage } from "../../network";
import { RecommendationCities } from "./components";

const TravelSearchPage: React.FC = () => {
  const navigate = useNavigate();

  const [isTyping, setIsTyping] = React.useState<boolean>(false);
  const [keyword, setKeyword] = React.useState<string>("");
  const [optionsData, setOptionsData] = React.useState<
    AutoCompleteDropdownOptionProps[]
  >([]);

  const {
    travelSearchHistory,
    removeTravelSearchHistory,
    addTravelSearchHistory,
  } = useTravelSearchHistory();

  // TODO: temporary until get valid endpoint
  const { data: dataRaw, isFetching: fetchingCMSLandingPage } =
    useFetchCMSLandingPage();

  const dataPopularCities = dataRaw?.data?.data?.popularCitiesSection ?? [];

  const dataTravelSearchHistory = travelSearchHistory ?? [];

  const isLoading = (isTyping && keyword?.length > 0) || fetchingCMSLandingPage;
  const isShowTravelSearchHistory = dataTravelSearchHistory?.length > 0;

  const handleBack = () => navigate(-1);

  const handleChangeKeyword = (value: string) => {
    // Temporary until get data from endpoint
    const filteredData = [...DUMMY_DATA_OPTIONS]?.filter((data) =>
      String(data?.title)?.includes(value)
    );

    setOptionsData(filteredData);

    setKeyword(value);
  };

  const handleSelect = (data: AutoCompleteDropdownOptionProps) => {
    setIsTyping(false);
    setKeyword(data?.title);

    addTravelSearchHistory(data);

    handleClickRecommendationCities(data?.title, data?.id);
  };

  const handleRemoveHistory = () => {
    removeTravelSearchHistory();
  };

  const handleClickRecommendationCities = (city = "", cityId = "") => {
    navigate({
      pathname: `${COMMERCE_TRAVEL}/explore`,
      search: `?cityId=${cityId}&city=${city}`,
    });
  };

  useDebounce(
    () => {
      if (keyword?.length > 0) console.log("SEARCH DATA");
    },
    300,
    [keyword]
  );

  return (
    <div className="w-[100%] min-h-[100%] overflow-y-auto overflow-x-hidden bg-inactiveGrey">
      <Navbar
        onBackCallback={handleBack}
        hiddenAction
        title={""}
        className="p-[16px] bg-white mt-0"
      />
      <div className="my-[8px] px-[16px]">
        <AutoCompleteInput
          options={optionsData}
          isLoading={isLoading}
          value={keyword}
          onChange={handleChangeKeyword}
          onTyping={setIsTyping}
          onSelect={handleSelect}
        />
      </div>

      <TravelSearchHistory
        data={dataTravelSearchHistory}
        onRemove={handleRemoveHistory}
        onSelect={handleSelect}
        show={isShowTravelSearchHistory}
      />

      <div className="flex flex-col gap-y-[12px] my-[16px] px-[16px]">
        <h1 className="text-[16px] font-normal">Rekomendasi Destinasi</h1>
        <RecommendationCities
          data={dataPopularCities?.slice(0, 6)}
          onClick={handleClickRecommendationCities}
        />
      </div>
    </div>
  );
};

export default TravelSearchPage;
