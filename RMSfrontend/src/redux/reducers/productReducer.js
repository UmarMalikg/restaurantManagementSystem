import {
  GET_PRODUCT_REQUEST_SUCCESS,
  ADD_PRODUCT_REQUEST_SUCCESS,
  DELETE_PRODUCT_REQUEST_SUCCESS,
  TOTAL_PRODUCT_COUNT_REQUEST_SUCCESS,
  GET_FILTERED_PREODUCT_REQUEST_SUCCESS,
  GET_PRODUCT_BY_ID_REQUEST_SUCCESS,
  UPDATE_PRODUCT_REQUEST_SUCCESS,
} from "../../constants/productConstants";

// productReducer.js
const initialState = {
  productData: [],
  filteredProductData: [], // New state property to hold filtered products
  selectedProduct: null,
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCT_REQUEST_SUCCESS:
      return {
        ...state,
        productData: action.payload,
      };
    case GET_FILTERED_PREODUCT_REQUEST_SUCCESS: // Add this case
      return {
        ...state,
        filteredProductData: action.payload,
      };
    case ADD_PRODUCT_REQUEST_SUCCESS:
      return {
        ...state,
        productData: [...state.productData, action.payload],
      };
    case DELETE_PRODUCT_REQUEST_SUCCESS:
      return {
        ...state,
        productData: state.productData.filter(
          (product) => product._id !== action.payload
        ),
      };
    case TOTAL_PRODUCT_COUNT_REQUEST_SUCCESS:
      return {
        ...state,
        totalProductsCount: action.payload,
      };

    case GET_PRODUCT_BY_ID_REQUEST_SUCCESS:
      return {
        ...state,
        selectedProduct: action.payload,
      };

    case UPDATE_PRODUCT_REQUEST_SUCCESS:
      const updatedIndex = state.productData.findIndex(
        (product) =>
          product && action.payload && product._id === action.payload._id
      );

      if (updatedIndex !== -1) {
        const updatedProductData = [...state.productData];
        updatedProductData[updatedIndex] = action.payload;
        return {
          ...state,
          productData: updatedProductData,
        };
      } else {
        return state;
      }
    default:
      return state;
  }
};

export default productReducer;
