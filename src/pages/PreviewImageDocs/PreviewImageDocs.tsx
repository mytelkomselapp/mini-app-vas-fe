import Navbar from "../../components/Navbar";
import * as React from "react";
import ShareIcon from "../../assets/ico-share.svg";
import { Document, Page, pdfjs } from "react-pdf";
import type { PDFDocumentProxy } from "pdfjs-dist";
import useWindowSize from "../../hooks/useWindowSize";
import Show from "../../components/Show";
import LoadingScreen from "../../components/LoadingScreen";
import { cn, getNavigateState, urlToFile } from "../../lib/utils";
import { toast } from "../../components/ui/use-toast";
import { useMemo } from "react";
import Taro from "@tarojs/taro";
import { Image } from "@tarojs/components";

// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//   "pdfjs-dist/build/pdf.worker.min.mjs",
//   import.meta.url
// ).toString();

const pdfOptions = {
  cMapUrl: "/cmaps/",
  standardFontDataUrl: "/standard_fonts/",
};

export interface PreviewImageDocsProps {
  fileUrl: string;
  fileExt: string;
  fileName: string;
}

const PreviewImageDocs: React.FC = () => {
  const currentPath = Taro.getCurrentInstance().router?.path || "";
  const state = useMemo(() => getNavigateState(currentPath), [currentPath]);
  const stateData = state?.state as PreviewImageDocsProps;

  console.log({ stateData, currentPath });

  const fileUrl = stateData?.fileUrl;
  const fileExt = stateData?.fileExt;
  const fileName = `${stateData?.fileName}${fileExt}`;
  const isFileData = [
    "doc",
    "pdf",
    "docx",
    "xlsx",
    "xls",
    "ppt",
    "pptx",
    "pdf",
  ]?.includes(fileExt);

  const { width } = useWindowSize();
  const [numPages, setNumPages] = React.useState<number>();

  const handleCopyClipboard = async () => {
    // try {
    //   await navigator.clipboard.writeText(fileUrl);
    //   toast({
    //     title: "Copied",
    //     description: "File url berhasil di copy",
    //     className: "bg-[#479CFF]",
    //     duration: 1000,
    //   });
    // } catch (error) {
    //   console.error("Error copying file url...");
    // }
  };

  const handleShareFile = async () => {
    // try {
    //   const files = await urlToFile(fileUrl, fileName);
    //   if (!!navigator.share) {
    //     return navigator.share({
    //       title: "My E-Ticket",
    //       text: "Berikut merupakan file My E-Ticket kamu",
    //       files: [files] as File[],
    //     });
    //   }
    //   return handleCopyClipboard();
    // } catch (error) {
    //   console.error(error);
    // }
  };

  const onDocumentLoadSuccess = ({
    numPages: nextNumPages,
  }: PDFDocumentProxy): void => {
    setNumPages(nextNumPages);
  };

  React.useEffect(() => {
    if (isFileData) {
      Taro.downloadFile({
        url: fileUrl,
        success: function (res) {
          const filePath = res.tempFilePath;
          Taro.openDocument({
            filePath: filePath,
            success: function (res) {
              console.log("File opened successfully");
            },
          });
        },
      });
    }
  }, [isFileData]);

  return (
    <React.Fragment>
      <Navbar
        title="Detail E-Ticket"
        className={
          "bg-white p-4 mt-0 mb-[4px] border-b-4 border-b-inactiveGrey"
        }
        rightContent={
          <Image
            src={ShareIcon}
            style={{ width: "24px", height: "24px" }}
            onClick={handleShareFile}
          />
        }
      />
      <div className="w-full h-auto max-w-[425px] overflow-x-hidden overflow-y-auto bg-inactiveGrey">
        <Show
          when={isFileData}
          fallbackComponent={
            <img src={fileUrl} className="w-full h-[100vh] object-cover" />
          }
        >
          {/* <Document
            file={fileUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            options={pdfOptions}
            loading={
              <LoadingScreen
                text="Load content..."
                customClassName="mx-[20px]"
              />
            }
          >
            {Array.from(new Array(numPages), (_, index) => (
              <Page
                key={`page_${index + 1}`}
                pageNumber={index + 1}
                width={width}
              />
            ))}
          </Document> */}
        </Show>
      </div>
    </React.Fragment>
  );
};

export default PreviewImageDocs;
