import * as React from "react";
import { getNavigateState } from "../../lib/utils";
import { useMemo } from "react";
import Taro from "@tarojs/taro";

export interface PreviewImageDocsProps {
  fileUrl: string;
  fileExt: string;
  fileName: string;
}

const PreviewImageDocs: React.FC = () => {
  const currentPath = Taro.getCurrentInstance().router?.path || "";
  const state = useMemo(() => getNavigateState(currentPath), [currentPath]);
  const stateData = state?.state as PreviewImageDocsProps;

  const fileUrl = stateData?.fileUrl;

  return (
    <React.Fragment>
      <div className="w-full h-auto max-w-[425px] overflow-x-hidden overflow-y-auto bg-inactiveGrey">
        <iframe src={fileUrl} style={{ width: "100%" }} frameBorder="0" />
      </div>
    </React.Fragment>
  );
};

export default PreviewImageDocs;
