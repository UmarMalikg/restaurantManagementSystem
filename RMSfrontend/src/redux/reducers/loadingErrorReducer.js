// for order

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
  DELETE_ORDER_ITEM_REQUEST,
  DELETE_ORDER_ITEM_REQUEST_SUCCESS,
  DELETE_ORDER_ITEM_REQUEST_FAILURE,
  UPDATE_ORDER_DISCOUNT_REQUEST,
  UPDATE_ORDER_DISCOUNT_REQUEST_SUCCESS,
  UPDATE_ORDER_DISCOUNT_REQUEST_FAILURE,
  UPDATE_ORDER_DELIVERY_CHARGES_REQUEST,
  UPDATE_ORDER_DELIVERY_CHARGES_REQUEST_SUCCESS,
  UPDATE_ORDER_DELIVERY_CHARGES_REQUEST_FAILURE,
  UPDATE_ORDER_PAYMENT_REQUEST,
  UPDATE_ORDER_PAYMENT_REQUEST_SUCCESS,
  UPDATE_ORDER_PAYMENT_REQUEST_FAILURE,
} from "../../constants/orderConstants";

// for employee
import {
  GET_EMPLOYEE_REQUEST,
  GET_EMPLOYEE_REQUEST_SUCCESS,
  GET_EMPLOYEE_REQUEST_FAILURE,
  ADD_EMPLOYEE_REQUEST,
  ADD_EMPLOYEE_REQUEST_SUCCESS,
  ADD_EMPLOYEE_REQUEST_FAILURE,
  DELETE_EMPLOYEE_REQUEST,
  DELETE_EMPLOYEE_REQUEST_SUCCESS,
  DELETE_EMPLOYEE_REQUEST_FAILURE,
  TOTAL_EMPLOYEE_COUNT_REQUEST,
  TOTAL_EMPLOYEE_COUNT_REQUEST_SUCCESS,
  TOTAL_EMPLOYEE_COUNT_REQUEST_FAILURE,
  UPDATE_EMPLOYEE_REQUEST,
  UPDATE_EMPLOYEE_REQUEST_FAILURE,
  UPDATE_EMPLOYEE_REQUEST_SUCCESS,
  GET_EMPLOYEE_BY_ID_REQUEST,
  GET_EMPLOYEE_BY_ID_REQUEST_SUCCESS,
  GET_EMPLOYEE_BY_ID_REQUEST_FAILURE,
} from "../../constants/employeeConstants";

// for category
import {
  ADD_CATEGORY_REQUEST,
  ADD_CATEGORY_REQUEST_SUCCESS,
  ADD_CATEGORY_REQUEST_FAILURE,
  GET_CATEGORY_REQUEST,
  GET_CATEGORY_REQUEST_SUCCESS,
  GET_CATEGORY_REQUEST_FAILURE,
  GET_CATEGORY_BY_ID_REQUEST,
  GET_CATEGORY_BY_ID_REQUEST_SUCCESS,
  GET_CATEGORY_BY_ID_REQUEST_FAILURE,
  UPDATE_CATEGORY_REQUEST,
  UPDATE_CATEGORY_REQUEST_SUCCESS,
  UPDATE_CATEGORY_REQUEST_FAILURE,
  DELETE_CATEGORY_REQUEST,
  DELETE_CATEGORY_REQUEST_SUCCESS,
  DELETE_CATEGORY_REQUEST_FAILURE,
} from "../../constants/categotyConstants";

// for floor
import {
  GET_FLOOR_REQUEST,
  GET_FLOOR_REQUEST_FAILURE,
  GET_FLOOR_REQUEST_SUCCESS,
} from "../../constants/floorConstants";

// for product

