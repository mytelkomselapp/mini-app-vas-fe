import axios from "axios";
import { AxiosHTTPError } from "../../network/types/api-response-container";
import { ENDPOINT_TYPE } from "./types";
import { getRequestConfig } from "./utils";
import Taro from "@tarojs/taro";

const httpRequest = axios.create({
  timeout: 30000,
  baseURL: "",
});

const requestHandler = async (requestConfig: any) => requestConfig;

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

export const get = <T extends string | ArrayBuffer = any>(
  endpoint: ENDPOINT_TYPE,
  queryParam: {} = {},
  config?: Taro.request.Option,
  headers?: Record<string, any>
) => {
  const { baseUrl, bearerToken } = getRequestConfig(
    endpoint?.source,
    endpoint?.endpoint,
    queryParam
  );

  return Taro.request<T>({
    url: baseUrl,
    ...config,
    header: {
      ...headers,
      Authorization: bearerToken,
      "content-type": "application/json",
    },
    method: "GET",
  });
};

export const post = <T extends string | ArrayBuffer = any>(
  endpoint: ENDPOINT_TYPE,
  body?: Record<string, any>,
  queryParam: {} = {},
  config?: Taro.request.Option,
  headers?: Record<string, any>
) => {
  const { baseUrl, bearerToken } = getRequestConfig(
    endpoint?.source,
    endpoint?.endpoint,
    queryParam
  );

  return Taro.request<T>({
    url: baseUrl,
    ...config,
    header: {
      ...headers,
      Authorization: bearerToken,
      "content-type": "application/json",
    },
    data: body,
    method: "POST",
  });
};

export const put = <T extends string | ArrayBuffer = any>(
  endpoint: ENDPOINT_TYPE,
  body?: Record<string, any>,
  queryParam: {} = {},
  config?: Taro.request.Option,
  headers?: Record<string, any>
) => {
  const { baseUrl, bearerToken } = getRequestConfig(
    endpoint?.source,
    endpoint?.endpoint,
    queryParam
  );

  return Taro.request<T>({
    url: baseUrl,
    ...config,
    header: {
      ...headers,
      Authorization: bearerToken,
      "content-type": "application/json",
    },
    data: body,
    method: "PUT",
  });
};

/**
 *  Notes: we not allowed to use `delete` as declaration any good name is welcome
 */
export const deleteRequest = <T extends string | ArrayBuffer = any>(
  endpoint: ENDPOINT_TYPE,
  body?: Record<string, any>,
  queryParam: {} = {},
  config?: Taro.request.Option,
  headers?: Record<string, any>
) => {
  const { baseUrl, bearerToken } = getRequestConfig(
    endpoint?.source,
    endpoint?.endpoint,
    queryParam
  );

  return Taro.request<T>({
    url: baseUrl,
    ...config,
    header: {
      ...headers,
      Authorization: bearerToken,
      "content-type": "application/json",
    },
    data: body,
    method: "DELETE",
  });
};

export const uploadFile = (endpoint: ENDPOINT_TYPE, filePath: string) => {
  const { baseUrl, bearerToken } = getRequestConfig(
    endpoint?.source,
    endpoint?.endpoint
  );

  return Taro.uploadFile({
    url: baseUrl,
    filePath, // Path to the file
    name: "files", // Form field name for the file
    header: {
      Authorization: bearerToken,
    },
  });
};

export default httpRequest;
