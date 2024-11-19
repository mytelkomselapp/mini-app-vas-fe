import React from "react";
import LoadingScreen from "../../components/LoadingScreen";

const MyActivityLazy = React.lazy(() => import("./MyActivity"));

const MyActivity = () => {
  return (
    <React.Suspense
      fallback={<LoadingScreen text="Loading..." customClassName="mx-[20px]" />}
    >
      <MyActivityLazy />
    </React.Suspense>
  );
};

export default MyActivity;
