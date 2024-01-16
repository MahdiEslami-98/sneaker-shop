import { Match } from "navigo";
import { getData } from "../../utils/axiosInstance";
import { sneakerUrls } from "../../utils/urls";

declare global {
  interface Window {
    showMoreHandler: (event: MouseEvent) => void;
  }
}

interface IInfo {
  data: {
    id: Match;
  };
}

interface IProduct {
  id: number;
  name: string;
  price: number;
  imageURL: string;
  colors: string;
  sizes: string;
}

window.showMoreHandler = (event) => {
  const dotsElem = <HTMLButtonElement>event.target;
  const moreElem = <HTMLSpanElement>document.getElementById("more");
  if (moreElem?.classList.contains("hidden")) {
    moreElem.classList.remove("hidden");
    dotsElem.innerHTML = "...less";
  } else {
    moreElem?.classList.add("hidden");
    dotsElem.innerHTML = "more...";
  }
};

// url: string;
//     queryString: string;
//     hashString: string;
//     route: Route;
//     data: {
//         [key: string]: string;
//     } | null;
//     params: {
//         [key: string]: string;
//     } | null;
// }

type ProductPageType = (_: Match | undefined) => Promise<string | undefined>;
const ProductPage: ProductPageType = async (url) => {
  const product: IProduct = (await getData(sneakerUrls.detail + url?.data?.id))
    ?.data;
  if (!product) return;
  document.querySelector("title")!.innerHTML = product.name;
  const colorArr = product.colors.split("|");
  let colorsElem = "";
  colorArr.forEach((item) => {
    colorsElem += `
        <span class="w-10 h-10 border border-gray-400 inline-block rounded-full" style="background-color: ${item}"></span>
        `;
  });
  const sizeArr = product.sizes.split("|");
  let sizesElem = "";
  sizeArr.forEach((item) => {
    sizesElem += `
            <span class="inline-flex justify-center items-center w-10 h-10 border border-gray-800 rounded-full">${item}</span>
        `;
  });
  const html = `
      <div
            class="w-full h-1/2 px-6 bg-[#f3f3f3] flex justify-center items-center overflow-hidden"
          >
            <img src="${product.imageURL}" alt="" class="w-full h-full" />
          </div>
          <div class="px-6 pt-5">
            <div class="flex justify-between items-center gap-4 mb-3">
              <p
                class="text-xl w-full overflow-hidden whitespace-nowrap text-ellipsis font-semibold"
              >
                ${product.name}
              </p>
              <img src="/icons/heart.svg" alt="" />
            </div>
            <div class="flex items-center border-b pb-3 text-xs font-light">
              <p class="py-2 px-3 bg-[#e0e0e0] rounded-md mr-5 text-gray-600">
                3,568 sold
              </p>
              <img src="/icons/star-half.svg" alt="" />
              <p class="text-gray-700 ml-2">4.3 (1,567 reviews)</p>
            </div>
          </div>
          <div class="px-6 mt-4 transition-all">
            <p class="font-medium">Description</p>
            <span class="text-sm font-light">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore optio</span>
              <span class="text-sm font-light hidden" id="more">
               debitis, dolores impedit accusantium blanditiis tempore nam beatae
               reprehenderit ipsam nemo totam. Corrupti deleniti ipsum quisquam placeat
               quis ullam commodi.
               </span>
              <button class="text-gray-800 font-semibold" onclick="showMoreHandler(event)">more...</button>
            </p>
          </div>
          <div class="w-full flex pl-6 text-gray-800 mt-3">
            <div class="w-1/2 mr-4">
              <p class="font-medium px-2 mb-2">Size</p>
              <div
                class="w-full px-1 no-scrollbar whitespace-nowrap overflow-x-scroll"
              >${sizesElem}</div>
            </div>
            <div class="w-1/2">
              <p class="font-medium px-2 mb-2">Color</p>
              <div
                class="w-full px-1 whitespace-nowrap no-scrollbar overflow-x-scroll"
              >${colorsElem}</div>
            </div>
          </div>
          <div class="px-6 flex items-center mt-5">
            <p class="font-medium">Quantity</p>
            <div
              class="flex items-center px-5 py-1 bg-gray-200 rounded-3xl gap-5 ml-4"
            >
              <button>-</button>
              <span>1</span>
              <button>+</button>
            </div>
          </div>
          <div class="w-full px-6 pt-4">
            <div class="border-t py-4 flex justify-between">
              <div>
                <p class="text-xs">Total price</p>
                <p class="font-semibold">$${product.price}.00</p>
              </div>
              <div
                class="flex items-center gap-2 px-12 py-2 text-white bg-black rounded-3xl"
              >
                <img src="/icons/cart.svg" alt="" class="" />
                <span>Add to Cart</span>
              </div>
            </div>
          </div>
      `;
  return html;
};

export default ProductPage;
