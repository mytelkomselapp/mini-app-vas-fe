import LoadingScreen from "../../components/LoadingScreen";
import * as React from "react";

const TravelSearchLazy = React.lazy(() => import("./TravelSearch"));

const TravelSeachPage: React.FC = () => {
  return (
    <React.Suspense fallback={<LoadingScreen text="Loading..." />}>
      <TravelSearchLazy />
    </React.Suspense>
  );
};

export default TravelSeachPage;
