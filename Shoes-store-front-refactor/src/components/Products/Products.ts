import { getData } from "../../utils/axiosInstance";
import { sneakerUrls, userUrls } from "../../utils/urls";
import BrandsIcon from "../BrandsIcon";
import renderCards from "../ProductCard";
import Spinner from "../spinner";

declare global {
  interface Window {
    userInfo: () => void;
    observeHandler: () => void;
  }
}
interface IUserInfo {
  id: number;
  username: string;
  cart: string[];
}

type BrandsDataType = string[] | null;

let brandsData: BrandsDataType;
let page: number = 1;
let totalPages: null | number = null;
let totalProducts: null | number = null;
const limit: number = 10;
let productList = "";

const getBrands = async () => {
  if (brandsData) return brandsData;
  const response = await getData(sneakerUrls.brands);
  if (!response) return;
  brandsData = response.data;
  return brandsData;
};

const renderBrands = async () => {
  const data = await getBrands();
  if (!data) return;
  const brands = ["All", ...data];
  let html: string = "";
  brands.forEach((brand) => {
    html += `<button
            class="border-2 whitespace-nowrap border-[#343A40] rounded-3xl px-5 py-2  ${
              brand === "All" ? "text-white bg-[#343A40]" : ""
            }"
            data-brand="${brand}"
            >
            ${brand}
            </button>`;
  });
  return html;
};

const renderProducts = async (p = page, l = limit) => {
  const response = await getData(sneakerUrls.list + `?page=${p}&limit=${l}`);
  if (!response) return;
  totalPages = response.data.totalPages;
  totalProducts = response.data.total;
  const data = response.data.data;
  productList += renderCards(data);
  return productList;
};

