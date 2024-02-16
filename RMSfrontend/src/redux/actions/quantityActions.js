import { INCREASE_QTY, DECREASE_QTY } from "../../constants/quantityconstants";

export const increaseQuantity = (productId) => ({
  type: INCREASE_QTY,
  productId,
});

export const decreaseQuantity = (productId) => ({
  type: DECREASE_QTY,
  productId,
});
