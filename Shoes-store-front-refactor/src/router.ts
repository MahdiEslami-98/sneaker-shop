import Navigo, { Match } from "navigo";
import { HomePage, Loading } from "./components/Home/Home";
import { SignupPage } from "./components/Signup/Signup";
import LoginPage from "./components/Login/Login";
import { SliderPage } from "./components/Slider/Slider";
import ProductsPage from "./components/Products/Products";
import ProductPage from "./components/product";

declare global {
  interface Window {
    navigate: (_: string) => void;
  }
}

const router = new Navigo("/");

window.navigate = (route: string) => {
  router.navigate(route);
};

export const render = (content: string | HTMLElement) => {
  const App = document.querySelector("#app");
  if (!App) return;
  if (typeof content === "string") {
    App.innerHTML = content;
  } else {
    App.innerHTML = "";
    App.appendChild(content);
  }
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

router.on("/products", async () => {
  const html = await ProductsPage();
  if (!html) return;
  render(html);
});

router.on("/products/:id", async (id: Match | undefined) => {
  const html = await ProductPage(id);
  if (!html) return;
  render(html);
});

router.resolve();
