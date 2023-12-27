"use strict";
import { renderCards } from "../components/productCard/renderProductCard.js";
import { getData } from "../libs/axiosGet.js";

const productsContainer = document.getElementById("productList");
const backBtn = document.getElementById("backBtn");
const searchWordElem = document.getElementById("search-word");
const foundsElem = document.getElementById("founds");
const notFoundElem = document.getElementById("nf");

const searchRequest = async () => {
  notFoundElem.classList.add("hidden");
  const searchTerm = location.href.split("=")[1];
  const response = await getData(
    `/sneaker?page=1&limit=42&search=${searchTerm}`,
  );
  foundsElem.innerHTML = `${response.data.total}`;
  searchWordElem.innerHTML = searchTerm;
  if (response.data.data.length === 0) {
    notFoundElem.classList.remove("hidden");
    return;
  }
  const products = renderCards(response.data.data);
  productsContainer.innerHTML = products;
};

productsContainer.addEventListener("click", (e) => {
  const id = e.target.closest("[data-id]").dataset.id;
  if (id) location.href = `/product?id=${id}`;
});

searchRequest();
backBtn.addEventListener("click", () => {
  location.href = "/products";
});
