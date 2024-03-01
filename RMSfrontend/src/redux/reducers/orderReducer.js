import {
  GET_ORDERS_REQUEST_SUCCESS,
  ADD_ORDER_REQUEST_SUCCESS,
  DELETE_ORDER_REQUEST_SUCCESS,
  GET_ORDER_BY_ID_REQUEST_SUCCESS,
  TOTAL_ORDERS_COUNT_REQUEST_SUCCESS,
  UPDATE_ORDER_REQUEST_SUCCESS,
} from "../../constants/orderConstants";

const initialState = {
  orderData: [],
  selectedOrder: null,
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDERS_REQUEST_SUCCESS:
      return {
        ...state,
        orderData: action.payload,
      };
    case ADD_ORDER_REQUEST_SUCCESS:
      return {
        ...state,
        orderData: [...state.orderData, action.payload],
      };
    case DELETE_ORDER_REQUEST_SUCCESS:
      return {
        ...state,
        orderData: state.orderData.filter(
          (order) => order._id !== action.payload
        ),
      };
    case GET_ORDER_BY_ID_REQUEST_SUCCESS:
      return {
        ...state,
        selectedOrder: action.payload,
      };
    case TOTAL_ORDERS_COUNT_REQUEST_SUCCESS:
      return {
        ...state,
        totalSalesCount: action.payload,
      };
    case UPDATE_ORDER_REQUEST_SUCCESS:
      return state;
    default:
      return state;
  }
};

export default orderReducer;
