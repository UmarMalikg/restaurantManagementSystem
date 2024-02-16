import {
  SET_ORDER_DATA,
  ADD_ORDER,
  DELETE_ORDER,
  GET_ORDER_BY_ID,
  SET_TOTAL_SALES_COUNT,
} from "../../constants/orderConstants";

const initialState = {
  orderData: [],
  selectedOrder: null,
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ORDER_DATA:
      return {
        ...state,
        orderData: action.payload,
      };
    case ADD_ORDER:
      return {
        ...state,
        orderData: [...state.orderData, action.payload],
      };
    case DELETE_ORDER:
      return {
        ...state,
        orderData: state.orderData.filter(
          (order) => order._id !== action.payload
        ),
      };
    case GET_ORDER_BY_ID:
      return {
        ...state,
        selectedOrder: action.payload,
      };
    case SET_TOTAL_SALES_COUNT:
      return {
        ...state,
        totalSalesCount: action.payload,
      };
    default:
      return state;
  }
};

export default orderReducer;
