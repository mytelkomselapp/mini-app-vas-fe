import { AxiosError, AxiosResponse } from "axios";

export interface FlightAPIMeta {
  message: string;
  code: string;
  status: string;
}
interface ApiSuccessResponse<T> {
  data: T;
  meta: FlightAPIMeta;
  message: string;
  status: string;
}

export type HttpSuccessResponse<T> = Promise<
  AxiosResponse<ApiSuccessResponse<T>>
>;

export type HttpSuccessUploadResponse<T> = Promise<AxiosResponse<T>>;

export interface HTTPError {
  message: string;
  type: string;
}

/**
 * Generic error type for http call using axios
 */
export type AxiosHTTPError = AxiosError<HTTPError>;
