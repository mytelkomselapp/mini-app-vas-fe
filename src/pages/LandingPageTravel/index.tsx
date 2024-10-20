import * as React from "react";
import LoadingScreen from "../../components/LoadingScreen";

const LandingPageTravelLazy = React.lazy(() => import("./LandingPageTravel"));

const LandingPageTravel = () => {
  return (
    <React.Suspense fallback={<LoadingScreen text="Loading..." />}>
      <LandingPageTravelLazy />
    </React.Suspense>
  );
};

export default LandingPageTravel;
