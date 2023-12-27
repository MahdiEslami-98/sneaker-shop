"use strict";
const firstPage = document.getElementById("FP");

setTimeout(() => {
  firstPage.innerHTML = `<div class="relative h-full w-full bg-hero">
  <div
    id="alert"
    class="absolute top-0 h-full w-full bg-gradient-to-t from-black to-transparent"
  ></div>
  <div class="absolute bottom-0 w-full px-4 text-white">
    <p class="pb-8 text-5xl font-medium">Welcome to 👋</p>
    <p class="pb-8 text-6xl font-semibold">Shoea</p>
    <p class="pb-10 font-medium">
      The best sneakers & shoes e-commerse app of the century for your
      fashion needs!
    </p>
  </div>
</div>`;
  firstPage.addEventListener("click", () => {
    location.href = "/slider";
  });
}, 3000);
