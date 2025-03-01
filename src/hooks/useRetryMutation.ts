import { useMutation } from "react-query";

export interface RetryMutationProps {
  retryMaxAttempt: number;
  retryInterval: number;
  onSuccess: (data: any) => void;
  onError: (error: any) => void;
  successStatusCode?: number[];
}

const useRetryMutation = <TData, TVariables>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  {
    retryMaxAttempt,
    retryInterval,
    onSuccess,
    onError,
    successStatusCode = [200],
  }: RetryMutationProps
) => {
  const mutation = useMutation<TData, Error, TVariables>(
    // @ts-ignore
    async (variables) => {
      let attempt = 0;
      while (attempt < retryMaxAttempt) {
        try {
          const response = await mutationFn(variables);

          // Handle different response types
          let statusCode;
          if (
            response &&
            typeof response === "object" &&
            "statusCode" in response
          ) {
            statusCode = (response as any).statusCode; // If the API returns statusCode in JSON
          } else {
            statusCode = 200; // Assume success if statusCode is not present
          }

          // Retry only if statusCode is not in successStatusCode
          if (!successStatusCode?.includes(statusCode)) {
            console.warn(`Attempt ${attempt + 1} failed. Retrying...`);
            attempt++;
            if (attempt >= retryMaxAttempt)
              throw new Error("Max retry attempts reached");

            await new Promise((resolve) => setTimeout(resolve, retryInterval));
            continue; // Continue to the next attempt
          }

          return response;
        } catch (error) {
          console.error(`Error on attempt ${attempt + 1}:`, error);
          attempt++;
          if (attempt >= retryMaxAttempt) {
            throw error; // Final failure, throw error
          }
          await new Promise((resolve) => setTimeout(resolve, retryInterval));
        }
      }
    },
    {
      onSuccess,
      onError,
    }
  );

  return mutation;
};

export default useRetryMutation;
