import axios from 'axios';

const axiosClient = axios.create({
  baseURL: "/api",
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  function (response) {
    console.log('response', response);
    return response.data;
  },
  function (error) {
    console.log('error', error);
    // return error.response.data;
  }
);

export default axiosClient;
