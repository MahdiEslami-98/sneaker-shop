"use strict";
import axios from "axios";
import { errorHandler } from "./errorHandler.js";

const baseURL = "http://localhost:3000";

export const getData = async (url) => {
  const token = sessionStorage.getItem("token");
  try {
    const response = await axios({
      method: "get",
      url: `${baseURL}${url}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (err) {
    errorHandler(err);
  }
};
