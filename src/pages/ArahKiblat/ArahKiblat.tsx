import { Text, View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { Qibla } from "qibla";
import { useEffect, useState } from "react";
import compass from "../../assets/compass-new.svg";
import compassActive from "../../assets/compass-active-new.svg";
import kabahIndicator from "../../assets/kabah-indicator.svg";
import bgLanding from "../../assets/backdrop-compass.svg";
import mapPinWhite from "../../assets/map-pin-white.svg";
import calibrateIllustration from "../../assets/calibrate-illustration.svg";
import iconPhoneRed from "../../assets/icon-phone-red.svg";
import greenRectangle from "../../assets/green-rectangle.svg";
import { cn } from "../../lib/utils";
import BottomSheet from "../../components/BottomSheet";
import Button from "../../components/Button";

const ArahKiblat: React.FC = () => {
  const [angle, setAngle] = useState(0);
  const [open, setOpen] = useState(false);
  const [accuracyLevel, setAccuracyLevel] = useState("tinggi"); // Accuracy indicator
  const qiblaFromTrueNorth = Qibla.degreesFromTrueNorth(19.0826881, 72.6009796);

  //yang keputer itu kompasnya bukan arah kiblatnya

  useEffect(() => {
    //     // Start the compass
    Taro.startCompass({
      success: () => {
        console.log("Compass started successfully");
      },
      fail: (err) => {
        console.error("Failed to start compass:", err);
      },
    });

    Taro.onCompassChange((res) => {
      if (res && typeof res.direction === "number") {
        const currentAngle = res.direction;
        let previousAngle = 0;
        let fluctuations = 0;

        // Update angle
        setAngle(currentAngle);

        // Check for fluctuations
        if (Math.abs(currentAngle - previousAngle) > 15) {
          fluctuations++;
        } else {
          fluctuations = Math.max(fluctuations - 1, 0); // Decrease fluctuations gradually
        }
        previousAngle = currentAngle;

        // Determine accuracy level
        if (fluctuations > 10) {
          setAccuracyLevel("rendah");
        } else if (fluctuations > 5) {
          setAccuracyLevel("sedang");
        } else {
          setAccuracyLevel("tinggi");
        }
      } else {
        console.warn("Compass data is not available:", res);
      }
    });

    // Simulating compass rotation (replace this with a real API like Taro's onCompassChange if needed)
    const interval = setInterval(() => {
      setAngle((prev) => (prev + 10) % 360); // Increment the angle by 10 degrees every second
    }, 1000);

    return () => {
      clearInterval(interval);
      Taro.stopCompass({
        success: () => {
          console.log("Compass stopped successfully.");
        },
        fail: (err) => {
          console.error("Failed to stop compass:", err);
        },
      });
      Taro.offCompassChange();
    }; // Clean up the interval
  }, []);
  //   useEffect(() => {
  //     // Start the compass
  //     Taro.startCompass({
  //       success: () => {
  //         console.log("Compass started successfully");
  //       },
  //       fail: (err) => {
  //         console.error("Failed to start compass:", err);
  //       },
  //     });

  //     // Listen to compass changes
  //     Taro.onCompassChange((res) => {
  //       console.log({ res });
  //       setAngle(res.direction); // Update the angle state with the device direction
  //     });

  //     // Clean up on component unmount
  //     return () => {
  //       Taro.stopCompass({
  //         success: () => {
  //           console.log("Compass stopped successfully");
  //         },
  //         fail: (err) => {
  //           console.error("Failed to stop compass:", err);
  //         },
  //       });
  //       Taro.offCompassChange();
  //     };

  //   }, []);
  const handleClose = () => {
    setOpen(false);
  };

  return (
    // <View className="bg-white">
    //   <Text>Qibla Direction: {qiblaFromTrueNorth}°</Text>
    //   <Text>Current Angle: {angle}°</Text>
    // </View>
    <View className="bg-white h-screen flex">
      <View
        className="flex flex-col items-center h-[60vh] absolute z-10 bg-cover bg-no-repeat bg-center"
        style={{ backgroundImage: `url(${bgLanding})` }}
      >
        {/* Add div to fill the space */}
        <div className="h-[60vh] w-screen" />
      </View>
      <View className="flex flex-col items-center h-screen absolute z-10">
        <div className="flex gap-1 items-center mt-5 mb-20">
          <img src={mapPinWhite} className="w-4 h-4 mr-1" />
          <Text className="font-semibold text-[10px] text-center text-white">
            {"Pancoran, DKI Jakarta, Indonesia"}
          </Text>
        </div>

        {/* Compass Wrapper */}
        <div className="relative w-60 h-60 flex items-center justify-center">
          {/* Compass Background Image */}
          <img
            src={greenRectangle}
            alt="green-axis"
            className="absolute w-[13px] h-[16px] object-cover -top-1"
          />

          <img
            src={qiblaFromTrueNorth === angle ? compassActive : compass} // Replace with the actual path to the uploaded image
            alt="Compass Background"
            className="absolute z-30 w-full h-full object-cover"
            style={{
              transform: `rotate(${angle}deg)`,
              transformOrigin: "50% 50%",
            }}
          />

          {/* Rotating Needle */}
          {/* <div
          className="absolute w-2 h-28 bg-red-500 rounded-full origin-bottom z-10"
          style={{ transform: `rotate(${angle}deg)` }}
        ></div> */}

          {/* Qibla Indicator */}
          <div
            className="absolute z-40 left-20"
            style={{
              transform: `rotate(${qiblaFromTrueNorth}deg) translateY(-90px)`, // Position Qibla indicator
            }}
          >
            <img src={kabahIndicator} alt="Ka`bah" className="w-8 h-8" />
          </div>
          {/* Center Point */}
          <div
            className={cn(
              "absolute font-batikSans font-semibold z-30",
              qiblaFromTrueNorth === angle ? " text-white" : "text-primaryBlack"
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
          icon={<img src={iconPhoneRed} className="w-4 h-4 ml-[2px]" />}
        />

        <BottomSheet open={open} onClose={handleClose}>
          <View className="flex flex-col items-center">
            <img src={calibrateIllustration} className="w-50 h-50" />
            <Text className="font-bold text-[15px] text-center mb-2">
              {"Miringkan dan gerakkan perangkat kamu"}
            </Text>
            <View className="flex flex-row gap-1">
              <Text className={`text-[14px] text-center text-grey`}>
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
