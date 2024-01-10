import axios, { AxiosError } from "axios";
import errorHandler from "./errorHandler";

const AxiosInstance = axios.create({
  baseURL: "http://localhost:3000",
});

export const getData = async (url: string) => {
  try {
    const response = await AxiosInstance.get(url);
    return response;
  } catch (e) {
    const html = errorHandler(e as AxiosError);
  }
};

export const postData = async (url: string, data: any) => {
  try {
    const response = await AxiosInstance.post(url, data);
    return response;
  } catch (e) {
    const html = errorHandler(e as AxiosError);
  }
};
