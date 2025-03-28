import Taro from "@tarojs/taro";
import { API_SOURCE } from "./http/types";
import { BASE_API_URL, BASE_CMS_API_URL, BASE_CMS_TOKEN } from "./http/env";

/**
 * Constructs the base URL by appending the given URL to the appropriate API source.
 *
 * @param {API_SOURCE} source - The source of the API.
 * @param {string} url - The endpoint URL.
 * @returns {string} - The full base URL.
 */
export const getBaseUrl = (source: API_SOURCE, url: string): string => {
  if (source === "API") {
    return `${BASE_API_URL}${url}`;
  }

  return `${BASE_CMS_API_URL}${url}`;
};

/**
 * Retrieves the authentication token based on the API source.
 *
 * @param {API_SOURCE} source - The source of the API.
 * @returns {string} - The retrieved token.
 */
export const getToken = (source: API_SOURCE): string => {
  if (source === "API") {
    try {
      const value = Taro.getStorageSync("customParams");
      if (value) {
        return value;
      }
    } catch (e) {
      console.error(e);
    }
  }

  return BASE_CMS_TOKEN as string;
};

/**
 * Serializes an object into a URL query string.
 *
 * @param {Record<string, any>} obj - The object to be serialized.
 * @returns {string} - The serialized query string.
 */
export const serializeParam = (obj: Record<string, any> = {}): string => {
  const str: string[] = [];

  Object.keys(obj)
    .sort()
    .forEach((key) => {
      if (Array.isArray(obj[key])) {
        obj[key].map((value: any) =>
          str.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        );
        return;
      }
      str.push(`${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`);
    });

  return str.join("&");
};
