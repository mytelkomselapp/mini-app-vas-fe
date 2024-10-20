import * as React from "react";
import LoadingScreen from "../../components/LoadingScreen";

const OrderSummaryLazy = React.lazy(() => import("./OrderSummary"));

const OrderSummary = () => {
  return (
    <React.Suspense fallback={<LoadingScreen text="Loading..." />}>
      <OrderSummaryLazy />
    </React.Suspense>
  );
};

export default OrderSummary;
