/** you can add another source if there is another source api  */
export type API_SOURCE = "API" | "CMS";

/**
 * Type definition for an endpoint source mapping.
 *
 * @typedef {Object} ENDPOINT_SOURCE
 * @property {Object.<string, { endpoint: string; source: API_SOURCE }>} - A mapping of keys to endpoint details.
 * Each key corresponds to an object containing:
 *   - `endpoint` (string): The API endpoint URL.
 *   - `source` (API_SOURCE): The source of the API.
 */
export type ENDPOINT_SOURCE = {
  [key: string]: {
    endpoint: string;
    source: API_SOURCE;
  };
};

export interface ENDPOINT_TYPE {
  endpoint: string;
  source: API_SOURCE;
}
