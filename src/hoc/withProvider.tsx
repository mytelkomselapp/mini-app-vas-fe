import * as React from "react";
import { HashRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

const withProvider =
  (WrappedComponents: React.ReactNode | any) => (props: any) => {
    return (
      <HashRouter>
        <QueryClientProvider client={queryClient}>
          <WrappedComponents {...props} />
        </QueryClientProvider>
      </HashRouter>
    );
  };

export default withProvider;
