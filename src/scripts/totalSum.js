export const totalSum = ({ input, dataPrice, totalPrice, priceValue }) => {
  if (
    input.dataset.inputText === "text-inside" ||
    input.dataset.inputText === "text-outside"
  ) {
    const sum = Object.values(dataPrice).reduce(
      (acc, currentValue) => acc + currentValue,
      0,
    );

    totalPrice.innerHTML = sum;

    if (priceValue) {
      priceValue.innerHTML = sum;
      priceValue.setAttribute("data-product-price-def", sum);
      priceValue.setAttribute("data-product-price-def-str", sum);
    }
  }

  if (!input.checked) return;

  dataPrice[input.name] = Number(input.dataset.price);

  const sum = Object.values(dataPrice).reduce(
    (acc, currentValue) => acc + currentValue,
    0,
  );

  totalPrice.innerHTML = sum;

  if (priceValue) {
    priceValue.innerHTML = sum;
    priceValue.setAttribute("data-product-price-def", sum);
    priceValue.setAttribute("data-product-price-def-str", sum);
  }
};
