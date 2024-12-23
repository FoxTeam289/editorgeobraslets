import { totalSum } from "./totalSum";
import { showTexts } from "./showTexts";
import { addSelect } from "./addSelect";

const photosWrap = document.querySelector(".photos__wrap");
const images = photosWrap.querySelectorAll("img");
const navButtons = document.querySelectorAll(".photos__nav span");

let currentIndex = 0;
let xStart = null; // Объявляем xStart

const showImage = (index) => {
  images[currentIndex].classList.remove("show");
  navButtons[currentIndex].classList.remove("show");

  currentIndex = index;
  images[currentIndex].classList.add("show");
  navButtons[currentIndex].classList.add("show");
};

const nextImage = () => {
  const nextIndex = (currentIndex + 1) % images.length;
  showImage(nextIndex);
};

const handleTouchStart = (event) => {
  xStart = event.touches[0].clientX;
};

const handleTouchMove = (event) => {
  if (!xStart) {
    return;
  }

  const xEnd = event.touches[0].clientX;
  const deltaX = xEnd - xStart;

  if (deltaX > 50) {
    // Swipe вправо
    xStart = null;
    showImage((currentIndex - 1 + images.length) % images.length);
  } else if (deltaX < -50) {
    // Swipe влево
    xStart = null;
    showImage((currentIndex + 1) % images.length);
  }
};

export const slider = () => {
  navButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      showImage(index);
    });
  });

  photosWrap.addEventListener("touchstart", handleTouchStart);
  photosWrap.addEventListener("touchmove", handleTouchMove);
};

export const handleChange = (
  input,
  { data, dataPrice, totalPrice, priceValue, inputsText, productsWrapper },
) => {
  data[input.name] = input.value;

  totalSum({
    input,
    dataPrice,
    totalPrice,
    priceValue,
  });
  showTexts({
    input,
    inputsText,
    data,
    dataPrice,
    remove: true,
    totalPrice: totalPrice,
    priceValue: priceValue,
  });
  addSelect({ productsWrapper, data });

  showImage(Number(input.dataset.photo));
};
