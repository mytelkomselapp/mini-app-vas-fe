import * as React from "react";
import BottomSheet from "../../../../components/BottomSheet";
import IconNews from "../../../../assets/icon-news.svg";
import IconImage from "../../../../assets/ico-image.svg";
import { buttonClick } from "../../../../network/analytics/tracker";
import { getMobileOperatingSystem } from "../../../../lib/utils";
import { View } from "@tarojs/components";
import FileInput from "../../../../components/FileInput";
import Toast from "../../../../components/Toast";
import Show from "../../../../components/Show";

export type SelectUploadMediaType = "gallery" | "camera" | "document";
interface Props {
  open: boolean;
  onClose: () => void;
  onSelectAction?: (media: SelectUploadMediaType) => void;
  onSelectImage: (filePath: string, source: "document" | "image") => void;
}

const SelectUploadMedia: React.FC<Props> = ({
  open,
  onClose,
  onSelectImage,
}) => {
  const [toast, setToast] = React.useState<{
    title: string;
    description: string;
    status: "success" | "error";
    duration: number;
  } | null>(null);

  const showToast = ({
    title,
    description,
    status = "success",
    duration = 3000,
  }: {
    title: string;
    description: string;
    status?: "success" | "error";
    duration?: number;
  }) => {
    setToast({ title, description, status, duration });
    setTimeout(() => setToast(null), duration);
  };

  const handleSuccessOpenMedia = async (res: any) => {
    const fileData = res?.tempFiles?.[0];

    onSelectImage?.(fileData?.path, "document");
    return onClose?.();
  };

  const handleSuccessOpenGallery = async (res: any) => {
    const fileData = res?.tempFiles?.[0];

    onSelectImage?.(fileData?.path, "image");

    return onClose?.();
  };

  return (
    <BottomSheet open={open} onClose={onClose}>
      <View>
        <div className="flex flex-col items-center gap-y-1 mt-1 mb-4 w-[100%]">
          <p className="text-base font-semibold">Upload E-Ticket</p>
          <p className="!text-[12px] !text-[#757F90] text-center">
            Pilih file untuk kamu upload
          </p>
        </div>
        <div className="flex flex-row justify-center gap-x-8">
          {getMobileOperatingSystem() !== "Android" && (
            <div
              className="flex flex-col gap-y-2 justify-center items-center"
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
                    type: "all",
                    complete: handleSuccessOpenMedia,
                    fail: (err) => {
                      showToast({
                        title: "ERROR OPEN FILE",
                        description: `${JSON.stringify(err, null, 2)}`,
                        duration: 3000,
                        status: "error",
                      });
                    },
                  }}
                >
                  <img src={IconNews} style={{ width: 24, height: 24 }} />
                </FileInput>
              </div>
              <p className="!text-[12px] !text-[#757F90] text-center">
                Document
              </p>
            </div>
          )}

          <div
            className="flex flex-col gap-y-2 justify-center items-center"
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
            <p className="!text-[12px] !text-[#757F90] text-center">Gallery</p>
          </div>
        </div>
      </View>

      <Show when={!!toast}>
        <Toast
          title={toast?.title ?? ""}
          description={toast?.description ?? ""}
          status={toast?.status}
          onClose={() => setToast(null)}
        />
      </Show>
    </BottomSheet>
  );
};

export default SelectUploadMedia;
