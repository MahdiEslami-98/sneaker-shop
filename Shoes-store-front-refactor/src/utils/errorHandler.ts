import { AxiosError } from "axios";

type ResponseType = {
  data: {
    message: string | string[];
  };
  statusText: string;
  status: number;
};

const errorHandler = (e: AxiosError) => {
  if (!e.response) return;
  const er = e.response as ResponseType;
  if (er.status === 403) {
    window.navigate("/login");
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

export default errorHandler;
