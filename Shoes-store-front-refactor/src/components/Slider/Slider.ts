// const nextSlideElem = document.getElementById("nextSlide");
// const nextBtn = document.getElementById("nextBtn");
// const messageElem = document.getElementById("message");
// const slideIndicatorsElem = document.getElementById("slideIndicators");

// const message = [
//   "We provide high quality products just for you",
//   "Your satisfaction is our number one periority",
//   "Let's fulfill your fashion needs with shoea right now!",
// ];

// let index = 0;

// const showIndicators = () => {
//   if (index === message.length) return;
//   slideIndicatorsElem.innerHTML = "";
//   for (let i = 0; i < message.length; i++) {
//     const indicator = document.createElement("div");
//     indicator.className = "w-7 h-[3px] bg-slate-800/30";
//     if (i === index) indicator.className = "w-7 h-[3px] bg-slate-800";
//     slideIndicatorsElem.appendChild(indicator);
//   }
// };

// const showMessage = () => {
//   messageElem.innerHTML = message[index] ?? message[message.length - 1];
//   showIndicators();
//   index++;
//   if (index === message.length) {
//     nextBtn.innerText = "Get Started";
//   }
//   if (index > message.length) {
//     location.href = "/login";
//     return;
//   }
//   nextSlideElem.click();
// };

// nextBtn.addEventListener("click", () => {
//   showMessage();
// });

// document.addEventListener("DOMContentLoaded", showMessage);

export const SliderPage = () => {
  return `
    <div
    id="controls-carousel"
    class="relative h-4/6 w-full"
    data-carousel="static"
  >
    <!-- Carousel wrapper -->
    <div class="relative h-full overflow-hidden">
      <!-- Item 1 -->
      <div class="hidden duration-700 ease-in-out" data-carousel-item>
        <img
          src="/public/download.jpg"
          class="absolute left-1/2 block h-full w-full -translate-x-1/2"
          alt="..."
        />
      </div>
      <!-- Item 2 -->
      <div
        class="hidden duration-700 ease-in-out"
        data-carousel-item="active"
      >
        <img
          src="/public/Jordan.jpg"
          class="absolute left-1/2 block h-full w-full -translate-x-1/2"
          alt="..."
        />
      </div>
      <!-- Item 3 -->
      <div class="hidden duration-700 ease-in-out" data-carousel-item>
        <img
          src="/public/Sweetsoles.jpg"
          class="absolute left-1/2 block h-full w-full -translate-x-1/2"
          alt="..."
        />
      </div>
    </div>
    <!-- Slider controls -->
    <button
      type="button"
      id="nextSlide"
      class="group absolute end-0 top-0 z-30 hidden h-full cursor-pointer items-center justify-center px-4 focus:outline-none"
      data-carousel-next
    >
      <span
        class="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/30"
      >
        <svg
          class="h-4 w-4 text-white rtl:rotate-180 dark:text-gray-800"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 6 10"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m1 9 4-4-4-4"
          />
        </svg>
        <span class="sr-only">Next</span>
      </span>
    </button>
  </div>
  <div class="px-2 pb-[8%] pt-[8%]">
    <p
      class="text-center text-2xl font-semibold text-gray-800"
      id="message"
    ></p>
  </div>
  <div class="flex w-full justify-center gap-3" id="slideIndicators"></div>
  <div class="flex w-full justify-center pt-[8%]">
    <button
      class="w-11/12 rounded-3xl bg-gray-900 py-1 text-white"
      id="nextBtn"
    >
      NEXT
    </button>
  </div>
  `;
};
