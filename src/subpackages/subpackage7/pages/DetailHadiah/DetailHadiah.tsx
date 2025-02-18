import { View, Image, Text } from "@tarojs/components";
import DashedDivider from "./components/DashedDivider";
import Button from "../../../../components/Button";
import CopyIcon from "../../../../assets/ico-copy.svg";
import ChevronUpIcon from "../../../../assets/chevron-up.svg";
import { useMemo, useState } from "react";
import useTaroNavBar from "../../../../hooks/useTaroNavBar";
import Taro from "@tarojs/taro";
import { getNavigateState } from "../../../../lib/utils";
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
              <Text className="text-sm text-textSecondary">
                Lorem ipsum dolor sit amet
              </Text>
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
              <Text className="text-sm text-textSecondary">
                Lorem ipsum dolor sit amet
              </Text>
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
