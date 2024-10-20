import axios, { AxiosRequestConfig } from "axios";
import { BASE_API_URL, BASE_CMS_API_URL, BASE_CMS_TOKEN } from "./env";
import { AxiosHTTPError } from "../network/types/api-response-container";
import { serializeParam } from "./serializeParam";
import { getCookie } from "../lib/utils";

type API_SOURCE = "api" | "cms";
export type ENDPOINT_SOURCE = {
  [key: string]: {
    endpoint: string;
    source: API_SOURCE;
  };
};

const httpRequest = axios.create({
  timeout: 30000,
});

const requestHandler = async (requestConfig: any) => {
  return requestConfig;
};

const errorHandler = (error: AxiosHTTPError) => {
  return Promise.reject({
    statusCode: error.response?.status,
    message: JSON.stringify(error?.response?.data),
  });
};

httpRequest.interceptors.request.use(
  (request: any) => requestHandler(request),
  (error: AxiosHTTPError) => errorHandler(error)
);

const generateBaseURL = (source: API_SOURCE, url: string) => {
  if (source === "api") {
    return `${BASE_API_URL}${url}`;
  }

  return `${BASE_CMS_API_URL}${url}`;
};

const generateToken = (source: API_SOURCE) => {
  if (source === "api")
    return getCookie("miniappsToken") || localStorage?.getItem("accessToken");

  return BASE_CMS_TOKEN;
};

export const get = <T = any>(
  endpoint: {
    endpoint: string;
    source: API_SOURCE;
  },
  queryParam: any = {},
  config?: AxiosRequestConfig
) => {
  /**
   * Url endpoint
   */
  let url = generateBaseURL(endpoint?.source, endpoint?.endpoint);
  /**
   * Add query param when `queryParam` is given
   */
  if (queryParam && Object.keys(queryParam).length > 0) {
    url = url + "?" + serializeParam(queryParam);
  }

  const bearerToken = `Bearer ${generateToken(endpoint?.source)}`;

  const newConfig: AxiosRequestConfig = {
    // attach config from param function
    ...config,
    headers: {
      ...config?.headers,
      Authorization: bearerToken,
      "content-type": "application/json",
    },
  };

  return httpRequest.get<T>(url, newConfig);
};

/**
 * handle HTTP POST to RestAPI
 */
export const post = <T = any>(
  endpoint: {
    endpoint: string;
    source: API_SOURCE;
  },
  body?: Record<string, any>,
  queryParam: any = {},
  config?: AxiosRequestConfig
) => {
  /**
   * Url endpoint
   */
  let url = generateBaseURL(endpoint?.source, endpoint?.endpoint);
  /**
   * Add query param when `queryParam` is given
   */
  if (queryParam && Object.keys(queryParam).length > 0) {
    url = url + "?" + serializeParam(queryParam);
  }

  const bearerToken = `Bearer ${generateToken(endpoint?.source)}`;

  const newConfig: AxiosRequestConfig = {
    ...config,
    headers: {
      ...config?.headers,
      Authorization: bearerToken,
    },
  };

  return httpRequest.post<T>(url, body, newConfig);
};

/**
 * handle HTTP DELETE to RestAPI
 *
 * Notes: we not allowed to use `delete` as declaration any good name is welcome
 */
export const apiDelete = (
  endpoint: {
    endpoint: string;
    source: API_SOURCE;
  },
  bodyparam?: any,
  queryParam: any = {},
  config?: AxiosRequestConfig
) => {
  /**
   * Url endpoint
   */
  let url = generateBaseURL(endpoint?.source, endpoint?.endpoint);
  /**
   * Add query param when `queryParam` is given
   */
  if (queryParam && Object.keys(queryParam).length > 0) {
    url = url + "?" + serializeParam(queryParam);
  }

  const bearerToken = `Bearer ${generateToken(endpoint?.source)}`;

  const newConfig: AxiosRequestConfig = {
    // attach config from param function
    ...config,
    data: bodyparam,
    headers: {
      ...config?.headers,
      Authorization: bearerToken,
    },
  };

  return httpRequest.delete(url, newConfig);
};

/**
 * handle HTTP PATCH to RestAPI
 */
export const patch = (
  endpoint: {
    endpoint: string;
    source: API_SOURCE;
  },
  bodyparam?: any,
  queryParam: any = {},
  config?: AxiosRequestConfig
) => {
  /**
   * Url endpoint
   */
  let url = generateBaseURL(endpoint?.source, endpoint?.endpoint);
  /**
   * Add query param when `queryParam` is given
   */
  if (queryParam && Object.keys(queryParam).length > 0) {
    url = url + "?" + serializeParam(queryParam);
  }

  const bearerToken = `Bearer ${generateToken(endpoint?.source)}`;

  const newConfig: AxiosRequestConfig = {
    ...config,
    headers: {
      ...config?.headers,
      Authorization: bearerToken,
    },
  };

  return httpRequest.patch(url, bodyparam, newConfig);
};

export default httpRequest;
