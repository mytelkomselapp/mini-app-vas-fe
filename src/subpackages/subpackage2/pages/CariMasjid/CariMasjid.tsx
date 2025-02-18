import { CoverView, Map, View, Text, Image } from "@tarojs/components";
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import useToggle from "../../../../hooks/useToggle";
import Button from "../../../../components/Button";
import TransparentBottomSheet from "../../../../components/TransparentBottomSheet";
import ChevronRight from "../../../../assets/chevron-right.svg";
import MosqueIcon from "../../../../assets/ico_mosque.svg";
import SignMosque from "../../../../assets/sign-mosque.svg";
import SignMosqueSelected from "../../../../assets/sign-mosque-selected.svg";
import GmapsIcon from "../../../../assets/gmaps-ico.png";
import MapsIcon from "../../../../assets/maps-ico.png";
import WazeIcon from "../../../../assets/waze-ico.svg";
import { useEffect, useState, useMemo } from "react";
import Taro from "@tarojs/taro";
import { useFetchNearestMosques } from "../../../../network/resolvers";
import { detectPlatform } from "../../../../lib/utils";
import useTaroNavBar from "../../../../hooks/useTaroNavBar";

interface MosqueListItemProps {
  name: string;
  address: string;
  distance: number;
  onPress: () => void;
}

const MosqueListItem: React.FC<MosqueListItemProps> = ({
  name,
  address,
  distance,
  onPress,
}) => {
  return (
    <View onClick={onPress}>
      <View className="flex flex-row items-center">
        <View className="flex flex-col w-10 h-10 mr-3 bg-[#fef2f4] rounded-[8px] p-2">
          <Image src={MosqueIcon} className="w-full h-full" />
          <Text className="text-red-500 text-xs text-center">{distance}m</Text>
        </View>
        <View className="flex-1 flex flex-col">
          <Text className="text-[14px] text-primary font-semibold">{name}</Text>
          <Text className="text-[12px] text-textSecondary">{address}</Text>
        </View>
        <Image
          src={ChevronRight}
          style={{
            width: "24px",
            height: "24px",
          }}
        />
        {/* <Image src="/chevron-right.svg" className="w-5 h-5" /> */}
      </View>
      <View className="h-[1px] bg-dividerGrey my-4" />
    </View>
  );
};

const SNAPPOINTS = [20, 35, 70, 85];

