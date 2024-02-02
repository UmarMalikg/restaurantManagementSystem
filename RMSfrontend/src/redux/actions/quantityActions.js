export const increaseQuantity = (productId) => ({
  type: "INCREASE_QTY",
  productId,
});

export const decreaseQuantity = (productId) => ({
  type: "DECREASE_QTY",
  productId,
});
