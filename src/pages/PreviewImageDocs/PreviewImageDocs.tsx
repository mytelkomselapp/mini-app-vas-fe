import Navbar from "../../components/Navbar";
import * as React from "react";
import { ReactComponent as ShareIcon } from "../../assets/ico-share.svg";
import { useLocation } from "react-router-dom";
import { Document, Page, pdfjs } from "react-pdf";
import type { PDFDocumentProxy } from "pdfjs-dist";
import useWindowSize from "../../hooks/useWindowSize";
import Show from "../../components/Show";
import LoadingScreen from "../../components/LoadingScreen";
import { cn, urlToFile } from "../../lib/utils";
import { toast } from "../../components/ui/use-toast";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

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
  const location = useLocation();
  const stateData = location?.state as PreviewImageDocsProps;

  const fileUrl = stateData?.fileUrl;
  const fileExt = stateData?.fileExt;
  const fileName = `${stateData?.fileName}${fileExt}`;
  const isFileData = fileExt === ".pdf";

  const { width } = useWindowSize();
  const [numPages, setNumPages] = React.useState<number>();

  const handleCopyClipboard = async () => {
    try {
      await navigator.clipboard.writeText(fileUrl);

      toast({
        title: "Copied",
        description: "File url berhasil di copy",
        className: "bg-[#479CFF]",
        duration: 1000,
      });
    } catch (error) {
      console.error("Error copying file url...");
    }
  };

  const handleShareFile = async () => {
    try {
      const files = await urlToFile(fileUrl, fileName);

      if (!!navigator.share) {
        return navigator.share({
          title: "My E-Ticket",
          text: "Berikut merupakan file My E-Ticket kamu",
          files: [files] as File[],
        });
      }

      return handleCopyClipboard();
    } catch (error) {
      console.error(error);
    }
  };

  const onDocumentLoadSuccess = ({
    numPages: nextNumPages,
  }: PDFDocumentProxy): void => {
    setNumPages(nextNumPages);
  };

  return (
    <React.Fragment>
      <Navbar
        title="Detail E-Ticket"
        className={cn(
          "bg-white p-4 mt-0 mb-[4px] border-b-4 border-b-inactiveGrey"
        )}
        rightContent={<ShareIcon onClick={handleShareFile} />}
      />
      <div className="w-full h-auto max-w-[425px] overflow-x-hidden overflow-y-auto bg-inactiveGrey">
        <Show
          when={isFileData}
          fallbackComponent={
            <img src={fileUrl} className="w-full h-full object-cover" />
          }
        >
          <Document
            file={fileUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            options={pdfOptions}
            loading={<LoadingScreen text="Load content..." />}
          >
            {Array.from(new Array(numPages), (_, index) => (
              <Page
                key={`page_${index + 1}`}
                pageNumber={index + 1}
                width={width}
              />
            ))}
          </Document>
        </Show>
      </div>
    </React.Fragment>
  );
};

export default PreviewImageDocs;