import {
  GET_PRODUCT_REQUEST,
  GET_PRODUCT_REQUEST_SUCCESS,
  GET_PRODUCT_REQUEST_FAILURE,
  GET_PRODUCT_BY_ID_REQUEST,
  GET_PRODUCT_BY_ID_REQUEST_SUCCESS,
  GET_PRODUCT_BY_ID_REQUEST_FAILURE,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_REQUEST_SUCCESS,
  UPDATE_PRODUCT_REQUEST_FAILURE,
  ADD_PRODUCT_REQUEST,
  ADD_PRODUCT_REQUEST_SUCCESS,
  ADD_PRODUCT_REQUEST_FAILURE,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_REQUEST_SUCCESS,
  DELETE_PRODUCT_REQUEST_FAILURE,
  TOTAL_PRODUCT_COUNT_REQUEST,
  TOTAL_PRODUCT_COUNT_REQUEST_SUCCESS,
  TOTAL_PRODUCT_COUNT_REQUEST_FAILURE,
  // as thses are not dispatched anywhere
  // GET_FILTERED_PREODUCT_REQUEST,
  // GET_FILTERED_PREODUCT_REQUEST,
  // GET_FILTERED_PREODUCT_REQUEST,
} from "../../constants/productConstants";
// for table
import {
  GET_TABLE_REQUEST,
  GET_TABLE_REQUEST_SUCCESS,
  GET_TABLE_REQUEST_FAILURE,
  GET_TABLE_BY_ID_REQUEST,
  GET_TABLE_BY_ID_REQUEST_SUCCESS,
  GET_TABLE_BY_ID_REQUEST_FAILURE,
  UPDATE_TABLE_REQUEST,
  UPDATE_TABLE_REQUEST_SUCCESS,
  UPDATE_TABLE_REQUEST_FAILURE,
  DELETE_TABLE_REQUEST,
  DELETE_TABLE_REQUEST_SUCCESS,
  DELETE_TABLE_REQUEST_FAILURE,
  ADD_TABLE_REQUEST,
  ADD_TABLE_REQUEST_SUCCESS,
  ADD_TABLE_REQUEST_FAILURE,
  // as these are not neeeded to be used here
  // SET_RESERVED_TABLES,MADE_TABLE_RESERVED, MADE_TABLE_AVAILABLE
} from "../../constants/tableConstants";
const initialState = {
  isLoading: false,
  isError: null,
};

