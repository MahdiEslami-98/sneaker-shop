"use strict";
import axios from "axios";
import { errorHandler, showAlert } from "./errorHandler.js";

const baseURL = "http://localhost:3000";

export const postData = async (url, data, el = null) => {
  try {
    const response = await axios({
      method: "post",
      url: `${baseURL}${url}`,
      data: data,
    });
    return response;
  } catch (error) {
    const html = errorHandler(error);
    if (el) {
      showAlert(el, html);
    }
  }
};
