import { Text, View, Image } from "@tarojs/components";
import Button from "../../../../components/Button";
import BottomSheet from "../../../../components/BottomSheet";
import TruckIcon from '../../../../assets/icon-truck.svg';
import { useState } from "react";
import { handleNavigate } from "../../../../lib/utils";

const CheckoutMerchandise = () => {
  const [sheetVisible, setSheetVisible] = useState(true);

  const handleOpenForm = () => {
    setSheetVisible(false);
    handleNavigate('/subpackages/subpackage7/pages/FormMerchandise/index');
  }

  return (
    <View className="bg-inactiveGrey">
      <Text>Checkout Merchandise</Text>

      <BottomSheet open={sheetVisible} onClose={() => {setSheetVisible(false)}} containerClassname="p-4" withoutPadding withFloatingCloseButton>
        <View className="flex flex-col w-full items-center justify-center text-center mb-4">
          <Image src={TruckIcon} style={{ width: 128, height: 128, marginBottom: 16 }} />

          <p className="text-sm font-bold text-black mb-4 text-center">
            Mau tukar stamp dengan hadiah ini?
          </p>

          <p className={`text-xs leading-[16px] text-textSecondary text-center`}>
            Kamu belum memiliki alamat pengiriman. Yuk, masukkan alamat baru
          </p>
        </View>

        <Button label="Masukkan Alamat" onClick={handleOpenForm} className="mb-2" />
        <Button
          label="Nanti Saja"
          onClick={() => { }}
          style="secondary"
        // className="mb-8"
        />
      </BottomSheet>
    </View>
  )
}

export default CheckoutMerchandise;