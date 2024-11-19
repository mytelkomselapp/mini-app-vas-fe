import React from "react";
import LoadingScreen from "../../components/LoadingScreen";

const HistoryActivityLazy = React.lazy(() => import("./HistoryActivity"));

const HistoryActivity = () => {
  return (
    <React.Suspense
      fallback={<LoadingScreen text="Loading..." customClassName="mx-[20px]" />}
    >
      <HistoryActivityLazy />
    </React.Suspense>
  );
};

export default HistoryActivity;
