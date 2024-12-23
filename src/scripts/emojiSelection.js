import { addSelect } from "./addSelect";
import { totalSum } from "./totalSum";

export const emojiSelection = ({
  productsWrapper,
  data,
  dataPrice,
  totalPrice,
  priceValue,
}) => {
  const btns = document.querySelectorAll("[data-btn-emoji]");
  const symbols = document.querySelectorAll("[data-symbol]");

  btns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const emoji = btn.closest("[data-text]").querySelector("[data-emoji]");
      if (emoji) emoji.classList.toggle("show");
    });
  });

  symbols.forEach((symbol) => {
    const parent = symbol.closest("[data-text]");
    const text = parent.querySelector("[data-input-text]");
    if (!text) return;

    symbol.addEventListener("click", () => {
      const textSymbol = symbol.textContent;
      const inputElement = text;
      const cursorStart = inputElement.selectionStart;
      const newValue =
        inputElement.value.slice(0, cursorStart) +
        textSymbol +
        inputElement.value.slice(inputElement.selectionEnd);

      inputElement.value = newValue;
      inputElement.setSelectionRange(
        cursorStart + textSymbol.length,
        cursorStart + textSymbol.length,
      );
      inputElement.focus();

      data[text.name] = text.value;
      addSelect({ productsWrapper: productsWrapper, data: data });
      dataPrice[text.name] = Number(text.dataset.price);

      totalSum({
        input: text,
        dataPrice: dataPrice,
        totalPrice: totalPrice,
        priceValue: priceValue,
      });
    });
  });
};
