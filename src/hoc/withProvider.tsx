import * as React from "react";
import { QueryClientProvider } from "react-query";
import { queryClient } from "../core/query-client";

/**
 * Higher-order component (HOC) that wraps the given component with essential providers.
 *
 * - Provides `QueryClientProvider` from React Query for state management.
 * - You can also add other Providers as needed.
 *
 * @param {React.ReactNode | any} WrappedComponents - The component to be wrapped with providers.
 * @returns {(props: any) => JSX.Element} - A new component wrapped with necessary providers.
 */

const withProvider =
  (WrappedComponents: React.ReactNode | any) => (props: any) => {
    return (
      <QueryClientProvider client={queryClient}>
        <WrappedComponents {...props} />
      </QueryClientProvider>
    );
  };

export default withProvider;
