import httpRequest, {
  apiDelete,
  get,
  post,
  patch,
  uploadFile,
} from "./httpRequest";

export { httpRequest };

const http = {
  delete: apiDelete,
  get,
  post,
  uploadFile,
  patch,
};

export default http;
