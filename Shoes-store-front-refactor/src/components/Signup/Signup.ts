import { postData } from "../../utils/axiosInstance";
import { showAlert } from "../../utils/errorHandler";
import { authUrls } from "../../utils/urls";

declare global {
  interface Window {
    signupHandler: () => void;
    showPass: () => void;
    showRepeatPass: () => void;
  }
}

interface IData {
  username: string;
  password: string;
  repeatPassword?: string;
}

const valid = {
  user: false,
  pass: false,
  repPass: false,
};

let validMessage = "";

const validation = (d: IData) => {
  validMessage = "";
  if (d.username.length >= 5) {
    valid.user = true;
  } else {
    valid.user = false;
    validMessage += "<p>*Username must be at least 5 characters</p>";
  }
  if (d.password.length >= 8) {
    valid.pass = true;
  } else {
    valid.pass = false;
    validMessage += "<p>*Password must be at least 8 characters</p>";
  }
  if (d.repeatPassword === d.password) {
    valid.repPass = true;
  } else {
    valid.repPass = false;
    validMessage += "<p>*Password and repeat password are not equal</p>";
  }
};

window.signupHandler = async () => {
  const username = document.getElementById(
    "user_name_input",
  ) as HTMLInputElement;
  const password = document.getElementById("pass_input") as HTMLInputElement;
  const confirmPassword = document.getElementById(
    "repeat_pass",
  ) as HTMLInputElement;
  const alertElem = document.getElementById("alert") as HTMLDivElement;
  const data: IData = {
    username: username.value,
    password: password.value,
    repeatPassword: confirmPassword.value,
  };
  validation(data);
  if (!valid.user || !valid.pass || !valid.repPass) {
    showAlert(alertElem, validMessage);
    return;
  }
  delete data.repeatPassword;
  const res = await postData(authUrls.signup, data, alertElem);
  if (!res) return;
  window.navigate("/login");
};

const hideAndShow = (el: HTMLElement, el2: HTMLElement) => {
  el.classList.add("hidden");
  el2.classList.remove("hidden");
};

window.showPass = () => {
  const passInput = document.getElementById("pass_input") as HTMLInputElement;
  const showPassElem = document.getElementById("show_pass") as HTMLImageElement;
  const hidePassElem = document.getElementById("hide_pass") as HTMLImageElement;
  passInput.type = passInput.type === "password" ? "text" : "password";
  passInput.type === "password"
    ? hideAndShow(hidePassElem, showPassElem)
    : hideAndShow(showPassElem, hidePassElem);
};

window.showRepeatPass = () => {
  const repeatPassInput = document.getElementById(
    "repeat_pass",
  ) as HTMLInputElement;
  const showRepPassElem = document.getElementById(
    "show_rep_pass",
  ) as HTMLImageElement;
  const hideRepPassElem = document.getElementById(
    "hide_rep_pass",
  ) as HTMLImageElement;
  repeatPassInput.type =
    repeatPassInput.type === "password" ? "text" : "password";
  repeatPassInput.type === "password"
    ? hideAndShow(hideRepPassElem, showRepPassElem)
    : hideAndShow(showRepPassElem, hideRepPassElem);
};

export const SignupPage = () => {
  return `<div
        id="alert"
        class="w-4/5 absolute left-1/2 -translate-x-1/2 -top-96 transition-all p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
        role="alert"
      ></div>
      <div class="container mx-auto">
        <div class="w-full pl-6 pt-3">
          <div class="w-8 h-8 cursor-pointer" onclick="navigate('/slider')">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="ionicon h-full w-full"
              viewBox="0 0 512 512"
            >
              <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="48"
                d="M244 400L100 256l144-144M120 256h292"
              />
            </svg>
          </div>
        </div>
        <div class="w-14 h-20 mx-auto mt-12 mb-20">
          <img src="./logo.svg" alt="" class="h-full w-full" />
        </div>
        <p class="text-center text-3xl font-semibold">Sign up</p>
        <div class="w-full flex flex-col px-6">
          <div class="w-full bg-gray-200 flex items-center mt-4 rounded-sm">
            <label for="user_name_input" class="pl-3">
              <img src="./icons/person-outline.svg" alt="" class="w-4" />
            </label>
            <input
              type="text"
              class="bg-inherit px-4 py-2 outline-0 border-0 w-full"
              placeholder="Username"
              id="user_name_input"
              name="username"
              autocomplete="off"
            />
          </div>
          <div class="w-full bg-gray-200 flex items-center mt-4 rounded-sm">
            <label for="pass_input" class="pl-3">
              <img src="./icons/lock-closed-outline.svg" alt="" class="w-4" />
            </label>
            <input
              type="password"
              class="bg-inherit px-4 py-2 outline-0 border-0 w-full"
              placeholder="Password"
              id="pass_input"
              name="password"
            />
            <div class="pr-3" onclick="showPass()">
              <img
                src="./icons/eye-outline.svg"
                alt=""
                class="w-4 hidden"
                id="hide_pass"
              />
              <img
                src="./icons/eye-off-outline.svg"
                alt=""
                class="w-4"
                id="show_pass"
              />
            </div>
          </div>
          <div class="w-full bg-gray-200 flex items-center mt-4 rounded-sm">
            <label for="repeat_pass" class="pl-3">
              <img src="./icons/lock-closed-outline.svg" alt="" class="w-4" />
            </label>
            <input
              type="password"
              class="bg-inherit px-4 py-2 outline-0 border-0 w-full"
              placeholder="Repeat Password"
              id="repeat_pass"
              name="repeatPassword"
            />
            <div class="pr-3" onclick="showRepeatPass()">
              <img
                src="./icons/eye-outline.svg"
                alt=""
                class="w-4 hidden"
                id="hide_rep_pass"
              />
              <img
                src="./icons/eye-off-outline.svg"
                alt=""
                class="w-4"
                id="show_rep_pass"
              />
            </div>
          </div>
          <button
          onclick="signupHandler()"
            class="absolute bottom-4 w-[90%] py-2 text-center bg-black left-1/2 -translate-x-1/2 rounded-3xl text-white font-medium"
          >
            Sign Up
          </button>
        </div>
        <div class="w-full flex justify-center items-center mt-6">
          <p class="mr-3">Already have an account?</p>  
          <p class="text-xl font-medium cursor-pointer underline" id="login" onclick="navigate('/login')">Log in</p>
        </div>
      </div>`;
};
