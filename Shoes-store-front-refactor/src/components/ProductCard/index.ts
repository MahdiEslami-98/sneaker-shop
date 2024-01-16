interface IProduct {
  id: number;
  pid: number;
  name: string;
  price: number;
  imageURL: string;
}
type RenderCardsType = (arr: IProduct[]) => string;

const renderCards: RenderCardsType = (arr) => {
  let productsCard = "";
  arr.forEach((product) => {
    productsCard += `<div class="w-full" data-id="${product.id}" onclick="navigate('/products/${product.id}')">
            <div class="w-full flex justify-center items-center overflow-hidden rounded-2xl bg-[#f3f3f3] p-5">
              <img src="${product.imageURL}" alt="" class="w-32 h-32 sm:w-80 sm:h-80"/>
            </div>
            <div class="pt-3">
              <p
                class="whitespace-nowrap overflow-hidden overflow-ellipsis text-xl font-bold"
              >
                ${product.name}
              </p>
            </div>
            <div class="pt-2">
              <p class="font-semibold">$${product.price}</p>
            </div>
          </div>`;
  });
  return productsCard;
};

export default renderCards;
