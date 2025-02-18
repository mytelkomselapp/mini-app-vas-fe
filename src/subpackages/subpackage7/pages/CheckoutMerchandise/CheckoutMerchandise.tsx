import { Text, View, Image } from "@tarojs/components";
import Button from "../../../../components/Button";
import BottomSheet from "../../../../components/BottomSheet";
import TruckIcon from '../../../../assets/icon-truck.svg';
import { useState } from "react";
import { handleNavigate } from "../../../../lib/utils";
import PinIcon from '../../../../assets/red-pin-location.svg';
import Dash from '../../../../assets/dash-blue-red.svg';
import StampIcon from '../../../../assets/icon-stamp-gamehub.svg';
import TrashIcon from '../../../../assets/trash.svg';
import PlusIcon from '../../../../assets/plus.svg';
import { useCurrentSelectedReward, useMerchandiseForm } from "../../../../store/ramadhan";
import Taro from "@tarojs/taro";
import { useFetchUserStamp, usePostRedeemMerchandise } from "../../../../network";
const CheckoutMerchandise = () => {
  // const [sheetVisible, setSheetVisible] = useState(true);
  const {
    fullName,
    phoneNumber,
    province,
    city,
    subdistrict,
    zipcode,
    address,
    email,
    labelAddress,
    getHasData
  } = useMerchandiseForm();
  const hasFormData = getHasData();
  const { currentSelectedReward } = useCurrentSelectedReward();

  const { data: dataUserStampRaw } = useFetchUserStamp();
  const dataUserStamp = dataUserStampRaw?.data?.data;
  const totalStamp = dataUserStamp?.total_stamp ?? 0;
  const userId = dataUserStamp?.user_id ?? '';

  const [requiredStamp, setRequiredStamp] = useState(1);
  const notEnoughStamp = requiredStamp > totalStamp;

  const { mutate: redeemMerchandise, isLoading: isLoadingRedeemMerchandise } = usePostRedeemMerchandise(userId);

  // Add calculation helpers
  const calculateSubtotal = () => {
    const redeemNominal = currentSelectedReward?.redeem_nominal || 0;
    return redeemNominal * requiredStamp;
  };

  const DISCOUNT_AMOUNT = 0; // Move magic number to constant
  const calculateTotal = () => {
    return calculateSubtotal() - DISCOUNT_AMOUNT;
  };

  const handleOpenForm = () => {
    // setSheetVisible(false);
    handleNavigate('/subpackages/subpackage7/pages/FormMerchandise/index');
  }

  const handleSubmit = async () => {
    console.log('handleSubmit');
    const result = await redeemMerchandise({
      reward_id: currentSelectedReward?.id || '',
      full_name: fullName,
      phone_number: phoneNumber,
      province: province,
      city: city,
      subdistrict: subdistrict,
      zipcode: zipcode,
      address: address,
      qty: requiredStamp,
    });

    const redemptionStatus = result?.data?.data?.redeem_result?.merchandise?.meta?.status === 'success' 
      ? 'success' 
      : 'failed';
    
    const redemptionPath = `/subpackages/subpackage8/pages/Redemption/index?status=${redemptionStatus}&stampAmount=${requiredStamp}`;
    handleNavigate(redemptionPath);
  }

  return (
    <>
    <View className="bg-inactiveGrey min-h-screen flex flex-col justify-between">

      <View>
        {/* Shipping Details Section */}
        {hasFormData && (
          <View className="bg-white mb-2">
            <View className="p-4 pb-2">
              <View className="mb-2">
            <Text className="text-sm font-bold">Detail Pengiriman</Text>
          </View>
          <View className="flex flex-row items-center mb-1">
            <Image src={PinIcon} style={{ width: 16, height: 16 }} className="mr-1" />
            <Text className="text-xs font-semibold">{labelAddress}</Text>
          </View>
          <View className="flex flex-col">
            <Text className="text-xs leading-[16px] text-textSecondary mb-1">
              {address} {subdistrict} {city} {province} {zipcode}
            </Text>
            <Text className="text-xs leading-[16px] text-textSecondary">
              {phoneNumber} | {email}
            </Text>
          </View>
        </View>
        <Image src={Dash} style={{ height: 4, width: '100%', display: 'block' }} />
          </View>
        )}

      {/* Product Section */}
      <View className="bg-white p-4 mb-2">
        <View className="flex justify-start">
          <Image
            className="w-20 h-20 rounded"
            src={currentSelectedReward?.image || ''}
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "16px"
            }}
            mode="aspectFill"
          />
          <View className="flex flex-row justify-between flex-1">
            <View className="ml-3 justify-start">
              <Text className="text-xs mb-2">{currentSelectedReward?.reward_name_id}</Text>
              <View className="flex flex-row items-center justify-center">
                <Image
                  src={StampIcon}
                  style={{
                    width: "16px",
                    height: "16px",
                    marginRight: "4px"
                  }}
                />
                <Text className="text-xs text-solidRed font-semibold mt-[2px]">{currentSelectedReward?.redeem_nominal} Stamp</Text>
              </View>
            </View>
            <View className="flex items-center">
              <Image 
                src={TrashIcon} 
                style={{ width: 24, height: 24 }} 
                onClick={() => {
                  setRequiredStamp(Math.max(0, requiredStamp - 1));
                }}/>
              <Text className="mx-3">{requiredStamp}</Text>
              <Image 
                src={PlusIcon} 
                style={{ width: 24, height: 24 }} 
                onClick={() => {setRequiredStamp(requiredStamp + 1)}}/>
            </View>
          </View>

        </View>
      </View>

      {/* Payment Method Section */}
      <View className="bg-white mb-2">
        <View className="p-4">
          <View className="mb-2">
            <Text className="text-sm font-bold">Metode Pembayaran</Text>
          </View>

          <View className="flex flex-row flex-1 items-center">
            <Image src={StampIcon} style={{ width: 24, height: 24 }} />
            <View className="flex flex-col ml-3 justify-start">
              <Text className="text-xs mb-2">Stamp Ramadan Fitri</Text>
              <Text className="text-xs text-solidRed">{totalStamp} Stamp {notEnoughStamp ? 'Tidak cukup' : ''}</Text>
            </View>
          </View>
        </View>

      </View>
      </View>
      

      {/* Payment Summary Section */}
      <View className="bg-white p-4">
        <Text className="text-sm font-bold mb-4">Ringkasan Pembayaran</Text>

        <View className="flex flex-row justify-between mb-2">
          <Text className="text-xs">Subtotal harga item</Text>
          <View className="flex flex-row items-center justify-center">
            <Image src={StampIcon} style={{ width: 16, height: 16 }} className="mr-1"/>
            <Text className="text-xs text-solidRed mt-[2px]">{calculateSubtotal()} Stamp</Text>
          </View>
        </View>

       {DISCOUNT_AMOUNT > 0 && (
        <View className="flex flex-row justify-between mb-4">
          <Text className="text-xs">Diskon item</Text>
          <Text className="text-xs text-solidRed mt-[2px]">- {DISCOUNT_AMOUNT} Stamp</Text>
        </View>
       )}

        <View className="h-[1px] bg-inactiveGrey mb-4" />

        <View className="flex flex-row justify-between mb-6">
          <Text className="text-xs">Total Penukaran</Text>
          <View className="flex flex-row items-center justify-center">
            <Image src={StampIcon} style={{ width: 24, height: 24 }} className="mr-1"/>
            <Text className="text-base text-solidRed font-semibold mt-1">{calculateTotal()} Stamp</Text>
          </View>
        </View>

        <Button label="Tukar Sekarang" onClick={handleSubmit} className="mb-2" disabled={notEnoughStamp || requiredStamp <= 0}/>
      </View>

      
    </View>

    <BottomSheet 
      open={!hasFormData} 
      onClose={() => { Taro.navigateBack() }} 
      containerClassname="p-4" 
      withoutPadding 
      withFloatingCloseButton={hasFormData}
    >
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
          label="Batal"
          onClick={() => { Taro.navigateBack() }}
          style="secondary"
        // className="mb-8"
        />
      </BottomSheet>

      </>
  )
}

export default CheckoutMerchandise;