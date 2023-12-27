"use strict";
import { postData } from "../libs/axiosPost.js";
import { showAlert, hideAlert } from "../libs/errorHandler.js";

const backElem = document.getElementById("backBtn");
const loginElem = document.getElementById("login");
const formElem = document.getElementById("form");
const showPassElem = document.getElementById("show_pass");
const showRepPassElem = document.getElementById("show_rep_pass");
const passInput = document.getElementById("pass_input");
const repPassInput = document.getElementById("repeat_pass");
const userInput = document.getElementById("user_name_input");
const alertElem = document.getElementById("alert");

const data = {};
const valid = {
  user: false,
  pass: false,
  repPass: false,
};
let validMessage = "";

const showPassToggle = (e) => {
  const target = e.target;
  if (target.id === "show_pass") {
    passInput.type = passInput.type === "password" ? "text" : "password";
    showPassElem.setAttribute(
      "src",
      passInput.type === "password"
        ? "./icon/eye-off-outline.svg"
        : "./icon/eye-outline.svg",
    );
  } else if (target.id === "show_rep_pass") {
    repPassInput.type = repPassInput.type === "password" ? "text" : "password";
    showRepPassElem.setAttribute(
      "src",
      repPassInput.type === "password"
        ? "./icon/eye-off-outline.svg"
        : "./icon/eye-outline.svg",
    );
  }
};

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
  if (data["repeatPassword"] === data["password"]) {
    valid.repPass = true;
  } else {
    valid.repPass = false;
    validMessage += "<p>*Password and repeat password are not equal</p>";
  }
};

formElem.addEventListener("input", (e) => {
  data[e.target.name] = e.target.value;
  hideAlert(alertElem);
});

formElem.addEventListener("submit", async (e) => {
  e.preventDefault();
  validation();
  if (!valid.user || !valid.pass || !valid.repPass) {
    showAlert(alertElem, validMessage);
    return;
  }
  delete data["repeatPassword"];
  const response = await postData("/auth/signup", data, alertElem);
  window.sessionStorage.setItem("token", response.data.token);
  window.location.href = "/products";
  userInput.value = "";
});

showPassElem.addEventListener("click", (e) => {
  showPassToggle(e);
});

showRepPassElem.addEventListener("click", (e) => {
  showPassToggle(e);
});

backElem.addEventListener("click", () => {
  location.href = "/slider";
});
loginElem.addEventListener("click", () => {
  location.href = "/login";
});
window.addEventListener("load", () => {
  const token = window.sessionStorage.getItem("token");
  if (token) {
    location.href = "/products";
  }
});
