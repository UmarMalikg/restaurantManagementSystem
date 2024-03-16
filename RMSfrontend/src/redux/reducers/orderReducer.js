import {
  GET_ORDERS_REQUEST_SUCCESS,
  ADD_ORDER_REQUEST_SUCCESS,
  DELETE_ORDER_REQUEST_SUCCESS,
  GET_ORDER_BY_ID_REQUEST_SUCCESS,
  TOTAL_ORDERS_COUNT_REQUEST_SUCCESS,
  UPDATE_ORDER_REQUEST_SUCCESS,
  UPDATE_ORDER_ITEM_STATUS_REQUEST_SUCCESS,
  UPDATE_ORDER_STATUS_REQUEST_SUCCESS,
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
        orderData: action.payload,
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
      return {
        ...state,
        orderData: state.orderData.map((order) =>
          order._id === action.payload.orderId ? action.payload : order
        ),
      };
    case UPDATE_ORDER_ITEM_STATUS_REQUEST_SUCCESS: // Handling item status update
      return {
        ...state,
        orderData: state.orderData.map((order) =>
          order._id === action.payload.orderId
            ? {
                ...order,
                orderItems: order.orderItems.map((item) =>
                  item._id === action.payload.itemId
                    ? { ...item, itemStatus: action.payload.newStatus }
                    : item
                ),
              }
            : order
        ),
      };
    case UPDATE_ORDER_STATUS_REQUEST_SUCCESS: // Handling item status update
      return {
        ...state,
        orderData: state.orderData.map((order) =>
          order._id === action.payload.orderId
            ? { ...order, status: action.payload.newStatus }
            : order
        ),
      };
    default:
      return state;
  }
};

export default orderReducer;
