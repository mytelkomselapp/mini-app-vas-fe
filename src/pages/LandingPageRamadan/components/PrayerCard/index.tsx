import mosque from "../../../../assets/bg-mosque.png";
import lampLeft from "../../../../assets/group-lampoon-left.svg";
import lampRight from "../../../../assets/group-lampoon-right.svg";
import bedug from "../../../../assets/bedug.png";
import notifOn from "../../../../assets/ico_alarm.svg";
import chevronRight from "../../../../assets/chevron-right.svg";
import mapPinGrey from "../../../../assets/map-pin-grey.svg";
import convex from "../../../../assets/convex-masjid.svg";
import { handleNavigate } from "../../../../lib/utils";
import { useRamadhanSearchLocation } from "../../../../store/ramadhan";

const PrayerCard = () => {
  const { data: dataRamadhanSearchLocation } = useRamadhanSearchLocation();

  const handleSearchLocation = () => {
    handleNavigate(
      "/subpackages/subpackage3/pages/RamadhanSearchLocation/index"
    );
  };

  return (
    <>
      <img
        src={convex}
        className="absolute left-[43.9%] transform -translate-x-[43.9%] -top-3 w-[48px] h-20 z-50"
      />
      <div
        className="max-w-md mx-auto rounded-lg relative overflow-hidden bg-white mt-6 "
        style={{ boxShadow: "0px -16px 40px 0px rgba(227, 109, 40, 0.60)" }}
      >
        <div className="p-6 pb-3">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center h-[150px]"
            style={{
              backgroundImage: `url(${mosque})`,
            }}
          >
            <img src={lampLeft} className="absolute top-0 left-0 w-20 h-20" />
            <img src={lampRight} className="absolute top-0 right-0 w-20 h-20" />
          </div>

          {/* Content Section */}
          <div className="relative z-10 text-center">
            <div>
              {/* Location */}
              <div
                onClick={handleSearchLocation}
                className="mt-8 text-xs text-gray-500 inline-flex justify-center items-center mb-3 rounded-full bg-white py-1 px-2 border-solid border-[1px] border-dividerGrey"
              >
                <img src={mapPinGrey} className="w-4 h-4 mr-1" />
                {dataRamadhanSearchLocation?.city || "Pancoran"}
                <img
                  src={chevronRight}
                  className="w-4 h-4 ml-1"
                  style={{
                    transform: "rotate(90deg)",
                    filter:
                      "invert(41%) sepia(8%) saturate(0%) hue-rotate(180deg) brightness(90%) contrast(90%)",
                  }}
                />
              </div>

              {/* Prayer Time */}
              <div className="text-base font-semibold text-gray-900 font-sans">
                Zuhur 11:40 WIB
              </div>

              {/* Countdown */}
              <div className="text-[10px] font-normal bg-yellow-100 text-grey rounded-full px-4 py-1 inline-flex items-center mt-3">
                <img
                  src={bedug}
                  className="w-4 h-4 mr-1"
                  style={{
                    filter:
                      "invert(41%) sepia(8%) saturate(0%) hue-rotate(180deg) brightness(90%) contrast(90%)",
                  }}
                />
                8 jam 30 menit lagi buka puasa
              </div>
            </div>
          </div>
        </div>
        {/* Notification Section */}
        <div className="h-[1px] w-full bg-dividerGrey"></div>
        <div className="my-2 mx-4 flex justify-between items-center bg-white text-[10px]">
          <div className="flex items-center space-x-2">
            <img src={notifOn} className="w-5 h-5 mr-1" />
            <span>Notifikasi adzan telah aktif</span>
          </div>
          <div className="flex items-center space-x-2">
            <span>Atur</span>
            <img src={chevronRight} className="w-4 h-4" />
          </div>
        </div>
      </div>
    </>
  );
};

export default PrayerCard;
