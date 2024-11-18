import * as React from "react";
import BottomSheet from "../../../../components/BottomSheet";
import IconNews from "../../../../assets/icon-news.svg";
import IconImage from "../../../../assets/ico-image.svg";
import { FileInputButton, ExtFile } from "@files-ui/react";
import { toast } from "../../../../components/ui/use-toast";
import { buttonClick } from "../../../../network/analytics/tracker";
import {
  filePathToBlob,
  getMobileOperatingSystem,
} from "../../../../lib/utils";
import { Image, View } from "@tarojs/components";
import FileInput from "../../../../components/FileInput";

export type SelectUploadMediaType = "gallery" | "camera" | "document";
interface Props {
  open: boolean;
  onClose: () => void;
  onSelectAction?: (media: SelectUploadMediaType) => void;
  onSelectImage: (filePath: string) => void;
}

const SelectUploadMedia: React.FC<Props> = ({
  open,
  onClose,
  onSelectImage,
}) => {
  // const handleOpenDocument = async (extFile: ExtFile[]) => {
  //   const file = extFile?.[0];
  //   const acceptedFormat = ["application/pdf"];

  //   if (acceptedFormat?.includes(file?.type ?? "")) {
  //     onSelectImage?.(file as File);
  //     return onClose?.();
  //   }

  //   toast({
  //     title: "Gagal Mengunggah Document",
  //     description: "Pastikan document berformat pdf",
  //     className: "bg-[#fef2f4] text-solidRed",
  //     duration: 3000,
  //   });
  //   onClose?.();
  // };

  // const handleOpenGallery = async (extFile: ExtFile[]) => {
  //   const file = extFile?.[0];
  //   const acceptedFormat = ["image/jpg", "image/jpeg", "image/png"];

  //   if (acceptedFormat?.includes(file?.type ?? "")) {
  //     onSelectImage?.(file as File);
  //     return onClose?.();
  //   }

  //   toast({
  //     title: "Gagal Mengunggah Gambar",
  //     description: "Pastikan gambar berformat jpg, jpeg atau png",
  //     className: "bg-[#fef2f4] text-solidRed",
  //     duration: 3000,
  //   });
  //   onClose?.();
  // };

  const handleSuccessOpenMedia = async (res: any) => {
    onSelectImage?.(res?.tempFiles?.[0]?.path);
    return onClose?.();
  };

  const handleSuccessOpenGallery = async (res: any) => {
    onSelectImage?.(res?.tempFilePaths?.[0]);

    return onClose?.();
  };

  return (
    <BottomSheet open={open} onClose={onClose}>
      <View>
        <div className="flex flex-col items-center gap-y-1 mt-1 mb-4 w-[100%]">
          <p className="text-base font-semibold">Upload E-Ticket</p>
          <p className="text-xs text-textSecondary text-center">
            Pilih file untuk kamu upload
          </p>
        </div>
        <div className="flex flex-row justify-center gap-x-8">
          {getMobileOperatingSystem() !== "Android" && (
            <div
              className="flex flex-col gap-y-2"
              onClick={() =>
                buttonClick(
                  "Document",
                  "Select Upload E-Ticket Method",
                  "Create Ticket",
                  window.location.pathname
                )
              }
            >
              <div
                data-type="document"
                className="rounded-[16px] bg-inactiveGrey flex items-center justify-center w-[56px] h-[56px]"
              >
                <FileInput
                  type="file"
                  config={{
                    count: 1,
                    type: "file",
                    extension: ["pdf"],
                    sizeType: ["original", "compressed"], // Allow original or compressed images
                    sourceType: ["album", "camera"], //
                    complete: handleSuccessOpenMedia,
                    fail: (err) => {
                      console.error("File selection failed:", err);
                    },
                  }}
                >
                  <img src={IconNews} style={{ width: 24, height: 24 }} />
                </FileInput>
              </div>
              <p className="text-xs text-textSecondary text-center">Document</p>
            </div>
          )}

          <div
            className="flex flex-col gap-y-2"
            onClick={() =>
              buttonClick(
                "Gallery",
                "Select Upload E-Ticket Method",
                "Create Ticket",
                window.location.pathname
              )
            }
          >
            <div
              data-type="gallery"
              className="rounded-[16px] bg-inactiveGrey flex items-center justify-center w-[56px] h-[56px]"
            >
              <FileInput
                type="image"
                config={{
                  count: 1, // Number of files to select
                  sizeType: ["original", "compressed"], // Allow original or compressed images
                  sourceType: ["album", "camera"], // Select from album or camera
                  success: handleSuccessOpenGallery,
                  fail: (err) => {
                    console.error("File selection failed:", err);
                  },
                }}
              >
                <img src={IconImage} style={{ width: 24, height: 24 }} />
              </FileInput>
            </div>
            <p className="text-xs text-textSecondary text-center">Gallery</p>
          </div>
        </div>
      </View>
    </BottomSheet>
  );
};

export default SelectUploadMedia;
