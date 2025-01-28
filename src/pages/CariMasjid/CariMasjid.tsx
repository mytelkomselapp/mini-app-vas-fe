import { CoverView, Map, View, Text, Image } from '@tarojs/components'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import useToggle from "../../hooks/useToggle";
import Button from "../../components/Button";
import BottomSheet from '../../components/BottomSheet';
import ChevronRight from "../../assets/chevron-right.svg";
import MosqueIcon from "../../assets/ico_mosque.svg"


interface MosqueListItemProps {
  name: string;
  address: string;
  distance: number;
}

const MosqueListItem: React.FC<MosqueListItemProps> = ({ name, address, distance }) => {
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
    name: 'Masjid Baitussalam Cilandak',
    address: 'RT.8/RW.1, Senayan, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta',
    distance: 98
  },
  {
    id: 2,
    name: 'Masjid Darussalam',
    address: 'RT.8/RW.1, Senayan, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta',
    distance: 180
  },
  {
    id: 3,
    name: 'Masjid Al Hidayah',
    address: 'RT.8/RW.1, Senayan, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta',
    distance: 190
  },
  {
    id: 4,
    name: 'Masjid Al Istiqomah',
    address: 'RT.8/RW.1, Senayan, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta',
    distance: 254
  },
  {
    id: 5,
    name: 'Masjid Daruh Falah',
    address: 'RT.8/RW.1, Senayan, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta',
    distance: 390
  }
];


const normalCallout = {
  id: 1,
  latitude: 23.098994,
  longitude: 113.32252,
  callout: {
    color: '#ff0000',
    fontSize: 14,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#000000',
    bgColor: '#fff',
    padding: 5,
    display: 'ALWAYS',
    textAlign: 'center',
  }
}

const customCallout1 = {
  id: 2,
  latitude: 23.097994,
  longitude: 113.32352,
  customCallout: {
    anchorY: 0,
    anchorX: 0,
    display: 'ALWAYS',
  },
}

const customCallout2 = {
  id: 3,
  latitude: 23.096994,
  longitude: 113.32452,
  customCallout: {
    anchorY: 0,
    anchorX: 0,
    display: 'ALWAYS',
  },
}

const customCallout3 = {
  id: 4,
  latitude: 23.095994,
  longitude: 113.32552,
  customCallout: {
    anchorY: 0,
    anchorX: 0,
    display: 'ALWAYS',
  },
}

const customMarkers = [
  customCallout1,
  customCallout2,
  customCallout3,
]

const mapMarkers = [
  normalCallout,
  ...customMarkers
]

const CariMasjid: React.FC = () => {
  const { active: visibleSheet, setActive: setVisibleSheet } = useToggle(true);

  return (
    <View className="bg-white h-screen flex">
      <Map
        setting={{}}
        markers={mapMarkers}
        latitude={23.096994}
        longitude={113.324520}
        style={{ height: '100vh', width: '100vw' }}
      >
        <CoverView slot='callout'>
          {
            customMarkers.map(item => (
              <CoverView marker-id={item.id} key={item.id} >
                <View>navigator {item.id}</View>
              </CoverView>
            ))
          }
        </CoverView>
      </Map>

      <BottomSheet 
        open={visibleSheet} 
        onClose={() => setVisibleSheet(false)}
        containerClassname="draggable"
        snapPoints={[30, 60, 85]}
        initialSnap={1}
      >
        <View className="flex flex-col">
          <Text className="text-[14px] text-textSecondary mb-4">Terdapat {mosques.length} masjid di sekitarmu</Text>
          
          {/* Mosque List */}
          <View>
            {mosques.map(mosque => (
              <MosqueListItem
                key={mosque.id}
                name={mosque.name}
                address={mosque.address}
                distance={mosque.distance}
              />
            ))}
          </View>

          <Button 
            label="Tampilkan Lebih Banyak" 
            onClick={() => setVisibleSheet(false)}  
            style="secondary"
            className="mt-4"
          />
        </View>
      </BottomSheet>
    </View>
  );
};

export default CariMasjid;