const ProductsPage = async () => {
  const res = await getData(userUrls.userInfo);
  if (!res) return;
  const user: IUserInfo = res.data;

  const mainContainer = <HTMLDivElement>document.createElement("div");
  mainContainer.classList.add("h-full");

  const container = <HTMLDivElement>document.createElement("div");
  container.className = "flex w-full justify-between px-6 py-4";

  const userSection = <HTMLDivElement>document.createElement("div");
  userSection.className = "flex items-center justify-center";

  const profileImage = <HTMLDivElement>document.createElement("div");
  profileImage.className = "mr-2 w-12 overflow-hidden rounded-full";
  const image = <HTMLImageElement>document.createElement("img");
  image.src = "./image.png";
  image.alt = "";
  profileImage.appendChild(image);

  const userDetails = <HTMLDivElement>document.createElement("div");
  const greeting = <HTMLParagraphElement>document.createElement("p");
  greeting.className = "font-medium text-[#757575]";
  greeting.textContent = "Good Morning 👋";

  const username = <HTMLParagraphElement>document.createElement("p");
  username.className = "font-bold text-[#152536]";
  username.textContent = user.username;

  userDetails.appendChild(greeting);
  userDetails.appendChild(username);

  userSection.appendChild(profileImage);
  userSection.appendChild(userDetails);

  const actionSection = <HTMLDivElement>document.createElement("div");
  actionSection.className = "flex gap-4";

  const bellIcon = <HTMLImageElement>document.createElement("img");
  bellIcon.src = "./icons/bell.svg";
  bellIcon.alt = "";

  const heartIcon = <HTMLImageElement>document.createElement("img");
  heartIcon.src = "./icons/heart.svg";
  heartIcon.alt = "";

  actionSection.appendChild(bellIcon);
  actionSection.appendChild(heartIcon);

  container.appendChild(userSection);
  container.appendChild(actionSection);

  mainContainer.appendChild(container);

  const form = document.createElement("form");
  form.classList.add("relative", "w-full", "px-6", "pb-8", "pt-2");
  form.id = "search-bar";

  const searchContainer = document.createElement("div");
  searchContainer.classList.add(
    "flex",
    "rounded-sm",
    "bg-[#FAFAFA]",
    "px-3",
    "py-2",
  );

  const searchButton = document.createElement("button");
  searchButton.type = "submit";

  const searchIcon = document.createElement("img");
  searchIcon.src = "./icon/search.svg";
  searchIcon.alt = "";
  searchIcon.classList.add("w-4");

  const searchInput = document.createElement("input");
  searchInput.id = "search";
  searchInput.type = "text";
  searchInput.placeholder = "Search";
  searchInput.classList.add(
    "w-full",
    "bg-inherit",
    "px-2",
    "outline-none",
    "border-0",
  );
  searchInput.autocomplete = "off";

  searchButton.appendChild(searchIcon);
  searchContainer.appendChild(searchButton);
  searchContainer.appendChild(searchInput);

  const resultsContainer = document.createElement("div");
  resultsContainer.classList.add(
    "absolute",
    "left-0",
    "top-32",
    "z-50",
    "hidden",
    "w-full",
    "rounded",
    "bg-white",
    "px-6",
  );
  resultsContainer.id = "res";

  form.appendChild(searchContainer);
  form.appendChild(resultsContainer);

  searchInput.addEventListener("input", function () {
    const searchTerm = searchInput.value.trim();

    if (searchTerm !== "") {
      resultsContainer.innerHTML = `<p>Showing results for: ${searchTerm}</p>`;
      resultsContainer.style.display = "block";
    } else {
      resultsContainer.innerHTML = "";
      resultsContainer.style.display = "none";
    }
  });

  mainContainer.appendChild(form);

  const brandsIconContainer = document.createElement("div");
  brandsIconContainer.classList.add("mb-8", "px-6");
  brandsIconContainer.id = "brands-icon";

  const flexContainer = document.createElement("div");
  flexContainer.classList.add("flex");

  const brandsGridContainer = document.createElement("div");
  brandsGridContainer.classList.add(
    "grid",
    "grid-cols-4",
    "gap-x-9",
    "gap-y-7",
    "mx-auto",
  );
  brandsGridContainer.id = "brandsContainer";

  brandsGridContainer.innerHTML = BrandsIcon();

  flexContainer.appendChild(brandsGridContainer);

  brandsIconContainer.appendChild(flexContainer);

  mainContainer.appendChild(brandsIconContainer);

  const mostPopularContainer = document.createElement("div");
  mostPopularContainer.classList.add("flex", "justify-between", "px-6", "pb-5");

  const mostPopularText = document.createElement("div");
  mostPopularText.classList.add("text-xl", "font-semibold");
  mostPopularText.textContent = "Most Popular";

  const seeAllLink = document.createElement("div");
  seeAllLink.classList.add(
    "cursor-pointer",
    "font-semibold",
    "hover:underline",
  );
  seeAllLink.textContent = "See All";

  mostPopularContainer.appendChild(mostPopularText);
  mostPopularContainer.appendChild(seeAllLink);

  const brandsContainer = document.createElement("div");
  brandsContainer.id = "brands-container";
  brandsContainer.classList.add(
    "no-scrollbar",
    "flex",
    "w-full",
    "gap-3",
    "overflow-x-scroll",
    "px-6",
    "pb-6",
    "text-[#343A40]",
  );

  brandsContainer.innerHTML = (await renderBrands()) as string;

  mainContainer.appendChild(mostPopularContainer);
  mainContainer.appendChild(brandsContainer);

  const productListContainer = document.createElement("div");
  productListContainer.classList.add(
    "mx-auto",
    "pb-32",
    "grid",
    "w-full",
    "grid-cols-2",
    "gap-x-4",
    "gap-y-6",
    "px-6",
  );
  productListContainer.id = "productList";

  productListContainer.innerHTML = (await renderProducts()) as string;

  const spinnerContainer = document.createElement("div");
  spinnerContainer.classList.add("pb-32", "w-full", "text-center");
  spinnerContainer.id = "spinner";

  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      if (page < totalPages!) {
        page++;
        renderProducts().then((res) => {
          productListContainer.innerHTML = res as string;
        });
        if (page === totalPages!) spinnerContainer.classList.add("hidden");
      }
    }
  });
  observer.observe(spinnerContainer);

  spinnerContainer.innerHTML = Spinner();

  const renderProductsOfBrand = async (brandName) => {
    const mainURL = `/sneaker?page=1&limit=42&brands=${brandName}`;
    const response = await getData(mainURL);
    if (!response) return;
    const product = renderCards(response.data.data);
    productListContainer.innerHTML = product;
  };

  brandsContainer.addEventListener("click", (e) => {
    const btns = document.querySelectorAll("button");
    const btn = <HTMLButtonElement>e.target;
    const brand = btn.dataset.brand;
    if (!brand) return;
    btns.forEach((btn) => btn.classList.remove("bg-[#343A40]", "text-white"));
    btn.classList.add("bg-[#343A40]", "text-white");
    if (brand === "All") {
      productListContainer.innerHTML = "";
      spinnerContainer.classList.remove("hidden");
      page = 1;
      renderProducts();
    } else {
      spinnerContainer.classList.add("hidden");
      productListContainer.innerHTML = "";
      renderProductsOfBrand(brand);
    }
  });

  mainContainer.appendChild(productListContainer);
  mainContainer.appendChild(spinnerContainer);

  const bottomNavContainer = document.createElement("div");
  bottomNavContainer.classList.add(
    "fixed",
    "bottom-0",
    "z-10",
    "flex",
    "w-full",
    "justify-center",
    "gap-11",
    "bg-white",
    "pb-4",
    "pt-3",
  );

  const navItems = [
    { icon: "./icons/house-door-fill.svg", text: "Home" },
    { icon: "./icons/bag.svg", text: "Cart" },
    { icon: "./icons/cart2.svg", text: "Orders" },
    { icon: "./icons/wallet2.svg", text: "Wallet" },
    { icon: "./icons/person.svg", text: "Profile" },
  ];

  navItems.forEach((item) => {
    const navItem = document.createElement("div");
    navItem.classList.add(
      "flex",
      "cursor-pointer",
      "flex-col",
      "items-center",
      "justify-end",
    );

    const icon = document.createElement("img");
    icon.src = item.icon;
    icon.alt = "";
    icon.classList.add("w-6");
    navItem.appendChild(icon);

    const text = document.createElement("span");
    text.classList.add("text-[10px]");
    text.textContent = item.text;
    navItem.appendChild(text);

    bottomNavContainer.appendChild(navItem);
  });

  mainContainer.appendChild(bottomNavContainer);

  return mainContainer;
};

export default ProductsPage;
