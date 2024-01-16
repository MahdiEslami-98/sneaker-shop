import { AxiosError } from "axios";

type ResponseType = {
  data: {
    message: string | string[];
  };
  statusText: string;
  status: number;
};

export const errorHandler = (e: AxiosError) => {
  if (!e.response) return;
  const er = e.response as ResponseType;
  if (er.status === 403) {
    window.location.href = "/login";
    // window.navigate("/login");
    // window.history.pushState({}, "", "/login");
    window.sessionStorage.removeItem("token");
  } else if (Array.isArray(er.data.message)) {
    let html = "";
    for (const err of er.data.message) {
      html += `<p>* ${err}</p>`;
    }
    return html;
  } else if (typeof er.data.message === "string") {
    return er.data.message;
  } else {
    return "Something went wrong";
  }
};

type ShowAlertType = (el: HTMLElement, message: string) => void;
export const showAlert: ShowAlertType = (el, message) => {
  el.innerHTML = message;
  el.classList.remove("-top-96");
  el.classList.add("top-10");
};

type HideAlertType = (el: HTMLElement) => void;
export const hideAlert: HideAlertType = (el) => {
  el.classList.remove("top-10");
  el.classList.add("-top-96");
};
