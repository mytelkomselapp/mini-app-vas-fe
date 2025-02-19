import Taro from "@tarojs/taro";
import axios from "axios";
import {
  BASE_API_URL,
  BASE_CMS_API_URL,
  BASE_CMS_TOKEN,
  BASE_GAMIFICATION_API_URL,
} from "./env";
import { AxiosHTTPError } from "../network/types/api-response-container";
import { serializeParam } from "./serializeParam";

type API_SOURCE = "api" | "cms" | "gamification";
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

  if (source === "gamification") {
    return `${BASE_GAMIFICATION_API_URL}${url}`;
  }

  return `${BASE_CMS_API_URL}${url}`;
};

const generateToken = (source: API_SOURCE) => {
  if (source === "api" || source === "gamification") {
    try {
      //comment this for DEV
      const value = Taro.getStorageSync("customParams");
      if (value) {
        return value;
      }
      //use this for DEV
      // return "1d23af96b21f90724050022fd15afaef-e7123f0b9108c4fef8886fc6eaa9e87fdd8ef7031c697cb84bbd266460efac8414943aa22df58013d5802e5d2cd6e60679a0c74eb9caffa3f12d247d5c30513ddbeed106294818791040edbf747ec46acd82b4d700562a4e00c0ff6987bbe09453f7ab71431f6fb5f3cd9f0ac8d493280e5616e3490a8668d0984411f1420bbc5706fea53e7dee94afde0ba7aafa97cb";
    } catch (e) {
      console.error(e);
      alert("Error: " + e);
      // Do something when catch error
    }
  }

  return BASE_CMS_TOKEN;
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
      "X-Api-Key": "861b3773-5a8f-43a4-858e-6f87d13c4880", // temporary will be move to env
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
  config?: Taro.request.Option,
  headers?: Record<string, any>
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
  console.log(headers, "headers");
  return Taro.request<T>({
    url,
    ...config,
    header: {
      ...headers,
      "X-Api-Key": "861b3773-5a8f-43a4-858e-6f87d13c4880", // temporary will be move to env
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
      "X-Api-Key": "861b3773-5a8f-43a4-858e-6f87d13c4880", // temporary will be move to env
      Authorization: bearerToken,
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
      "X-Api-Key": "861b3773-5a8f-43a4-858e-6f87d13c4880", // temporary will be move to env
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
  console.log({ bodyparam });
  return Taro.request({
    url,
    ...config,
    header: {
      "X-Api-Key": "861b3773-5a8f-43a4-858e-6f87d13c4880", // temporary will be move to env
      Authorization: bearerToken,
      "content-type": "application/json",
    },
    data: bodyparam,
    method: "PUT",
  });

  // return httpRequest.patch(url, bodyparam, newConfig);
};

export default httpRequest;
