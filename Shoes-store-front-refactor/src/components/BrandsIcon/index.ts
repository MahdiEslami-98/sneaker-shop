const BrandsIcon = () => {
  const brandsData = [
    { id: "NIKE", name: "Nike", image: "./icons/nike.png" },
    { id: "ADIDAS", name: "Adidas", image: "./icons/adidaspng.png" },
    { id: "PUMA", name: "Puma", image: "./icons/puma.png" },
    { id: "ASICS", name: "Asics", image: "./icons/asics.png" },
    { id: "REEBOK", name: "Reebok", image: "./icons/reebok.png" },
    {
      id: "NEW BALANCE",
      name: "New Balance",
      image: "./icons/new-balance.png",
    },
    { id: "CONVERSE", name: "Converse", image: "./icons/converse.png" },
    { id: "HUSHPUPPIES", name: "Hushpuppies", image: "", hidden: true },
    { id: "dots", name: "More", image: "./icons/more.png" },
  ];

  let html = "";

  brandsData.forEach((brand) => {
    const brandElement = <HTMLDivElement>document.createElement("div");
    brandElement.className = `flex h-24 w-16 flex-col gap-3 ${
      brand.hidden ? "hidden" : ""
    }`;
    brandElement.dataset.id = brand.id;

    const brandInnerElement = <HTMLDivElement>document.createElement("div");
    brandInnerElement.className =
      "flex h-16 w-16 items-center justify-center rounded-full bg-[#ECECEC]";

    const brandImage = <HTMLImageElement>document.createElement("img");
    brandImage.src = brand.image;
    brandImage.alt = "";
    brandInnerElement.appendChild(brandImage);

    const brandName = <HTMLParagraphElement>document.createElement("p");
    brandName.className =
      "overflow-hidden text-ellipsis whitespace-nowrap text-center";
    brandName.textContent = brand.name;

    brandElement.appendChild(brandInnerElement);
    brandElement.appendChild(brandName);

    html += brandElement.outerHTML;
  });

  return html;
};

export default BrandsIcon;
