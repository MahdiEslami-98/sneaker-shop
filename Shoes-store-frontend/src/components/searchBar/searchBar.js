"use strict";
import { debounce } from "lodash";
import { getData } from "/src/libs/axiosGet.js";

const searchForm = document.getElementById("search-bar");
const searchInput = document.getElementById("search");
const showResElem = document.getElementById("res");

const showSearchResult = async (e) => {
  const searchTerm = e.target.value;
  let index = 0;
  if (!searchTerm) {
    showResElem.innerHTML =
      '<p class="text-center text-xl py-4 font-medium">Result not found</p>';
    return;
  }
  const searchURL = `/sneaker?page=1&limit=42&search=${searchTerm}`;
  const searchResult = await getData(searchURL);
  showResElem.innerHTML = "";
  if (searchResult.data.data.length === 0) {
    showResElem.innerHTML =
      '<p class="text-center text-xl py-4 font-medium">Result not found</p>';
    return;
  }
  if (searchResult.data.data.length === 1) index = 1;
  if (searchResult.data.data.length >= 2) index = 2;
  for (let i = 0; i < index; i++) {
    showResElem.innerHTML += `
    <div class="mb-2 flex shadow items-center bg-[f3f3f3] rounded border" data-search-id="${searchResult.data.data[i].id}">
      <div class="flex h-full w-1/2 justify-center">
        <img src="${searchResult.data.data[i].imageURL}" alt="" class="h-20 w-20" />
      </div>
      <div class="w-1/2">
        <p
          class="overflow-hidden text-ellipsis whitespace-nowrap text-lg font-medium"
        >
          ${searchResult.data.data[i].name}
        </p>
      </div>
    </div>
    `;
  }
};

searchForm.addEventListener("input", debounce(showSearchResult, 800));
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchValue = searchInput.value;
  if (!searchValue) return;
  location.href = `/search?q=${searchValue}`;
  searchInput.value = "";
});
searchInput.addEventListener("focus", (e) => {
  showResElem.classList.remove("hidden");
});
window.addEventListener("click", (e) => {
  if (
    e.target === searchForm ||
    e.target === searchInput ||
    e.target.closest("[data-search-id]")
  )
    return;
  showResElem.classList.add("hidden");
});
window.addEventListener("load", (e) => {
  searchInput.value = "";
});
showResElem.addEventListener("click", (e) => {
  const id = e.target.closest("[data-search-id]").dataset.searchId;
  if (id) location.href = `/product?id=${id}`;
});
