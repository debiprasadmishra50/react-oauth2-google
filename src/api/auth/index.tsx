import { getLocalStorage } from "../../utils/localstorage";
import { handleError } from "./utils";

export const get = (endpoint: string, errorCallback?: Function, isBaseUrlV3?: boolean) => {
  const URL = `${
    isBaseUrlV3 ? process.env.REACT_APP_BASE_URL_V3 : process.env.REACT_APP_BASE_URL
  }${endpoint}`;
  const token = getLocalStorage("token");
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const resolvedResponse = await response.json();
      if (!endpoint.includes("login")) handleError(resolvedResponse.statusCode, errorCallback);
      resolve(resolvedResponse);
    } catch (error) {
      reject(error);
    }
  });
};

export const post = (
  endpoint: string,
  body?: any,
  errorCallback?: Function,
  contentType?: string,
  isBaseUrlV3?: boolean
) => {
  const URL = `${
    isBaseUrlV3 ? process.env.REACT_APP_BASE_URL_V3 : process.env.REACT_APP_BASE_URL
  }${endpoint}`;
  const token = getLocalStorage("token");
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": contentType ? contentType : "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: body ? JSON.stringify(body) : null,
      });
      const resolvedResponse = await response.json();
      handleError(resolvedResponse.statusCode, errorCallback);
      resolve(resolvedResponse);
    } catch (error) {
      reject(error);
    }
  });
};

export const postImage = (endpoint: string, body?: FormData, errorCallback?: Function) => {
  const URL = `${process.env.REACT_APP_BASE_URL}${endpoint}`;
  const token = getLocalStorage("token");
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body,
      });
      const resolvedResponse = await response.json();
      handleError(resolvedResponse.statusCode, errorCallback);
      resolve(resolvedResponse);
    } catch (error) {
      reject(error);
    }
  });
};

export const putImageInS3Url = (
  url: string,
  body?: FormData,
  errorCallback?: Function,
  method?: "POST" | "PUT" | undefined
) => {
  const URL = `${url}`;
  const Method = method ? method : "POST";
  // const token = getLocalStorage("token");
  return new Promise(async (resolve, reject) => {
    try {
      // const response = await fetch(URL, {
      await fetch(URL, {
        method: Method,
        headers: {
          // Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
        body,
      });
      // const resolvedResponse = await response.json();
      // handleError(resolvedResponse.statusCode, errorCallback);
      resolve({ status: "success", imageUrl: `${url.split("?")[0]}` });
    } catch (error) {
      reject(error);
    }
  });
};

export const patch = (endpoint: string, body?: any, errorCallback?: Function, isBaseUrlV3?: boolean) => {
  // const URL = `${process.env.REACT_APP_BASE_URL}${endpoint}`;
  const URL = `${
    isBaseUrlV3 ? process.env.REACT_APP_BASE_URL_V3 : process.env.REACT_APP_BASE_URL
  }${endpoint}`;
  const token = getLocalStorage("token");
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(URL, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: body ? JSON.stringify(body) : null,
      });
      const resolvedResponse = await response.json();
      handleError(resolvedResponse.statusCode, errorCallback);
      resolve(resolvedResponse);
    } catch (error) {
      reject(error);
    }
  });
};

export const del = (endpoint: string, body?: any, errorCallback?: Function) => {
  const URL = `${process.env.REACT_APP_BASE_URL}${endpoint}`;
  const token = getLocalStorage("token");
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(URL, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: body ? JSON.stringify(body) : null,
      });
      const resolvedResponse = await response.json();
      handleError(resolvedResponse.statusCode, errorCallback);
      resolve(resolvedResponse);
    } catch (error) {
      reject(error);
    }
  });
};
