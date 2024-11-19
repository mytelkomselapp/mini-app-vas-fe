import React from "react";
import LoadingScreen from "../../components/LoadingScreen";

const HistoryTransactionDetailLazy = React.lazy(
  () => import("./HistoryTransactionDetail")
);

const HistoryTransactionDetail = () => {
  return (
    <React.Suspense
      fallback={<LoadingScreen text="Loading..." customClassName="mx-[20px]" />}
    >
      <HistoryTransactionDetailLazy />
    </React.Suspense>
  );
};

export default HistoryTransactionDetail;
