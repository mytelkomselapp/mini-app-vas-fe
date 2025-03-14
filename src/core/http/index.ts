import httpRequest, {
  deleteRequest,
  get,
  post,
  uploadFile,
  put,
} from "./request";

export { httpRequest };

/** Taro only suitable for this http request base on this docummentation https://docs.taro.zone/en/docs/apis/network/request/  */
const http = {
  delete: deleteRequest,
  get,
  post,
  put,
  uploadFile,
};

export default http;
