import { RequestTask } from "@tarojs/taro";
import { AxiosError, AxiosResponse } from "axios";

export interface APIMeta {
  message: string;
  code: string;
  status: string;
}
interface ApiSuccessResponse<T> {
  data: T;
  meta: APIMeta;
  message: string;
  status: string;
  statusCode: number;
}

export type HttpSuccessResponse<T> = Promise<
  AxiosResponse<ApiSuccessResponse<T>>
>;

export type HttpSuccessUploadResponse<T> = RequestTask<
  Promise<AxiosResponse<T>>
>;

export interface HTTPError {
  message: string;
  type: string;
}

/**
 * Generic error type for http call using axios
 */
export type AxiosHTTPError = AxiosError<HTTPError>;
