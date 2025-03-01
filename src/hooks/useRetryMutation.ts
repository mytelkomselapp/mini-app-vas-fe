import { useMutation } from "react-query";

export interface RetryMutationProps {
  retryMaxAttempt: number;
  retryInterval: number;
  successStatusCode?: number[];
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
}

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
