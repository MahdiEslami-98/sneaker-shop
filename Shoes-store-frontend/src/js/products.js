"use strict";
import { renderCards } from "../components/productCard/renderProductCard.js";
import { getData } from "../libs/axiosGet.js";

const brandsContainer = document.getElementById("brands-container");
const user = document.getElementById("user");
const productsContainer = document.getElementById("productList");
const spinner = document.getElementById("spinner");
const brandsIconContainer = document.getElementById("brands-icon");
const hiddenElem = document.getElementById("hiddenElem");

let page = 1;
let totalPages = null;
let brandsData = null;
let userData = null;

const UInfo = async () => {
  if (userData) return userData;
  const userInfo = await getData("/user");
  userData = {
    id: userInfo.data.id,
    username: userInfo.data.username,
    cart: userInfo.data.cart,
  };
  return userData;
};

const renderUser = async () => {
  const main = await UInfo();
  user.innerText = main.username;
};

const getBrands = async () => {
  if (brandsData) return brandsData;
  const response = await getData("/sneaker/brands");
  brandsData = response.data;
  return brandsData;
};

const renderBrands = async () => {
  const brands = ["All", ...(await getBrands())];
  brandsContainer.innerHTML = "";
  brands.forEach((brand) => {
    if (brand === "All") {
      brandsContainer.innerHTML += `<button
            class="border-2 whitespace-nowrap border-[#343A40] rounded-3xl px-5 py-2 bg-[#343A40] text-white"
            data-brand="${brand}"
            >
            ${brand}
            </button>`;
      return;
    }
    brandsContainer.innerHTML += `<button
        class="border-2 whitespace-nowrap border-[#343A40] rounded-3xl px-5 py-2"
        data-brand="${brand}"
        >
        ${brand}
        </button>`;
  });
};

const renderProduct = async (p) => {
  const response = await getData(`/sneaker?page=${p}&limit=10`);
  const result = response.data;
  totalPages = result.totalPages;
  const products = renderCards(result.data);
  productsContainer.innerHTML += products;
};

const renderProductsOfBrand = async (brandName) => {
  const mainURL = `/sneaker?page=1&limit=42&brands=${brandName}`;
  const response = await getData(mainURL);
  const product = renderCards(response.data.data);
  productsContainer.innerHTML = product;
  spinner.classList.add("hidden");
};

//  ------infinite scroll with innerHeight------
// window.addEventListener("scroll", () => {
//   if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
//     if (page < totalPages) {
//       page++;
//       renderProduct();
//     }
//   }
// });

// -----infinite scroll with intersectionObserver------
const observer = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    if (page < totalPages) {
      page++;
      renderProduct(page);
      if (page === totalPages) spinner.classList.add("hidden");
    }
  }
});

observer.observe(spinner);

renderUser();
renderBrands();
renderProduct(page);

productsContainer.addEventListener("click", (e) => {
  const id = e.target.closest("[data-id]").dataset.id;
  if (id) location.href = `/product?id=${id}`;
});
brandsContainer.addEventListener("click", (e) => {
  const btns = document.querySelectorAll("button");
  const brand = e.target.dataset.brand;
  if (!brand) return;
  btns.forEach((btn) => btn.classList.remove("bg-[#343A40]", "text-white"));
  e.target.classList.add("bg-[#343A40]", "text-white");
  if (brand === "All") {
    productsContainer.innerHTML = "";
    spinner.classList.remove("hidden");
    page = 1;
    renderProduct(page);
  } else {
    spinner.classList.remove("hidden");
    productsContainer.innerHTML = "";
    renderProductsOfBrand(brand);
  }
});
brandsIconContainer.addEventListener("click", (e) => {
  const main = e.target.closest("[data-id]");
  if (main) {
    if (main.dataset.id === "dots") {
      if (main.children[1].innerText === "More") {
        main.children[1].innerText = "Less";
        hiddenElem.classList.remove("hidden");
        hiddenElem.classList.add("flex");
      } else if (main.children[1].innerHTML === "Less") {
        main.children[1].innerHTML = "More";
        hiddenElem.classList.remove("flex");
        hiddenElem.classList.add("hidden");
      }
    } else {
      location.href = `/brand?q=${main.dataset.id}`;
    }
  }
});
