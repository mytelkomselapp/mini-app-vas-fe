import React from "react";
import { Image, View } from "@tarojs/components";
import { Card, Pill } from "../../../../components";
import { numberToRupiah } from "../../../../lib/string.utils";
import IconLike from "../../../../assets/ico_like.svg";

export interface OtherPackageProps {
  title: string;
  subscription_update_status: string;
  is_promo: boolean;
  price: number;
  after_discount_price: number;
}

export interface OtherPackageListProps {
  data: OtherPackageProps[];
  onClick?: (data: OtherPackageProps) => void;
}

const OtherPackageList: React.FC<OtherPackageListProps> = ({
  onClick,
  data = [],
}) => {
  const handleClick = (data: OtherPackageProps) => {
    onClick?.(data);
  };

  return (
    <Card className="flex flex-col gap-y-2 mt-1 mx-[16px]" padding="16px">
      <p className="text-[14px] font-semibold text-[#181C21]">
        Rekomendasi Paket Lainnya
      </p>

      <View className="flex flex-col mt-2">
        {data?.map((val, idx) => (
          <React.Fragment key={idx}>
            <View className="flex justify-between items-center h-[60px]">
              <View className="flex flex-col gap-y-3 w-[70%] overflow-hidden">
                <Pill
                  title={
                    <View className="flex gap-x-1 items-center">
                      <Image
                        src={IconLike}
                        className="h-[12px] w-[12px]"
                        mode="aspectFit"
                      />
                      <p className="text-[10px] text-[#14278c]">Promo</p>
                    </View>
                  }
                  bgColor="#EFEFFF"
                  padding="2px 8px"
                  borderRadius="8px"
                  alignSelf="start"
                />
                <View>
                  <p className="text-ellipsis overflow-hidden whitespace-nowrap text-[12px] font-semibold text-[#181C21]">
                    {val?.title}
                  </p>
                  <p className="text-ellipsis overflow-hidden whitespace-nowrap text-[12px] text-[#0050AE]">
                    {val?.subscription_update_status}
                  </p>
                </View>
              </View>
              <View className="flex flex-col justify-end items-center gap-y-2">
                <View
                  onClick={() => handleClick(val)}
                  className="bg-[#ff0025] rounded-[48px] cursor-pointer py-[6px] px-[16px] text-[10px] font-semibold text-white"
                >
                  {numberToRupiah(val?.after_discount_price)}
                </View>
                <p className="text-[10px] text-[#757F90] line-through">
                  {numberToRupiah(val?.price)}
                </p>
              </View>
            </View>
            {idx < data?.length - 1 && (
              <View className="h-[1px] w-full my-[16px] bg-[#dadada]" />
            )}
          </React.Fragment>
        ))}
      </View>
    </Card>
  );
};

export default OtherPackageList;
