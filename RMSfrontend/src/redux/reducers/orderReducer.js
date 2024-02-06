import {
  SET_ORDER_DATA,
  ADD_ORDER,
  DELETE_ORDER,
  GET_ORDER_BY_ID,
} from "../actions/orderActions";

const initialState = {
  orders: [],
  selectedOrder: null,
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ORDER_DATA:
      return {
        ...state,
        orders: action.payload,
      };
    case ADD_ORDER:
      return {
        ...state,
        orders: [...state.orders, action.payload],
      };
    case DELETE_ORDER:
      return {
        ...state,
        orders: state.orders.filter((order) => order._id !== action.payload),
      };
    case GET_ORDER_BY_ID:
      return {
        ...state,
        selectedOrder: action.payload,
      };
    default:
      return state;
  }
};

export default orderReducer;
