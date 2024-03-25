import {
  SET_PRODUCT_DATA,
  ADD_PRODUCT,
  DELETE_PRODUCT,
  SET_TOTAL_PRODUCTS_COUNT,
  SET_FILTERED_PRODUCT_DATA,
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
    case SET_PRODUCT_DATA:
      return {
        ...state,
        productData: action.payload,
      };
    case SET_FILTERED_PRODUCT_DATA: // Add this case
      return {
        ...state,
        filteredProductData: action.payload,
      };
    case ADD_PRODUCT:
      return {
        ...state,
        productData: [...state.productData, action.payload],
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        productData: state.productData.filter(
          (product) => product._id !== action.payload
        ),
      };
    case SET_TOTAL_PRODUCTS_COUNT:
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
