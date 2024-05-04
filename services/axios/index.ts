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
    return error.response.data;
  }
);

const axiosUpload = axios.create({
  headers: {
    'Content-Type': 'multipart/form-data'
  }
});

axiosUpload.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosUpload.interceptors.response.use(
  function (response) {
    console.log('response', response)
    return response.data;
  },
  function (error) {
    console.log('error', error);
    return error.response.data;
  }
);

export { axiosClient, axiosUpload };
