import * as React from "react";
import LoadingScreen from "../../components/LoadingScreen";

const OrderSummaryLazy = React.lazy(() => import("./OrderSummary"));

const OrderSummary = () => {
  return (
    <React.Suspense
      fallback={<LoadingScreen text="Loading..." customClassName="mx-[20px]" />}
    >
      <OrderSummaryLazy />
    </React.Suspense>
  );
};

export default OrderSummary;
