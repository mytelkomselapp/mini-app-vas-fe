import { Text, View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { Qibla } from "qibla";
import { useEffect, useState, useRef } from "react";
import compass from "../../../../assets/compass-new.svg";
import compassActive from "../../../../assets/compass-active-new.svg";
import kabahIndicator from "../../../../assets/kabah-indicator.svg";
import bgLanding from "../../../../assets/backdrop-compass.png";
import mapPinWhite from "../../../../assets/map-pin-white.svg";
import calibrateIllustration from "../../../../assets/calibrate-illustration.svg";
import iconPhoneRed from "../../../../assets/icon-phone-red.svg";
import greenRectangle from "../../../../assets/green-rectangle.svg";
import { cn } from "../../../../lib/utils";
import BottomSheet from "../../../../components/BottomSheet";
import Button from "../../../../components/Button";
import useTaroNavBar from "../../../../hooks/useTaroNavBar";

const ArahKiblat: React.FC = () => {
  const [angle, setAngle] = useState(0);
  const [open, setOpen] = useState(false);
  const [qibla, setQibla] = useState(0);
  const pages = Taro.getCurrentPages();
  const currentPage = pages[pages.length - 1];
  const currentPath = "/" + currentPage.route;

  const city = Taro.getStorageSync(currentPath);
  console.log("Current Path:", currentPath, city);
  const [accuracyLevel, setAccuracyLevel] = useState<
    "tinggi" | "sedang" | "rendah"
  >("tinggi");
  const labelCity = city?.city + ", " + city?.province + ", " + city?.country;
  const previousAngle = useRef(0);
  const fluctuations = useRef(0);
  useTaroNavBar();
  useEffect(() => {
    Taro.getLocation({
      type: "wgs84",
      success: (res) => {
        setQibla(Qibla.degreesFromTrueNorth(res.latitude, res.longitude));
      },
      fail: console.error,
    });

    Taro.startCompass({
      success: () => console.log("Compass started"),
      fail: console.error,
    });

    const compassListener = (res) => {
      if (typeof res.direction === "number") {
        const currentAngle = res.direction;
        setAngle(currentAngle);

        // Update fluctuations
        if (Math.abs(currentAngle - previousAngle.current) > 15) {
          fluctuations.current += 1;
        } else {
          fluctuations.current = Math.max(fluctuations.current - 1, 0);
        }
        previousAngle.current = currentAngle;

        // Determine accuracy level
        setAccuracyLevel(
          fluctuations.current > 10
            ? "rendah"
            : fluctuations.current > 5
            ? "sedang"
            : "tinggi"
        );
      }
    };

    Taro.onCompassChange(compassListener);

    return () => {
      Taro.stopCompass({ fail: console.error });
      Taro.offCompassChange(compassListener);
    };
  }, []);

  const handleClose = () => setOpen(false);
  const isAligned = qibla === Math.round(angle);
  console.log({ qibla, angle, isAligned });
  return (
    <View className="bg-white h-screen flex">
      <View
        className="flex flex-col items-center h-[60vh] absolute z-10 bg-cover bg-no-repeat bg-center"
        style={{ backgroundImage: `url(${bgLanding})` }}
      >
        <div className="h-[60vh] w-screen" />
      </View>

      <View className="flex flex-col items-center h-screen absolute z-10">
        {labelCity ? (
          <div className="flex gap-1 items-center mt-5 mb-20">
            <img
              src={mapPinWhite}
              className="w-4 h-4 mr-1"
              alt="Location pin"
            />
            <Text className="font-semibold text-[10px] text-center text-white">
              {labelCity}
            </Text>
          </div>
        ) : (
          <></>
        )}

        {/* Compass Wrapper */}
        <div className="relative w-60 h-60 flex items-center justify-center">
          <img
            src={greenRectangle}
            alt="green-axis"
            className={
              isAligned
                ? "absolute w-[80px] h-[80px] object-cover"
                : "absolute w-[13px] h-[23px]"
            }
            style={{
              top: isAligned ? "-30px" : "-16px", // Adjust this value to position the green axis correctly
              left: "50%",
              transform: "translateX(-50%)",
            }}
          />

          <img
            src={isAligned ? compassActive : compass}
            alt="Compass Background"
            className="absolute z-30 w-[250px] h-[250px] object-cover"
            style={{
              transform: `rotate(-${angle}deg)`,
              transformOrigin: "50% 50%",
            }}
          />

          <div
            className="absolute z-40"
            style={{
              transform: `rotate(${qibla - angle}deg) translateY(-120px)`,
            }}
          >
            <img src={kabahIndicator} alt="Ka`bah" className="w-8 h-8" />
          </div>

          <div
            className={cn(
              "absolute font-batikSans font-semibold z-30",
              isAligned ? "text-white" : "text-primaryBlack"
            )}
          >
            <Text className="text-[16px]">{Math.round(angle)}°</Text>
          </div>
        </div>

        <Text className="font-semibold text-[14px] text-center mt-6 px-4">
          {
            "Letakkan perangkat di permukaan datar dan putar kompas hingga berwarna hijau"
          }
        </Text>

        <Button
          style="secondary"
          label="Kalibrasi Perangkat"
          onClick={() => setOpen(true)}
          className="mt-20 max-w-[175px] !text-xs font-semibold leading-none font-sans !p-0"
          icon={
            <img
              src={iconPhoneRed}
              className="w-4 h-4 ml-[2px]"
              alt="Phone icon"
            />
          }
        />

        <BottomSheet open={open} onClose={handleClose}>
          <View className="flex flex-col items-center">
            <img
              src={calibrateIllustration}
              className="w-50 h-50"
              alt="Calibration illustration"
            />
            <Text className="font-bold text-[15px] text-center mb-2">
              {"Miringkan dan gerakkan perangkat kamu"}
            </Text>
            <View className="flex flex-row gap-1">
              <Text className="text-[14px] text-center text-grey">
                Akurasi kompas:
              </Text>
              <Text
                className={`text-[14px] ${
                  accuracyLevel === "rendah"
                    ? "text-red-500"
                    : accuracyLevel === "sedang"
                    ? "text-yellow-500"
                    : "text-green-500"
                }`}
              >
                {accuracyLevel}
              </Text>
            </View>
          </View>

          <Button label="Selesai" onClick={handleClose} className="mt-4" />
        </BottomSheet>
      </View>
    </View>
  );
};

export default ArahKiblat;
