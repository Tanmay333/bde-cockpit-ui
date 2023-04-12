import axios from "axios";
// import auth from "./authService";
import config from "../config";
/// Mock image API endpoint (for demonstration purpose only)
import MockAdapter from "axios-mock-adapter";
const mock = new MockAdapter(axios, { delayResponse: 3000 });
// change the status code from 200 to 500 to demonstrate error
mock.onGet(config.api.endpoints.images).reply(200, [
  {
    id: 0,
    title: "Card Title",
    imgSrc: "https://loremflickr.com/1024/512",
  },
  {
    id: 1,
    title: "Card Title",
    imgSrc: "https://loremflickr.com/1000/500",
  },
  {
    id: 2,
    title: "Card Title",
    imgSrc: "https://loremflickr.com/900/450",
  },
  {
    id: 3,
    title: "Card Title",
    imgSrc: "https://loremflickr.com/1012/506",
  },
  {
    id: 4,
    title: "Card Title",
    imgSrc: "https://loremflickr.com/980/490",
  },
]);
///

axios.defaults.baseURL = config.api.baseURL;

// axios.interceptors.request.use(async (config) => {
//   config = {
//     ...config,
//     headers: { Authorization: `Bearer ${await auth.getToken()}` },
//   };
//   return config;
// }, undefined);

const http = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete,
};

export default http;
