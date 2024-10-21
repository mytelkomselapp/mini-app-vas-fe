import * as React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Toaster } from "../components/ui/toaster";

const queryClient = new QueryClient({
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
      <QueryClientProvider client={queryClient}>
        <WrappedComponents {...props} />
        <Toaster />
      </QueryClientProvider>
    );
  };

export default withProvider;
