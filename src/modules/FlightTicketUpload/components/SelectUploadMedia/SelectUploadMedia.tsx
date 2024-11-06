import * as React from "react";
import BottomSheet from "../../components/BottomSheet";
import IconNews from "../../assets/icon-news.svg";
import IconImage from "../../assets/ico-image.svg";
import { FileInputButton, ExtFile } from "@files-ui/react";
import { toast } from "../../components/ui/use-toast";
import { buttonClick } from "../../network/analytics/tracker";
import { getMobileOperatingSystem } from "../../lib/utils";

export type SelectUploadMediaType = "gallery" | "camera" | "document";
interface Props {
  open: boolean;
  onClose: () => void;
  onSelectAction?: (media: SelectUploadMediaType) => void;
  onSelectImage: (file: File) => void;
}

const SelectUploadMedia: React.FC<Props> = ({
  open,
  onClose,
  onSelectImage,
}) => {
  const handleOpenDocument = async (extFile: ExtFile[]) => {
    const file = extFile?.[0];
    const acceptedFormat = ["application/pdf"];

    if (acceptedFormat?.includes(file?.type ?? "")) {
      onSelectImage?.(file as File);
      return onClose?.();
    }

    toast({
      title: "Gagal Mengunggah Document",
      description: "Pastikan document berformat pdf",
      className: "bg-[#fef2f4] text-solidRed",
      duration: 3000,
    });
    onClose?.();
  };

  const handleOpenGallery = async (extFile: ExtFile[]) => {
    const file = extFile?.[0];
    const acceptedFormat = ["image/jpg", "image/jpeg", "image/png"];

    if (acceptedFormat?.includes(file?.type ?? "")) {
      onSelectImage?.(file as File);
      return onClose?.();
    }

    toast({
      title: "Gagal Mengunggah Gambar",
      description: "Pastikan gambar berformat jpg, jpeg atau png",
      className: "bg-[#fef2f4] text-solidRed",
      duration: 3000,
    });
    onClose?.();
  };

  return (
    <BottomSheet open={open} onClose={onClose}>
      <div className="flex flex-col items-center gap-y-2 p-[16px] mt-2 w-full">
        <div className="flex flex-col items-center gap-y-1 mt-1 mb-4 w-[90%]">
          <h1 className="text-base font-semibold">Upload E-Ticket</h1>
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
                <FileInputButton
                  variant="text"
                  style={{ backgroundColor: "transparent" }}
                  onChange={handleOpenDocument}
                  maxFiles={1}
                  disableRipple
                  accept="application/pdf"
                >
                  <img src={IconNews} />
                </FileInputButton>
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
              <FileInputButton
                variant="text"
                style={{ backgroundColor: "transparent" }}
                onChange={handleOpenGallery}
                maxFiles={1}
                disableRipple
                accept="image/png, image/jpeg, image/jpg"
              >
                <img src={IconImage} />
              </FileInputButton>
            </div>
            <p className="text-xs text-textSecondary text-center">Gallery</p>
          </div>
        </div>
      </div>
    </BottomSheet>
  );
};

export default SelectUploadMedia;
