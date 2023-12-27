"use strict";
const nextSlideElem = document.getElementById("nextSlide");
const nextBtn = document.getElementById("nextBtn");
const messageElem = document.getElementById("message");
const slideIndicatorsElem = document.getElementById("slideIndicators");

const message = [
  "We provide high quality products just for you",
  "Your satisfaction is our number one periority",
  "Let's fulfill your fashion needs with shoea right now!",
];

let index = 0;

const showIndicators = () => {
  if (index === message.length) return;
  slideIndicatorsElem.innerHTML = "";
  for (let i = 0; i < message.length; i++) {
    const indicator = document.createElement("div");
    indicator.className = "w-7 h-[3px] bg-slate-800/30";
    if (i === index) indicator.className = "w-7 h-[3px] bg-slate-800";
    slideIndicatorsElem.appendChild(indicator);
  }
};

const showMessage = () => {
  messageElem.innerHTML = message[index] ?? message[message.length - 1];
  showIndicators();
  index++;
  if (index === message.length) {
    nextBtn.innerText = "Get Started";
  }
  if (index > message.length) {
    location.href = "/login";
    return;
  }
  nextSlideElem.click();
};

nextBtn.addEventListener("click", () => {
  showMessage();
});

document.addEventListener("DOMContentLoaded", showMessage);
