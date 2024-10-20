import LoadingScreen from "../../components/LoadingScreen";
import { screenView } from "../../network/analytics/tracker";
import * as React from "react";

const CreateDetailTicketLazy = React.lazy(() => import("./CreateDetailTicket"));

const CreateDetailTicketPage: React.FC = () => {
  React.useEffect(() => {
    screenView("Create Ticket"); //fire screen view tracker
  }, []);

  return (
    <React.Suspense fallback={<LoadingScreen text="Loading..." />}>
      <CreateDetailTicketLazy />
    </React.Suspense>
  );
};

export default CreateDetailTicketPage;
