import * as React from "react";
import LoadingScreen from "../../components/LoadingScreen";

const OrderReviewLazy = React.lazy(() => import("./OrderReview"));

const OrderReview = () => {
  return (
    <React.Suspense
      fallback={<LoadingScreen text="Loading..." customClassName="mx-[20px]" />}
    >
      <OrderReviewLazy />
    </React.Suspense>
  );
};

export default OrderReview;
