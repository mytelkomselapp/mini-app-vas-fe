import { View, Image, Text } from "@tarojs/components";
import DashedDivider from "./components/DashedDivider";
import Button from "../../../../components/Button";
import CopyIcon from "../../../../assets/ico-copy.svg";
import ChevronUpIcon from "../../../../assets/chevron-up.svg";
import { useMemo, useState } from "react";
import useTaroNavBar from "../../../../hooks/useTaroNavBar";
import Taro from "@tarojs/taro";
import { formatValidUntil, getNavigateState } from "../../../../lib/utils";
import { RewardHistory } from "../../../../network/types/response-props";

const DetailHadiah = () => {
  useTaroNavBar();
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isCaraPenukaranOpen, setIsCaraPenukaranOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);

  const currentPath = Taro.getCurrentInstance().router?.path || "";
  const state = useMemo(() => getNavigateState(currentPath), [currentPath]);
  const item = state?.item as RewardHistory;
  const isAvailable = item.voucher_detail?.claim_status?.toLowerCase() === "available";

  return (
    <View className="bg-white min-h-screen pb-8">
      {/* Voucher Card */}
      <View
        className="mx-4 mt-4 bg-white rounded-lg relative overflow-hidden"
        style={{
          borderWidth: "2px",
          borderStyle: "solid",
          borderRadius: "8px",
          borderColor: "transparent",
          background:
            "linear-gradient(to bottom, transparent 0%, transparent 172px, transparent 172px, transparent 196px, #EFF1F4 196px) border-box",
          maskComposite: "exclude",
        }}
      >
        {/* Top Section */}
        <View className="h-[184px] bg-[#F5FBFF]">
          <Image
            src={item.reward_image}
            className="w-full h-full"
            mode="aspectFill"
          />
        </View>

        {/* Divider Section */}
        <View className="relative h-[1px]">
          <DashedDivider />
        </View>

        {/* Bottom Section */}
        <View className="p-4 bg-white">
          <View className="space-y-2 items-center text-center">
            <View className="flex flex-col mb-10">
              <Text className="text-lg font-semibold mb-2">{item.reward_name}</Text>
              <Text className="text-xs text-textSecondary">Berlaku sampai {' '}
                <Text className="text-xs text-textSecondary font-semibold">{item.voucher_detail?.tgl_expired}</Text>
              </Text>
            </View>

            <View>
              <View
                className="h-[1px] bg-dividerGrey w-full"
                style={{ marginTop: 16, marginBottom: 16 }}
              />

              <View className="items-center">
                <Button
                  label={isAvailable ? "Gunakan" : "Sudah Digunakan"}
                  disabled={!isAvailable}
                  onClick={() => {
                    Taro.navigateTo({
                      url:
                        "/subpackages/subpackage9/pages/Webview/index?url=" +
                        encodeURIComponent(
                          item?.voucher_detail?.url
                        ),
                    });
                   }}
                  className="font-semibold"
                />
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* Detail Sections */}
      <View className="mt-2 space-y-2">
        <View
          className="mx-4 bg-white rounded-lg"
          style={{
            borderWidth: "1px",
            borderStyle: "solid",
            borderColor: "#EFF1F4",
          }}
        >
          <View
            className="flex flex-row justify-between p-4 items-center cursor-pointer"
            onClick={() => setIsDetailOpen(!isDetailOpen)}
          >
            <Text className="text-lg font-semibold">Detail Voucher</Text>
            <Image
              className="w-4 h-4"
              src={ChevronUpIcon}
              style={{
                transform: `rotate(${isDetailOpen ? "180deg" : "0deg"})`,
              }}
            />
          </View>
          {isDetailOpen && (
            <View className="px-4 pb-4">
              <View className="space-y-2">
                <View className="flex flex-row justify-between items-center">
                  <Text className="text-sm text-textSecondary">Released</Text>
                  <Text className="text-sm text-textSecondary">{item.voucher_detail?.tgl_release ? formatValidUntil(item.voucher_detail.tgl_release) : '-'}</Text>
                </View>
                <View className="h-[1px] bg-dividerGrey w-full" />
                <View className="flex flex-row justify-between items-center">
                  <Text className="text-sm text-textSecondary">Expired</Text>
                  <Text className="text-sm text-textSecondary">{item.voucher_detail?.tgl_expired ? formatValidUntil(item.voucher_detail.tgl_expired) : '-'}</Text>
                </View>
                <View className="h-[1px] bg-dividerGrey w-full" />
                <View className="flex flex-row justify-between items-center">
                  <Text className="text-sm text-textSecondary">Claimed</Text>
                  <Text className="text-sm text-textSecondary">{item.voucher_detail?.tgl_claim ? formatValidUntil(item.voucher_detail.tgl_claim) : '-'}</Text>
                </View>
              </View>
            </View>
          )}
        </View>

        <View
          className="mx-4 bg-white rounded-lg"
          style={{
            borderWidth: "1px",
            borderStyle: "solid",
            borderColor: "#EFF1F4",
          }}
        >
          <View
            className="flex flex-row justify-between p-4 items-center cursor-pointer"
            onClick={() => setIsCaraPenukaranOpen(!isCaraPenukaranOpen)}
          >
            <Text className="text-lg font-semibold">Cara Penukaran</Text>
            <Image
              className="w-4 h-4"
              src={ChevronUpIcon}
              style={{
                transform: `rotate(${isCaraPenukaranOpen ? "180deg" : "0deg"})`,
              }}
            />
          </View>
          {isCaraPenukaranOpen && (
            <View className="px-4 pb-4">
              <View className="text-sm text-textSecondary">
                <View className="flex flex-row mb-2">
                  <Text className="mr-2 min-w-[20px]">1.</Text>
                  <Text>Pastikan voucher masih berlaku</Text>
                </View>
                <View className="flex flex-row mb-2">
                  <Text className="mr-2 min-w-[20px]">2.</Text>
                  <Text>Klik tombol "Klaim Hadiah" pada voucher</Text>
                </View>
                <View className="flex flex-row mb-2">
                  <Text className="mr-2 min-w-[20px]">3.</Text>
                  <Text>Pastikan nominal hadiah sudah sesuai</Text>
                </View>
                <View className="flex flex-row mb-2">
                  <Text className="mr-2 min-w-[20px]">4.</Text>
                  <Text>Klik tombol "Redeem Voucher"</Text>
                </View>
                <View className="flex flex-row mb-2">
                  <Text className="mr-2 min-w-[20px]">5.</Text>
                  <Text>Masukkan nomor tujuan yang akan di top-up, kemudian klik tombol "Sign In"</Text>
                </View>
                <View className="flex flex-row mb-2">
                  <Text className="mr-2 min-w-[20px]">6.</Text>
                  <Text>Pastikan nomor dan nominal sudah sesuai, klik tombol "Ya" untuk melanjutkan</Text>
                </View>
                <View className="flex flex-row mb-2">
                  <Text className="mr-2 min-w-[20px]">7.</Text>
                  <Text>Hadiah akan segera diproses, mohon menunggu hingga masuk ke akun e-wallet Anda</Text>
                </View>
                <View className="flex flex-row mb-2">
                  <Text className="mr-2 min-w-[20px]">8.</Text>
                  <Text>Status akan berubah menjadi "Sukses" ketika hadiah telah berhasil dikirim</Text>
                </View>
              </View>
            </View>
          )}
        </View>

        <View
          className="mx-4 bg-white rounded-lg"
          style={{
            borderWidth: "1px",
            borderStyle: "solid",
            borderColor: "#EFF1F4",
          }}
        >
          <View
            className="flex flex-row justify-between p-4 items-center cursor-pointer"
            onClick={() => setIsTermsOpen(!isTermsOpen)}
          >
            <Text className="text-lg font-semibold">Syarat & Ketentuan</Text>
            <Image
              className="w-4 h-4"
              src={ChevronUpIcon}
              style={{
                transform: `rotate(${isTermsOpen ? "180deg" : "0deg"})`,
              }}
            />
          </View>
          {isTermsOpen && (
            <View className="px-4 pb-4">
              <View className="text-sm text-textSecondary">
                <View className="flex flex-row mb-2">
                  <Text className="mr-2 min-w-[20px]">1.</Text>
                  <Text>Voucher tidak dapat diuangkan/ditukar dalam bentuk lain.</Text>
                </View>
                <View className="flex flex-row mb-2">
                  <Text className="mr-2 min-w-[20px]">2.</Text>
                  <Text>Voucher hanya dapat digunakan satu kali selama masa berlaku.</Text>
                </View>
                <View className="flex flex-row mb-2">
                  <Text className="mr-2 min-w-[20px]">3.</Text>
                  <Text>Pemenang ditentukan ketika event berakhir dan keputusan ini tidak dapat diganggu gugat.</Text>
                </View>
              </View>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default DetailHadiah;