const CariMasjid: React.FC = () => {
  const { active: visibleSheet, setActive: setVisibleSheet } = useToggle(true);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [mapHeight, setMapHeight] = useState("30%");
  const [showAllMosques, setShowAllMosques] = useState(false);
  const [selectedMosqueId, setSelectedMosqueId] = useState<string | null>(null);
  const [selectedMosque, setSelectedMosque] = useState(null);
  const isIOS = detectPlatform() === "ios";
  console.log("platform", detectPlatform());
  useTaroNavBar();
  const hasLocation = latitude !== 0 && longitude !== 0;

  const { data: nearestMosques, isLoading: isLoadingNearestMosques } =
    useFetchNearestMosques(
      {
        latitude: latitude.toString(),
        longitude: longitude.toString(),
        radius: 1000,
      },
      hasLocation
    );

  useEffect(() => {
    Taro.getLocation({
      type: "wgs84",
      success: (res) => {
        setLatitude(res.latitude);
        setLongitude(res.longitude);
      },
      fail: (err) => {
        console.error("Failed to get location:", err);
      },
    });
  }, []);

  useEffect(() => {
    if (hasLocation) {
      console.log("Location updated:", latitude, longitude);
    }
  }, [latitude, longitude]);

  const handleSnapChange = (index: number) => {
    const currentSnap = SNAPPOINTS[index];
    // Calculate remaining height for map (100 - snapPoint)%
    setMapHeight(`${100 - currentSnap}%`);
  };

  // Create markers from nearest mosques data
  const mosqueMarkers = useMemo(() => {
    if (!nearestMosques?.data?.data) return [];

    const sortedMosques = nearestMosques.data?.data
      ?.sort((a, b) => a.distance - b.distance)
      ?.slice(0, 20); // Always limit to maximum 20 mosques

    return (showAllMosques ? sortedMosques : sortedMosques?.slice(0, 5))?.map(
      (mosque) => ({
        id: mosque.id,
        latitude: Number(mosque.latitude),
        longitude: Number(mosque.longitude),
        iconPath:
          mosque.id === Number(selectedMosqueId)
            ? SignMosqueSelected
            : SignMosque,
        width: mosque.id === Number(selectedMosqueId) ? 32 : 26,
        height: mosque.id === Number(selectedMosqueId) ? 38 : 30,
        callout: {
          content: mosque.name,
          color: "#000000",
          fontSize: 14,
          borderWidth: 1,
          borderRadius: 5,
          borderColor: "#E5E7EB",
          bgColor: "#fff",
          padding: 8,
          display: "BYCLICK",
          textAlign: "center",
        },
      })
    );
  }, [nearestMosques, showAllMosques, selectedMosqueId]);

  const handleShowMore = () => {
    setShowAllMosques(true);
  };

  // Add marker click handler
  const handleMarkerTap = (e) => {
    const markerId = e.detail?.markerId;
    setSelectedMosqueId(markerId);
    setShowAllMosques(false);
    handleSnapChange(0);
  };

  const getMosqueCountDisplay = useMemo(() => {
    if (!nearestMosques?.data?.data) return 0;
    const totalMosques = nearestMosques.data.data.length;
    const displayLimit = showAllMosques ? 20 : 5;
    return Math.min(totalMosques, displayLimit);
  }, [nearestMosques?.data?.data, showAllMosques]);

  const handleMosquePress = (mosque) => {
    setSelectedMosque(mosque);
  };

  const handleMapPress = (type: "maps" | "google" | "waze") => {
    const latitude = Number(selectedMosque?.latitude);
    const longitude = Number(selectedMosque?.longitude);

    if (type === "maps") {
      Taro.navigateTo({
        url:
          "/subpackages/subpackage9/pages/Webview/index?url=" +
          encodeURIComponent(
            `https://maps.apple.com/?ll=${latitude},${longitude}`
          ),
      });
      
    } else if (type === "google") {
      if (isIOS) {
        Taro.navigateTo({
          url:
            "/subpackages/subpackage9/pages/Webview/index?url=" +
            encodeURIComponent(
              `https://www.google.com/maps?q=${latitude},${longitude}`
            ),
        });
      } else {
        Taro.navigateTo({
          url:
            "/subpackages/subpackage9/pages/Webview/index?url=" +
            encodeURIComponent(
              `https://www.google.com/maps?q=${latitude},${longitude}`
            ),
        });
      }
    } else if (type === "waze") {
      Taro.navigateTo({
        url:
          "/subpackages/subpackage9/pages/Webview/index?url=" +
          encodeURIComponent(
            `https://waze.com/ul?ll=${latitude},${longitude}&navigate=yes`
          ),
      });
    }
  };

  const showMapApps = selectedMosque !== null;

  return (
    <View className="bg-white h-screen flex">
      <Map
        setting={{
          enableZoom: true,
          enableScroll: true,
          enableRotate: true,
          enableOverlooking: true,
          enable3D: true,
          showLocation: true,
        }}
        enableZoom
        enableScroll
        optimize
        scale={18}
        onMarkerTap={handleMarkerTap}
        markers={mosqueMarkers}
        latitude={latitude}
        longitude={longitude}
        style={{
          height: mapHeight,
          width: "100%",
          transition: "height 0.3s ease-in-out",
        }}
      >
        <CoverView slot="callout">
          {mosqueMarkers.map((item) => (
            <CoverView marker-id={item.id} key={item.id}>
              {/* Optionally add custom callout content here */}
            </CoverView>
          ))}
        </CoverView>
      </Map>

      <TransparentBottomSheet
        open={visibleSheet}
        onClose={() => {}}
        containerClassname="draggable"
        snapPoints={SNAPPOINTS}
        initialSnap={2}
        onSnap={handleSnapChange}
        currentSnapIndex={selectedMosqueId ? 0 : undefined}
      >
        {showMapApps ? (
          <View className="flex flex-col p-4">
            <Text className="text-[16px] leading-[24px] font-semibold mb-4 text-center">
              Buka di aplikasi
            </Text>
            <View className="flex flex-row justify-center gap-8">
              {isIOS && (
                <View
                  className="flex flex-col items-center"
                  onClick={() => handleMapPress("maps")}
                >
                  <View
                    className="w-[56px] h-[56px] p-2 rounded-[12px] flex items-center justify-center mb-2"
                    style={{
                      border: `1px solid #EFF1F4`,
                    }}
                  >
                    <Image
                      src={MapsIcon}
                      style={{
                        width: "32px",
                        height: "32px",
                      }}
                    />
                  </View>
                  <Text className="text-[10px] leading-[12px] text-textPrimary">
                    Maps
                  </Text>
                </View>
              )}
              <View
                className="flex flex-col items-center"
                onClick={() => handleMapPress("google")}
              >
                <View
                  className="w-[56px] h-[56px] p-2 rounded-[12px] flex items-center justify-center mb-2"
                  style={{
                    border: `1px solid #EFF1F4`,
                  }}
                >
                  <Image
                    src={GmapsIcon}
                    style={{
                      width: "32px",
                      height: "32px",
                    }}
                  />
                </View>

                <Text className="text-[10px] leading-[12px] text-textPrimary">
                  Google Maps
                </Text>
              </View>
              <View
                className="flex flex-col items-center"
                onClick={() => handleMapPress("waze")}
              >
                <View
                  className="w-[56px] h-[56px] p-2 rounded-[12px] flex items-center justify-center mb-2"
                  style={{
                    border: `1px solid #EFF1F4`,
                  }}
                >
                  <Image
                    src={WazeIcon}
                    style={{
                      width: "32px",
                      height: "32px",
                    }}
                  />
                </View>

                <Text className="text-[10px] leading-[12px] text-textPrimary">
                  Waze
                </Text>
              </View>
            </View>
          </View>
        ) : (
          <View className="flex flex-col justify-between">
            {!selectedMosqueId && (
              <Text className="text-[14px] text-textSecondary">
                {`Terdapat ${getMosqueCountDisplay} masjid di sekitarmu`}
              </Text>
            )}

            {/* Mosque List */}
            <View className="mt-4">
              {nearestMosques?.data?.data
                ?.sort((a, b) => a.distance - b.distance)
                ?.slice(0, 20)
                ?.filter((mosque) =>
                  selectedMosqueId
                    ? mosque.id === Number(selectedMosqueId)
                    : true
                )
                ?.slice(0, showAllMosques ? undefined : 5)
                ?.map((mosque) => (
                  <MosqueListItem
                    key={mosque.id}
                    name={mosque.name}
                    address={mosque.city.city}
                    distance={Math.round(mosque.distance * 1000)}
                    onPress={() => handleMosquePress(mosque)}
                  />
                ))}
            </View>

            {!selectedMosqueId &&
              nearestMosques?.data?.data?.length > 5 &&
              !showAllMosques && (
                <Button
                  label="Tampilkan Lebih Banyak"
                  onClick={handleShowMore}
                  style="secondary"
                />
              )}
          </View>
        )}
      </TransparentBottomSheet>
    </View>
  );
};

export default CariMasjid;
