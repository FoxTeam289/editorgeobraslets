import { hasClass } from "./hassClass";
import { addSelect } from "./addSelect";

export const checkForEmptyText = ({
  input,
  data,
  productsWrapper,
  emojiSybolsInside,
  emojiSybolsOutside,
}) => {
  const parent = input.closest("[data-text]");

  if (!input.value) return;

  input.name === "coords" &&
    hasClass(parent, "error") &&
    parent.classList.remove("error");
};
