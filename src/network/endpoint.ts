import { API_SOURCE } from "../core/http/types";

/**
 * Enum for endpoint keys to provide better autocompletion and type safety.
 */
export enum EndpointKeys {
  ExampleDataCollection = "exampleDataCollection",
  ExampleUploadFile = "exampleUploadFile",
}

/**
 * Object containing API and CMS endpoint configurations.
 */
const endpoints: Record<
  EndpointKeys,
  { endpoint: string; source: API_SOURCE }
> = {
  [EndpointKeys.ExampleDataCollection]: {
    endpoint: `your-api-endpoint-path`,
    source: "CMS",
  },
  [EndpointKeys.ExampleUploadFile]: {
    endpoint: `your-cms-endpoint-path`,
    source: "API",
  },
};

export default endpoints;
