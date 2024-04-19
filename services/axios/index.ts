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
    return response.data;
  },
  function (error) {
    console.log('error', error);
    // return Promise.reject(error);
  }
);

export default axiosClient;
