import LoadingScreen from "../../components/LoadingScreen";
import * as React from "react";

const TravelSearchLazy = React.lazy(() => import("./TravelSearch"));

const TravelSeachPage: React.FC = () => {
  return (
    <React.Suspense
      fallback={<LoadingScreen text="Loading..." customClassName="mx-[20px]" />}
    >
      <TravelSearchLazy />
    </React.Suspense>
  );
};

export default TravelSeachPage;
