import * as React from "react";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

const withReactQuery =
  (WrappedComponents: React.ReactNode | any) => (props: any) => {
    return (
      <QueryClientProvider client={queryClient}>
        <WrappedComponents {...props} />
      </QueryClientProvider>
    );
  };

export default withReactQuery;
