import Taro from "@tarojs/taro";
import axios from "axios";
import {
  BASE_API_URL,
  BASE_CMS_API_URL,
  BASE_CMS_TOKEN,
  BASE_APPS_TOKEN,
} from "./env";
import { AxiosHTTPError } from "../network/types/api-response-container";
import { serializeParam } from "./serializeParam";

type API_SOURCE = "api" | "cms";
export type ENDPOINT_SOURCE = {
  [key: string]: {
    endpoint: string;
    source: API_SOURCE;
  };
};

const httpRequest = axios.create({
  timeout: 30000,
  baseURL: "",
  // transformRequest: defaultTransformRequest,
});

const requestHandler = async (requestConfig: any) => {
  // axios.defaults.adapter = MpAdapter;
  // 设置默认请求转换器
  // axios.defaults.transformRequest = defaultTransformRequest;

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
  if (source === "api") {
    try {
      const value = Taro.getStorageSync("customParams");
      if (value) {
        return value;
        // Do something with return value
      }
    } catch (e) {
      console.error(e);
      alert("Error: " + e);
      // Do something when catch error
    }
  } else {
    return BASE_CMS_TOKEN;
  }
};

export const get = <T extends string | ArrayBuffer = any>(
  endpoint: {
    endpoint: string;
    source: API_SOURCE;
  },
  queryParam: any = {},
  config?: Taro.request.Option
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

  return Taro.request<T>({
    url,
    ...config,
    header: {
      Authorization: bearerToken,
      "content-type": "application/json",
    },
    method: "GET",
  });
};

/**
 * handle HTTP POST to RestAPI
 */
export const post = <T extends string | ArrayBuffer = any>(
  endpoint: {
    endpoint: string;
    source: API_SOURCE;
  },
  body?: Record<string, any>,
  queryParam: any = {},
  config?: Taro.request.Option
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

  return Taro.request<T>({
    url,
    ...config,
    header: {
      Authorization: bearerToken,
      "content-type": "application/json",
    },
    data: body,
    method: "POST",
  });

  // return httpRequest.post<T>(url, body, newConfig);
};

/**
 * handle HTTP POST to RestAPI
 */
export const uploadFile = <T extends string | ArrayBuffer = any>(
  endpoint: {
    endpoint: string;
    source: API_SOURCE;
  },
  filePath: string
) => {
  /**
   * Url endpoint
   */
  let url = generateBaseURL(endpoint?.source, endpoint?.endpoint);

  const bearerToken = `Bearer ${generateToken(endpoint?.source)}`;

  return Taro.uploadFile({
    url,
    filePath, // Path to the file
    name: "files", // Form field name for the file
    header: {
      Authorization: bearerToken,
      "Content-Type": "multipart/form-data",
    },
  });
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
  config?: Taro.request.Option
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

  return Taro.request({
    url,
    ...config,
    header: {
      Authorization: bearerToken,
      "content-type": "application/json",
    },
    data: bodyparam,
    method: "DELETE",
  });
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
  config?: Taro.request.Option
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

  return Taro.request({
    url,
    ...config,
    header: {
      Authorization: bearerToken,
      "content-type": "application/json",
    },
    data: bodyparam,
    method: "DELETE",
  });

  // return httpRequest.patch(url, bodyparam, newConfig);
};

export default httpRequest;
