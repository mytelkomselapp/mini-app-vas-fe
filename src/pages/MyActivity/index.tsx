import React from "react";
import LoadingScreen from "../../components/LoadingScreen";

const MyActivityLazy = React.lazy(() => import("./MyActivity"));

const MyActivity = () => {
  return (
    <React.Suspense fallback={<LoadingScreen text="Loading..." />}>
      <MyActivityLazy />
    </React.Suspense>
  );
};

export default MyActivity;
