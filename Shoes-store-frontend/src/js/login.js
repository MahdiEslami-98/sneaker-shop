"use strict";
import { postData } from "../libs/axiosPost.js";
import { hideAlert, showAlert } from "../libs/errorHandler.js";

const backElem = document.getElementById("backBtn");
const signupElem = document.getElementById("signup");
const formElem = document.getElementById("form");
const showPassElem = document.getElementById("show_pass");
const passInput = document.getElementById("pass_input");
const userInput = document.getElementById("user_name_input");
const alertElem = document.getElementById("alert");

const data = {};
const valid = {
  user: false,
  pass: false,
};
let validMessage = "";

const validation = () => {
  validMessage = "";
  if (data["username"] && data["username"].length >= 5) {
    valid.user = true;
  } else {
    valid.user = false;
    validMessage += "<p>*Username must be at least 5 characters</p>";
  }
  if (data["password"] && data["password"].length >= 8) {
    valid.pass = true;
  } else {
    valid.pass = false;
    validMessage += "<p>*Password must be at least 8 characters</p>";
  }
};

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
  validation();
  if (!valid.user || !valid.pass) {
    showAlert(alertElem, validMessage);
    return;
  }
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
