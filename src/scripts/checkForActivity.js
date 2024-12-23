import { addSelect } from "./addSelect";

export const checkForActivity = ({ input, productsWrapper, data }) => {
  if (!input.checked) return;

  // console.log(input.na,);

  data[input.name] = input.value;
  addSelect({ productsWrapper: productsWrapper, data: data });
};
