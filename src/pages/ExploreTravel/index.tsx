import * as React from "react";
import LoadingScreen from "../../components/LoadingScreen";

const ExploreTravelLazy = React.lazy(() => import("./ExploreTravel"));

const ExploreTravel = () => {
  return (
    <React.Suspense
      fallback={<LoadingScreen text="Loading..." customClassName="mx-[20px]" />}
    >
      <ExploreTravelLazy />
    </React.Suspense>
  );
};

export default ExploreTravel;
