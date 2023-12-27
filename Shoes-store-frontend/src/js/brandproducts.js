"use strict";
import { getData } from "../libs/axiosGet.js";
import { renderCards } from "../components/productCard/renderProductCard.js";

const brandName = document.getElementById("category");
const backBtn = document.getElementById("backBtn");
const titleElem = document.getElementById("title");
const productsContainer = document.getElementById("productList");

const makeRequest = async () => {
  const reqBrand = location.search.split("=")[1];
  titleElem.innerHTML = reqBrand.replace(/%20/g, " ");
  brandName.innerHTML = reqBrand.replace(/%20/g, " ");
  const reqURL = `/sneaker?page=1&limit=42&brands=${reqBrand}`;
  const response = await getData(reqURL);
  const products = renderCards(response.data.data);
  productsContainer.innerHTML = products;
};

makeRequest();

backBtn.addEventListener("click", () => {
  location.href = "/products";
});

productsContainer.addEventListener("click", (e) => {
  const id = e.target.closest("[data-id]").dataset.id;
  if (id) location.href = `/product?id=${id}`;
});
