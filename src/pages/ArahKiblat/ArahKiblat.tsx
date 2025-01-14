import { Text, View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { Qibla } from "qibla";
import { useEffect, useState } from "react";
import compass from "../../assets/compass.svg";
import compassActive from "../../assets/compass-active.svg";
import kabahIndicator from "../../assets/kabah-indicator.svg";
import bgLanding from "../../assets/backdrop-compass.svg";
import mapPinWhite from "../../assets/map-pin-white.svg";

import { cn } from "../../lib/utils";

const ArahKiblat: React.FC = () => {
  const [angle, setAngle] = useState(0);
  const qiblaFromTrueNorth = Qibla.degreesFromTrueNorth(19.0826881, 72.6009796);
  useEffect(() => {
    // Simulating compass rotation (replace this with a real API like Taro's onCompassChange if needed)
    const interval = setInterval(() => {
      setAngle((prev) => (prev + 10) % 360); // Increment the angle by 10 degrees every second
    }, 1000);

    return () => clearInterval(interval); // Clean up the interval
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

  return (
    // <View className="bg-white">
    //   <Text>Qibla Direction: {qiblaFromTrueNorth}°</Text>
    //   <Text>Current Angle: {angle}°</Text>
    // </View>

    <View
      className="flex flex-col items-center bg-no-repeat bg-cover h-screen"
      style={{
        backgroundImage: `url(${bgLanding})`,
        backgroundPosition: "center -8svh",
      }}
    >
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
          src={qiblaFromTrueNorth === angle ? compassActive : compass} // Replace with the actual path to the uploaded image
          alt="Compass Background"
          className="absolute w-full h-full object-cover"
          style={{ transform: `rotate(${angle}deg)` }}
        />

        {/* Rotating Needle */}
        {/* <div
          className="absolute w-2 h-28 bg-red-500 rounded-full origin-bottom z-10"
          style={{ transform: `rotate(${angle}deg)` }}
        ></div> */}

        {/* Qibla Indicator */}
        <div
          className="absolute z-20 left-20"
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
    </View>
  );
};

export default ArahKiblat;
