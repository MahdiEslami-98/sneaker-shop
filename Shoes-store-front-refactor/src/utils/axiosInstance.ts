import axios, { AxiosError } from "axios";
import { errorHandler, showAlert } from "./errorHandler";
import { serverUrl } from "./urls";

interface IAuthResponse {
  user: {
    username: string;
    id: number;
  };
  token: string;
}

interface IAuthBody {
  username: string;
  password: string;
}

const AxiosInstance = axios.create({
  baseURL: serverUrl,
});

export const getData = async (url: string) => {
  try {
    const token = sessionStorage.getItem("token");
    const response = await AxiosInstance.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (e) {
    const html = errorHandler(e as AxiosError);
  }
};

type PostDataType = (
  url: string,
  data: IAuthBody,
  el: HTMLElement,
) => Promise<IAuthResponse>;
export const postData: PostDataType = async (url, data, el) => {
  try {
    const response = await AxiosInstance.post(url, data);
    sessionStorage.setItem("token", response.data.token);
    return response.data;
  } catch (e) {
    const html = errorHandler(e as AxiosError);
    if (!html) return;
    showAlert(el, html);
  }
};
