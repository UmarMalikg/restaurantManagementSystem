import { INCREASE_QTY, DECREASE_QTY } from "../../constants/quantityconstants";

const initialState = {};

const quantityReducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREASE_QTY:
      return {
        ...state,
        [action.productId]: (state[action.productId] || 1) + 1,
      };
    case DECREASE_QTY:
      return {
        ...state,
        [action.productId]: Math.max((state[action.productId] || 0) - 1, 0),
      };
    default:
      return state;
  }
};

export default quantityReducer;
