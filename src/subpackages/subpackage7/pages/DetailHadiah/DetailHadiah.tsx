import { View, Image, Text } from "@tarojs/components";
import DashedDivider from "./components/DashedDivider";
import Button from "../../../../components/Button";
import CopyIcon from "../../../../assets/ico-copy.svg";
import ChevronUpIcon from "../../../../assets/chevron-up.svg";
import { useState } from "react";
import useTaroNavBar from "../../../../hooks/useTaroNavBar";

const DetailHadiah = () => {
  const status = "failed";
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  useTaroNavBar();
  const statusBadgeConfig = {
    pending: {
      text: "Menunggu Konfirmasi",
      className: "text-mustard bg-[#FFF5E6]",
      description:
        "Barang kamu sedang diproses oleh admin kami. Silakan cek secara berkala untuk dapat informasi pengiriman.",
    },
    failed: {
      text: "Gagal",
      className: "text-textError bg-[#FDDDD4]",
      description: "",
    },
    standby: {
      text: "Berlaku sampai 25 Desember",
      className: "",
      description: "",
    },
    success: {
      text: "Berhasil",
      className: "text-successGreen bg-[#E6F7EE]",
      description: "Kurir: Pos Aja",
    },
  };

  const statusConfig = statusBadgeConfig[status];

  const buttonConfig = {
    success: {
      label: "1234534023203920396",
      icon: <img src={CopyIcon} className="ml-2 w-4 h-4" />,
      disabled: false,
    },
    pending: {
      label: "Sedang Diproses",
      disabled: true,
    },
    failed: {
      label: "Gagal",
      disabled: true,
    },
  };

  return (
    <View className="bg-white min-h-screen">
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
            src="https://cdndev.mytsel.id/cmsbucket/thubnail_1_6056087681_3e6c906f8b.png"
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
          <View className="space-y-2 items-center text-center mb-2">
            <View className="mb-2">
              <Text className="text-lg font-semibold">Topi - Bucket Hat</Text>
            </View>
            <View className="flex flex-row items-center justify-center w-full">
              <span
                className={`text-xs leading-[16px] ${
                  status !== "standby"
                    ? "font-semibold px-2 py-1 rounded-full"
                    : ""
                } ${statusConfig.className}`}
              >
                {statusConfig.text}
              </span>
            </View>

            {status !== "failed" && (
              <View>
                <View
                  className="h-[1px] bg-dividerGrey w-full"
                  style={{ marginTop: 16, marginBottom: 16 }}
                />

                <View className="space-y-1 items-center">
                  <View className="flex flex-row items-center justify-center text-center mb-2">
                    <Text className="text-xs text-textSecondary">
                      No. Resi:
                    </Text>
                  </View>
                  {status !== "standby" && (
                    <Button
                      {...buttonConfig[status]}
                      onClick={() => {}}
                      className="mb-4 font-semibold"
                    />
                  )}
                </View>

                {statusConfig.description && (
                  <span className="text-xs text-textSecondary leading-[16px]">
                    {statusConfig.description}
                  </span>
                )}
              </View>
            )}
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
            <Text className="text-lg font-semibold">Detail Merchandise</Text>
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
              <Text className="text-sm text-textSecondary">
                Lorem ipsum dolor sit amet
              </Text>
            </View>
          )}
        </View>

        {/* <View className="mt-4 space-y-2"> */}
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
              <Text className="text-sm text-textSecondary">
                Lorem ipsum dolor sit amet
              </Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default DetailHadiah;
