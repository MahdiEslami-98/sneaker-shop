import Navigo from "navigo";
import { HomePage, Loading } from "./components/Home/Home";
import { SignupPage } from "./components/Signup/Signup";
import { LoginPage } from "./components/Login/Login";
import { SliderPage } from "./components/Slider/Slider";

declare global {
  interface Window {
    navigate: (_: string) => void;
  }
}

window.navigate = (route: string) => {
  router.navigate(route);
};

const router = new Navigo("/");

export const render = (content: string) => {
  const App = document.querySelector("#app");
  if (!App) return;
  App.innerHTML = content;
};

router.on("/", () => {
  render(Loading());
  setTimeout(() => {
    render(HomePage());
  }, 3000);
});

router.on("/slider", () => {
  render(SliderPage());
});

router.on("/signup", () => {
  render(SignupPage());
});

router.on("/login", () => {
  render(LoginPage());
});

router.on("/products", () => {
  render("Products");
});

router.on("/prduct/:id", (id) => {
  render("Product");
});

router.resolve();
