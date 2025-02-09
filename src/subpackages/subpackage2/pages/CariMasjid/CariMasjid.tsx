import { CoverView, Map, View, Text, Image } from "@tarojs/components";
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import useToggle from "../../../../hooks/useToggle";
import Button from "../../../../components/Button";
import TransparentBottomSheet from "../../../../components/TransparentBottomSheet";
import ChevronRight from "../../../../assets/chevron-right.svg";
import MosqueIcon from "../../../../assets/ico_mosque.svg";
import SignMosque from "../../../../assets/sign-mosque.svg";
import { useEffect, useState, useMemo } from "react";
import Taro from "@tarojs/taro";
import { useFetchNearestMosques } from "../../../../network/resolvers";

interface MosqueListItemProps {
  name: string;
  address: string;
  distance: number;
}

const MosqueListItem: React.FC<MosqueListItemProps> = ({
  name,
  address,
  distance,
}) => {
  return (
    <View>
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

const mosques = [
  {
    id: 1,
    name: "Masjid Baitussalam Cilandak",
    address:
      "RT.8/RW.1, Senayan, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta",
    distance: 98,
  },
  {
    id: 2,
    name: "Masjid Darussalam",
    address:
      "RT.8/RW.1, Senayan, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta",
    distance: 180,
  },
  {
    id: 3,
    name: "Masjid Al Hidayah",
    address:
      "RT.8/RW.1, Senayan, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta",
    distance: 190,
  },
  {
    id: 4,
    name: "Masjid Al Istiqomah",
    address:
      "RT.8/RW.1, Senayan, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta",
    distance: 254,
  },
  {
    id: 5,
    name: "Masjid Daruh Falah",
    address:
      "RT.8/RW.1, Senayan, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta",
    distance: 390,
  },
];

const normalCallout = {
  id: 1,
  latitude: 23.098994,
  longitude: 113.32252,
  iconPath: SignMosque,
  width: 26,
  height: 30,
  callout: {
    color: "#ff0000",
    fontSize: 14,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "#000000",
    bgColor: "#fff",
    padding: 5,
    display: "ALWAYS",
    textAlign: "center",
  },
};

const customCallout1 = {
  id: 2,
  latitude: 23.097994,
  longitude: 113.32352,
  iconPath: SignMosque,
  width: 26,
  height: 30,
  customCallout: {
    anchorY: 0,
    anchorX: 0,
    display: "ALWAYS",
  },
};

const customCallout2 = {
  id: 3,
  latitude: 23.096994,
  longitude: 113.32452,
  iconPath: SignMosque,
  width: 26,
  height: 30,
  customCallout: {
    anchorY: 0,
    anchorX: 0,
    display: "ALWAYS",
  },
};

const customCallout3 = {
  id: 4,
  latitude: 23.095994,
  longitude: 113.32552,
  iconPath: SignMosque,
  width: 26,
  height: 30,
  customCallout: {
    anchorY: 0,
    anchorX: 0,
    display: "ALWAYS",
  },
};

const customMarkers = [customCallout1, customCallout2, customCallout3];

const mapMarkers = [normalCallout, ...customMarkers];

const CariMasjid: React.FC = () => {
  const { active: visibleSheet, setActive: setVisibleSheet } = useToggle(true);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [mapHeight, setMapHeight] = useState("65%");

  const hasLocation = latitude !== 0 && longitude !== 0;

  const { data: nearestMosques, isLoading: isLoadingNearestMosques } =
    useFetchNearestMosques({
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
      console.log('Location updated:', latitude, longitude);
    }
  }, [latitude, longitude]);
  
  

  const handleSnapChange = (index: number) => {
    const snapPoints = [35, 60, 85];
    const currentSnap = snapPoints[index];
    // Calculate remaining height for map (100 - snapPoint)%
    setMapHeight(`${100 - currentSnap}%`);
  };

  // Create markers from nearest mosques data
  const mosqueMarkers = useMemo(() => {
    if (!nearestMosques?.data?.data) return [];
    
    return nearestMosques.data?.data?.map((mosque) => ({
      id: mosque.id,
      latitude: Number(mosque.latitude),
      longitude: Number(mosque.longitude),
      iconPath: SignMosque,
      width: 26,
      height: 30,
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
    }));
  }, [nearestMosques]);

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
        markers={mosqueMarkers}
        latitude={latitude}
        longitude={longitude}
        style={{ 
          height: mapHeight, 
          width: "100%",
          transition: "height 0.3s ease-in-out"
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
        snapPoints={[35, 60, 85]}
        initialSnap={1}
        onSnap={handleSnapChange}
      >
        <View className="flex flex-col justify-between">
          <View>
            <Text className="text-[14px] text-textSecondary">
              Terdapat {nearestMosques?.data?.data?.length || 0} masjid di sekitarmu
            </Text>

            {/* Mosque List */}
            <View className="mt-4">
              {nearestMosques?.data?.data?.map((mosque) => (
                <MosqueListItem
                  key={mosque.id}
                  name={mosque.name}
                  address={mosque.city.city}
                  distance={Math.round(mosque.distance * 1000)} // Convert km to m
                />
              ))}
            </View>
          </View>

          <Button
            label="Tampilkan Lebih Banyak"
            onClick={() => {}}
            style="secondary"
          />
        </View>
      </TransparentBottomSheet>
    </View>
  );
};

export default CariMasjid;
