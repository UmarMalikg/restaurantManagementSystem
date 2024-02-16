import {
  SET_PRODUCT_DATA,
  ADD_PRODUCT,
  DELETE_PRODUCT,
  SET_TOTAL_PRODUCTS_COUNT,
  SET_FILTERED_PRODUCT_DATA,
} from "../../constants/productConstants";

// productReducer.js
const initialState = {
  productData: [],
  filteredProductData: [], // New state property to hold filtered products
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

    default:
      return state;
  }
};

export default productReducer;
