import React from "react";
import BottomSheet from "../../../../../components/BottomSheet";
import Button from "../../../../../components/Button";
import { useDetailTaskRamadhan } from "../../../../../store/ramadhan";
import { MissionPopupCMSData } from "../../../../../network/types/response-props";
import BackgroundImage from "../../../../../components/BackgroundImage";
import { Image } from "@tarojs/components";
import DividerAtau from "../../../../../assets/divider-atau.png";
import { handleNavigate } from "../../../../../lib/utils";
import { useFetchLandingPageCMS } from "../../../../../network";
import Taro from "@tarojs/taro";

export interface DetailTaskIbadahModalProps {
  submitLoading: boolean;
  visible: boolean;
  data: MissionPopupCMSData[];
  onSubmit: (missionId: string) => void;
  onClose: () => void;
}

const DetailTaskIbadahModal: React.FC<DetailTaskIbadahModalProps> = ({
  data,
  visible,
  onSubmit,
  onClose,
  submitLoading,
}) => {
  const { data: dataRawLandingPageCMS, isLoading: isLoadingLandingPageCMS } =
    useFetchLandingPageCMS();

  const dataLandingPage =
    dataRawLandingPageCMS?.data?.data?.ramadhanSections ?? [];
  const sedekahTargetUrl =
    dataLandingPage
      ?.find((data) => data?.headerSection?.title === "Apps Section")
      ?.apps?.find((item) => item?.title?.toLowerCase() === "sedekah")
      ?.targetUrl || "";

  const { data: dataTaskRamadhan } = useDetailTaskRamadhan();

  const title = String(dataTaskRamadhan?.mission_name_id ?? "")?.toLowerCase();
  const activeDataTask = data.find(
    (item) => item.mission_id === dataTaskRamadhan?.mission_id
  );

  const isDzikir = /^dzikir (pagi|petang)$/.test(title);
  const isSedekah = /^sedekah subuh$/.test(title);
  const isDzikirOrSedekah = isDzikir || isSedekah;

  const handleClose = () => {
    onClose?.();
  };

  const handleSubmit = () => {
    onSubmit?.(activeDataTask?.mission_id ?? "");
  };

  const handleRedirect = () => {
    if (isDzikir) {
      handleNavigate("/subpackages/subpackage4/pages/Dzikir/index");
    }

    if (isSedekah) {
      if (sedekahTargetUrl) {
        Taro.invokeNativePlugin({
          api_name: "openWebView",
          data: {
            url: sedekahTargetUrl,
          },
          success: (res: any) => console.log("invokeNativePlugin success", res),
          fail: (err: any) => console.error("invokeNativePlugin fail", err),
        });
      }
    }

    onClose?.();
  };

  return (
    <BottomSheet
      withoutPadding
      showHeader={false}
      open={visible}
      onClose={handleClose}
      withFloatingCloseButton
    >
      <BackgroundImage
        imageUrl={activeDataTask?.backgroundImg}
        className="flex flex-col gap-y-1 p-[32px] bg-teal-100 h-[300px] object-contain rounded-t-[16px]"
      ></BackgroundImage>
      <div className="flex flex-col gap-y-3 justify-center items-center py-[12px] px-[16px]">
        <p className="text-[18px] text-center font-bold text-[#181c21] whitespace-pre">
          {`Apakah kamu sudah mengerjakan\n${title} ini?`}
        </p>

        <div className="flex flex-col gap-y-2 w-full px-[16px]">
          <Button
            disabled={submitLoading}
            onClick={handleSubmit}
            label="Ya, Sudah"
            style="primary"
          />
          <Button
            disabled={submitLoading}
            onClick={handleClose}
            label="Belum"
            style="secondary"
          />
          {isDzikirOrSedekah && (
            <>
              <Image src={DividerAtau} style={{ width: "100%", height: 20 }} />
              <Button
                disabled={submitLoading}
                onClick={handleRedirect}
                label={isDzikir ? "Buka Fitur Dzikir" : "Buka Fitur Sedekah"}
                style="secondary"
              />
            </>
          )}
        </div>
      </div>
    </BottomSheet>
  );
};

export default DetailTaskIbadahModal;
