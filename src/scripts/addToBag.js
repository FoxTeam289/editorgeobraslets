import { hasClass } from "./hassClass";

export const addToBag = ({ texts }) => {
  const order = document.querySelector('a[href="#order"]');
  const btn = document.querySelector("[data-add-to-bag]");

  let error = 0;

  btn &&
    btn.addEventListener("click", () => {
      // error = 0;

      // texts.forEach((el) => {
      //   const currentValue = el.value;
      //   const currentName = el.name;
      //   const parent = el.closest("[data-text]");

      //   if (currentName !== "coords") return;

      //   const value = hasClass(parent, "show");

      //   if (value && currentValue === "") {
      //     parent.classList.add("error");
      //     error += 1;
      //   } else {
      //     parent.classList.remove("error");
      //   }
      // });

      // if (error > 0) return;

      order && order.click();
    });
};
