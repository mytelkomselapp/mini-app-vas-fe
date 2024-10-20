import LoadingScreen from "../../components/LoadingScreen";
import * as React from "react";

const PreviewImageDocsLazy = React.lazy(() => import("./PreviewImageDocs"));

const PreviewImageDocs: React.FC = () => {
  return (
    <React.Suspense fallback={<LoadingScreen text="Loading..." />}>
      <PreviewImageDocsLazy />
    </React.Suspense>
  );
};

export default PreviewImageDocs;
