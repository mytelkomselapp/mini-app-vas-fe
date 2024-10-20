import httpRequest, { apiDelete, get, post, patch } from "./httpRequest";

export { httpRequest };

const http = {
  delete: apiDelete,
  get,
  post,
  patch,
};

export default http;
