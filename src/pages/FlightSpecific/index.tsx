import React from "react";
import LoadingScreen from "../../components/LoadingScreen";

const FlightSpecificLazy = React.lazy(() => import("./FlightSpecific"));

const FlightSpecific = () => {
  return (
    <React.Suspense
      fallback={<LoadingScreen text="Loading..." customClassName="mx-[20px]" />}
    >
      <FlightSpecificLazy />
    </React.Suspense>
  );
};

export default FlightSpecific;
