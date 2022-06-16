import { AxiosInstance, AxiosResponse } from "axios";

const axiosInterceptor = (instance) => {
  // Usually string but can be any
  const parseError = (messages) => {
    if (messages) {
      if (messages instanceof Array) {
        return Promise.reject({ messages: messages });
      } else {
        return Promise.reject({ messages: [messages] });
      }
    } else {
      return Promise.reject({ messages: ["An error has occured"] });
    }
  };

  const parseBody = (response) => {
    if (response.status === 200) {
      return response.data;
    } else if (response.status === 204) {
      return response.data;
    } else if (response.status === 201) {
      return response.data;
    } else if (response.status === 401) {
      //** Insert refresh token code here */
      return Promise.reject({ messages: ["Phiên làm việc hết hạn"] });
    } else {
      return parseError(response.data.messages);
    }
  };

  //request header
  instance.interceptors.request.use(
    (config) => {
      const apiToken = sessionStorage.getItem("token");
      if (apiToken != null) {
        config.headers = { Authorization: "Bearer " + apiToken };
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  //response parse
  instance.interceptors.response.use(
    (response) => {
      return parseBody(response);
    },
    (error) => {
      if (error.response) {
        if (error.response.status === 401) {
          sessionStorage.removeItem("token");
        }
        return parseError(error.response.data);
      } else {
        return Promise.reject(error);
      }
    }
  );
  return instance;
};

export { axiosInterceptor };
