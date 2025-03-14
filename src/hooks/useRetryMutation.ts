import { useMutation } from "react-query";

/**
 * Interface for retry mutation properties.
 */
export interface RetryMutationProps {
  /** Maximum number of retry attempts */
  retryMaxAttempt: number;
  /** Interval (in milliseconds) between retry attempts */
  retryInterval: number;
  /** Array of HTTP status codes considered successful (default: [200]) */
  successStatusCode?: number[];
  /** Callback function triggered on success */
  onSuccess?: (data: any) => void;
  /** Callback function triggered on error */
  onError?: (error: any) => void;
}

/**
 * Custom hook for handling mutations with retry logic.
 *
 * @template TData - The type of data returned from the mutation function.
 * @template TVariables - The type of variables passed to the mutation function.
 * @param {string | string[]} mutationKey - Unique key or array of keys for the mutation.
 * @param {(variables: TVariables) => Promise<TData>} mutationFn - Function that performs the mutation.
 * @param {RetryMutationProps} options - Configuration options for retry behavior.
 * @returns {import("react-query").UseMutationResult<TData, Error, TVariables>} - The mutation object.
 */
const useRetryMutation = <TData, TVariables>(
  mutationKey: string | string[],
  mutationFn: (variables: TVariables) => Promise<TData>,
  {
    retryMaxAttempt,
    retryInterval,
    successStatusCode = [200],
    onSuccess,
    onError,
  }: RetryMutationProps
) => {
  const mutation = useMutation<TData, Error, TVariables>({
    // @ts-ignore
    mutationKey: mutationKey
      ? Array.isArray(mutationKey)
        ? mutationKey
        : [mutationKey]
      : undefined, // Set mutationKey
    mutationFn: async (variables) => {
      let attempt = 0;
      while (attempt < retryMaxAttempt) {
        try {
          const response = await mutationFn(variables);

          // Extract status code if available
          const statusCode =
            response && typeof response === "object" && "statusCode" in response
              ? (response as any).statusCode
              : 200; // Default to 200 if statusCode is missing

          // Retry only if statusCode is NOT in successStatusCode
          if (!successStatusCode.includes(statusCode)) {
            console.warn(`Attempt ${attempt + 1} failed. Retrying...`);
            attempt++;
            if (attempt >= retryMaxAttempt)
              throw new Error("Max retry attempts reached");

            await new Promise((resolve) => setTimeout(resolve, retryInterval));
            continue;
          }

          return response;
        } catch (error) {
          console.error(`Error on attempt ${attempt + 1}:`, error);
          attempt++;
          if (attempt >= retryMaxAttempt) throw error;
          await new Promise((resolve) => setTimeout(resolve, retryInterval));
        }
      }
    },
    onSuccess,
    onError,
  });

  return mutation;
};

export default useRetryMutation;
