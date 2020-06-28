import axios from "axios";
import { message } from "antd";

const baseUrl = "http://localhost:3000";

function GETRequest(url, params) {
  let promise = axios({
    headers: {},
    url,
    baseURL: baseUrl,
    params: params,
    responseType: "json",
    maxContentLength: 2000,
    validateStatus: function (status) {
      return status >= 200 && status < 300;
    },
  });
  return promise;
}

function POSTRequest(url, data) {
  let promise = axios({
    headers: {},
    url,
    baseURL: baseUrl,
    data,
    responseType: "json",
    maxContentLength: 2000,
    validateStatus: function (status) {
      return status >= 200 && status < 300;
    },
  });
  return promise;
}

async function request(type = "get", url, obj = {}) {
  let promise = null;
  promise =
    type === "get" ? GETRequest(url, obj.params) : POSTRequest(url, obj.data);
  try {
    const result = await promise;
    if (result.status === 200) {
      console.log(baseUrl + url, type === "get" ? obj.params : obj.data);
      return result.data;
    } else if (300 <= result.status < 400) {
      message.warn(result.statusText);
    } else if (result.status >= 400) {
      message.error(result.statusText);
    }
    return promise;
  } catch (error) {
    console.log(error);
    message.error('接口調用失敗'+error);
  }
}

export default request;
