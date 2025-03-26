import * as services from "./services";
import { useMutation, useQuery } from "react-query";
import { ExampleDataCollectionPayloadRequest } from "./types/request-payload";

export const useFetchDataCollection = (
  payload: ExampleDataCollectionPayloadRequest,
  enabled: boolean = true
) => {
  return useQuery(
    ["Example Fetch Data Collection"],
    services?.getDataCollection(payload),
    /** For the config you can see at react query docummentation https://tanstack.com/query/v4/docs/framework/react/reference/useQuery */
    {
      enabled,
    }
  );
};

export const usePostUploadETicketFile = () => {
  /** For the config you can see at react query docummentation https://tanstack.com/query/v4/docs/framework/react/reference/useMutation */
  return useMutation(
    ["Example Post Upload E Ticket"],
    services?.postExampleUploadFile
  );
};