const loadingErrorReducer = (state = initialState, action) => {
  switch (action.type) {
    // Set isLoading to true when a request action is dispatched
    // for category
    case ADD_CATEGORY_REQUEST:
    case GET_CATEGORY_REQUEST:
    case GET_CATEGORY_BY_ID_REQUEST:
    case DELETE_CATEGORY_REQUEST:
    case UPDATE_CATEGORY_REQUEST:
    // for floor
    case GET_FLOOR_REQUEST:
    // for employee
    case GET_EMPLOYEE_REQUEST:
    case GET_EMPLOYEE_BY_ID_REQUEST:
    case ADD_EMPLOYEE_REQUEST:
    case DELETE_EMPLOYEE_REQUEST:
    case UPDATE_EMPLOYEE_REQUEST:
    case TOTAL_EMPLOYEE_COUNT_REQUEST:
    // for order
    case ADD_ORDER_REQUEST:
    case GET_ORDERS_REQUEST:
    case GET_ORDER_BY_ID_REQUEST:
    case DELETE_ORDER_REQUEST:
    case UPDATE_ORDER_REQUEST:
    case UPDATE_ORDER_ITEM_STATUS_REQUEST:
    case UPDATE_ORDER_STATUS_REQUEST:
    case TOTAL_ORDERS_COUNT_REQUEST:
    case DELETE_ORDER_ITEM_REQUEST:
    case UPDATE_ORDER_DISCOUNT_REQUEST:
    case UPDATE_ORDER_PAYMENT_REQUEST:
    case UPDATE_ORDER_DELIVERY_CHARGES_REQUEST:

    // for product
    case GET_PRODUCT_REQUEST:
    case GET_PRODUCT_BY_ID_REQUEST:
    case ADD_PRODUCT_REQUEST:
    case DELETE_PRODUCT_REQUEST:
    case UPDATE_PRODUCT_REQUEST:
    case TOTAL_PRODUCT_COUNT_REQUEST:

    // for table
    case GET_TABLE_REQUEST:
    case ADD_TABLE_REQUEST:
    case DELETE_TABLE_REQUEST:
    case UPDATE_TABLE_REQUEST:
    case GET_TABLE_BY_ID_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: null,
      };
    // Set isLoading to false and update isError on request failure
    // for category
    case ADD_CATEGORY_REQUEST_FAILURE:
    case GET_EMPLOYEE_BY_ID_REQUEST_FAILURE:
    case GET_CATEGORY_BY_ID_REQUEST_FAILURE:
    case DELETE_CATEGORY_REQUEST_FAILURE:
    case UPDATE_CATEGORY_REQUEST_FAILURE:
    // for floor
    case GET_FLOOR_REQUEST_FAILURE:
    // for employee
    case GET_EMPLOYEE_REQUEST_FAILURE:
    case GET_CATEGORY_BY_ID_REQUEST_FAILURE:
    case ADD_EMPLOYEE_REQUEST_FAILURE:
    case DELETE_EMPLOYEE_REQUEST_FAILURE:
    case UPDATE_EMPLOYEE_REQUEST_FAILURE:
    case TOTAL_EMPLOYEE_COUNT_REQUEST_FAILURE:
    // for order
    case ADD_ORDER_REQUEST_FAILURE:
    case GET_ORDERS_REQUEST_FAILURE:
    case GET_ORDER_BY_ID_REQUEST_FAILURE:
    case DELETE_ORDER_REQUEST_FAILURE:
    case UPDATE_ORDER_REQUEST_FAILURE:
    case UPDATE_ORDER_ITEM_STATUS_REQUEST_FAILURE:
    case UPDATE_ORDER_STATUS_REQUEST_FAILURE:
    case TOTAL_ORDERS_COUNT_REQUEST_FAILURE:
    case DELETE_ORDER_ITEM_REQUEST_FAILURE:
    case UPDATE_ORDER_DISCOUNT_REQUEST_FAILURE:
    case UPDATE_ORDER_PAYMENT_REQUEST_FAILURE:
    case UPDATE_ORDER_DELIVERY_CHARGES_REQUEST_FAILURE:
    // for product
    case GET_PRODUCT_REQUEST_FAILURE:
    case GET_PRODUCT_BY_ID_REQUEST_FAILURE:
    case ADD_PRODUCT_REQUEST_FAILURE:
    case DELETE_PRODUCT_REQUEST_FAILURE:
    case UPDATE_PRODUCT_REQUEST_FAILURE:
    case TOTAL_PRODUCT_COUNT_REQUEST_FAILURE:
    // for table
    case GET_TABLE_REQUEST_FAILURE:
    case ADD_TABLE_REQUEST_FAILURE:
    case DELETE_TABLE_REQUEST_FAILURE:
    case UPDATE_TABLE_REQUEST_FAILURE:
    case GET_TABLE_BY_ID_REQUEST_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: action.payload,
      };
    // Set isLoading to false and update isError on request success
    // for cateogry
    case ADD_CATEGORY_REQUEST_SUCCESS:
    case GET_CATEGORY_REQUEST_SUCCESS:
    case GET_CATEGORY_BY_ID_REQUEST_SUCCESS:
    case DELETE_CATEGORY_REQUEST_SUCCESS:
    case UPDATE_CATEGORY_REQUEST_SUCCESS:
    // for floor
    case GET_FLOOR_REQUEST_SUCCESS:
    // for employee
    case GET_EMPLOYEE_REQUEST_SUCCESS:
    case GET_EMPLOYEE_BY_ID_REQUEST_SUCCESS:
    case ADD_EMPLOYEE_REQUEST_SUCCESS:
    case DELETE_EMPLOYEE_REQUEST_SUCCESS:
    case UPDATE_EMPLOYEE_REQUEST_SUCCESS:
    case TOTAL_EMPLOYEE_COUNT_REQUEST_SUCCESS:
    // for order
    case ADD_ORDER_REQUEST_SUCCESS:
    case GET_ORDERS_REQUEST_SUCCESS:
    case GET_ORDER_BY_ID_REQUEST_SUCCESS:
    case DELETE_ORDER_REQUEST_SUCCESS:
    case UPDATE_ORDER_REQUEST_SUCCESS:
    case UPDATE_ORDER_ITEM_STATUS_REQUEST_SUCCESS:
    case UPDATE_ORDER_STATUS_REQUEST_SUCCESS:
    case TOTAL_ORDERS_COUNT_REQUEST_SUCCESS:
    case DELETE_ORDER_ITEM_REQUEST_SUCCESS:
    case UPDATE_ORDER_DISCOUNT_REQUEST_SUCCESS:
    case UPDATE_ORDER_PAYMENT_REQUEST_SUCCESS:
    case UPDATE_ORDER_DELIVERY_CHARGES_REQUEST_SUCCESS:
    // for product
    case GET_PRODUCT_REQUEST_SUCCESS:
    case GET_PRODUCT_BY_ID_REQUEST_SUCCESS:
    case ADD_PRODUCT_REQUEST_SUCCESS:
    case DELETE_PRODUCT_REQUEST_SUCCESS:
    case UPDATE_PRODUCT_REQUEST_SUCCESS:
    case TOTAL_PRODUCT_COUNT_REQUEST_SUCCESS:

    // for table
    case GET_TABLE_REQUEST_SUCCESS:
    case ADD_TABLE_REQUEST_SUCCESS:
    case DELETE_TABLE_REQUEST_SUCCESS:
    case UPDATE_TABLE_REQUEST_SUCCESS:
    case GET_TABLE_BY_ID_REQUEST_SUCCESS:
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
