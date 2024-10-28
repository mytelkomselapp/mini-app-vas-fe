import React from "react";

const ListFlightLazy = React.lazy(() => import("./ListPenerbangan"));

const ListFlight = () => {
  return (
    <React.Suspense fallback={<></>}>
      <ListFlightLazy />
    </React.Suspense>
  );
};

export default ListFlight;
