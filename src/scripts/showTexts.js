import { hasClass } from "./hassClass";
import { totalSum } from "./totalSum";

export const showTexts = ({
  input,
  inputsText,
  data,
  dataPrice,
  emojiSybolsInside,
  emojiSybolsOutside,
  remove,
  totalPrice,
  priceValue,
}) => {
  if (!inputsText.length || input.name !== "type-location" || !input.checked)
    return;

  inputsText.forEach((el) => {
    const parent = el.closest("[data-text]");
    const emoji = parent.querySelector("[data-emoji]");

    if (emoji) emoji.classList.remove("show");

    if (el.name !== "coords") {
      emojiSybolsInside = "";
      emojiSybolsOutside = "";
      el.value = "";
      delete data[el.name];
      delete dataPrice[el.name];

      totalSum({
        input: input,
        dataPrice: dataPrice,
        totalPrice: totalPrice,
        priceValue: priceValue,
      });
    }

    remove && parent.classList.remove("show");

    if (input.id !== el.dataset.inputText) {
      parent.classList.add("show");
      hasClass(parent, "error") && parent.classList.remove("error");
    }
  });
};
