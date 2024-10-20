import * as React from "react";
import LoadingScreen from "../../components/LoadingScreen";

const ExploreTravelLazy = React.lazy(() => import("./DetailTransaction"));

const ExploreTravel = () => {
  return (
    <React.Suspense fallback={<LoadingScreen text="Loading..." />}>
      <ExploreTravelLazy />
    </React.Suspense>
  );
};

export default ExploreTravel;
