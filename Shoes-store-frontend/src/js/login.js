"use strict";
import { postData } from "../libs/axiosPost.js";
import { hideAlert } from "../libs/errorHandler.js";

const backElem = document.getElementById("backBtn");
const signupElem = document.getElementById("signup");
const formElem = document.getElementById("form");
const showPassElem = document.getElementById("show_pass");
const passInput = document.getElementById("pass_input");
const userInput = document.getElementById("user_name_input");
const alertElem = document.getElementById("alert");

const data = {};

showPassElem.addEventListener("click", () => {
  passInput.type = passInput.type === "password" ? "text" : "password";
  showPassElem.setAttribute(
    "src",
    passInput.type === "password"
      ? "./icon/eye-off-outline.svg"
      : "./icon/eye-outline.svg",
  );
});

formElem.addEventListener("input", (e) => {
  data[e.target.name] = e.target.value;
  hideAlert(alertElem);
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const response = await postData("/auth/login", data, alertElem);
  window.sessionStorage.setItem("token", response.data.token);
  window.location.href = "/products";
  userInput.value = "";
});

backElem.addEventListener("click", () => {
  location.href = "/slider";
});
signupElem.addEventListener("click", () => {
  location.href = "/signup";
});
window.addEventListener("load", () => {
  const token = window.sessionStorage.getItem("token");
  if (token) {
    location.href = "/products";
  }
});
