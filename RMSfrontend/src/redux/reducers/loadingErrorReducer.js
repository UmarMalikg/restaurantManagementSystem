import {
  ADD_ORDER_REQUEST,
  ADD_ORDER_REQUEST_SUCCESS,
  ADD_ORDER_REQUEST_FAILURE,
  GET_ORDERS_REQUEST,
  GET_ORDERS_REQUEST_SUCCESS,
  GET_ORDERS_REQUEST_FAILURE,
  GET_ORDER_BY_ID_REQUEST,
  GET_ORDER_BY_ID_REQUEST_SUCCESS,
  GET_ORDER_BY_ID_REQUEST_FAILURE,
  DELETE_ORDER_REQUEST,
  DELETE_ORDER_REQUEST_SUCCESS,
  DELETE_ORDER_REQUEST_FAILURE,
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_REQUEST_SUCCESS,
  UPDATE_ORDER_REQUEST_FAILURE,
  UPDATE_ORDER_ITEM_STATUS_REQUEST,
  UPDATE_ORDER_ITEM_STATUS_REQUEST_SUCCESS,
  UPDATE_ORDER_ITEM_STATUS_REQUEST_FAILURE,
  UPDATE_ORDER_STATUS_REQUEST,
  UPDATE_ORDER_STATUS_REQUEST_SUCCESS,
  UPDATE_ORDER_STATUS_REQUEST_FAILURE,
  TOTAL_ORDERS_COUNT_REQUEST,
  TOTAL_ORDERS_COUNT_REQUEST_SUCCESS,
  TOTAL_ORDERS_COUNT_REQUEST_FAILURE,
} from "../../constants/orderConstants";

const initialState = {
  isLoading: false,
  isError: null,
};

const loadingErrorReducer = (state = initialState, action) => {
  switch (action.type) {
    // Set isLoading to true when a request action is dispatched
    case ADD_ORDER_REQUEST:
    case GET_ORDERS_REQUEST:
    case GET_ORDER_BY_ID_REQUEST:
    case DELETE_ORDER_REQUEST:
    case UPDATE_ORDER_REQUEST:
    case UPDATE_ORDER_ITEM_STATUS_REQUEST:
    case UPDATE_ORDER_STATUS_REQUEST:
    case TOTAL_ORDERS_COUNT_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: null,
      };
    // Set isLoading to false and update isError on request failure
    case ADD_ORDER_REQUEST_FAILURE:
    case GET_ORDERS_REQUEST_FAILURE:
    case GET_ORDER_BY_ID_REQUEST_FAILURE:
    case DELETE_ORDER_REQUEST_FAILURE:
    case UPDATE_ORDER_REQUEST_FAILURE:
    case UPDATE_ORDER_ITEM_STATUS_REQUEST_FAILURE:
    case UPDATE_ORDER_STATUS_REQUEST_FAILURE:
    case TOTAL_ORDERS_COUNT_REQUEST_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: action.payload,
      };
    // Set isLoading to false and update isError on request success
    case ADD_ORDER_REQUEST_SUCCESS:
    case GET_ORDERS_REQUEST_SUCCESS:
    case GET_ORDER_BY_ID_REQUEST_SUCCESS:
    case DELETE_ORDER_REQUEST_SUCCESS:
    case UPDATE_ORDER_REQUEST_SUCCESS:
    case UPDATE_ORDER_ITEM_STATUS_REQUEST_SUCCESS:
    case UPDATE_ORDER_STATUS_REQUEST_SUCCESS:
    case TOTAL_ORDERS_COUNT_REQUEST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: null,
      };
    default:
      return state;
  }
};

export default loadingErrorReducer;
