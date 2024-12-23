import { optionsSelects } from "./optionsSelects";

const createProductOption = (name, value) => {
  const productOption = document.createElement("div");
  productOption.classList.add("t-product__option", "js-product-option");

  const optionTitle = document.createElement("div");
  optionTitle.classList.add(
    "t-product__option-title",
    "t-descr",
    "t-descr_xxs",
    "js-product-option-name",
  );
  optionTitle.textContent = name;

  const optionVariants = document.createElement("div");
  optionVariants.classList.add("t-product__option-variants");

  const select = document.createElement("select");
  select.classList.add(
    "t-product__option-select",
    "t-descr",
    "t-descr_xxs",
    "js-product-option-variants",
  );

  const optionElement = document.createElement("option");
  optionElement.value = value;
  optionElement.innerHTML = value;

  select.appendChild(optionElement);
  optionVariants.appendChild(select);
  productOption.appendChild(optionTitle);
  productOption.appendChild(optionVariants);

  return productOption;
};

export const addSelect = ({ productsWrapper, data }) => {
  if (!data) return;

  productsWrapper.innerHTML = "";

  for (const [key, value] of Object.entries(data)) {
    const name = optionsSelects[key] || "Ошибка";
    const productOptionElement = createProductOption(name, value);
    productsWrapper.appendChild(productOptionElement);
  }
};
