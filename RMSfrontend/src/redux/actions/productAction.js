import axios from "axios";
import { api } from "../../api/api";

// action types
import {
  SET_PRODUCT_DATA,
  ADD_PRODUCT,
  DELETE_PRODUCT,
  SET_TOTAL_PRODUCTS_COUNT,
} from "../../constants/productConstants";

export const setProductData = (productData) => ({
  type: SET_PRODUCT_DATA,
  payload: productData,
});
// productActions.js
export const addProductToStore = (productData) => ({
  type: ADD_PRODUCT,
  payload: productData,
});
export const deleteProductFromStore = (productId) => ({
  type: DELETE_PRODUCT,
  payload: productId,
});

export const setProductsCount = (count) => ({
  type: SET_TOTAL_PRODUCTS_COUNT,
  payload: count,
});

export const fetchProductData = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${api}/products`);
      dispatch(setProductData(response.data));
    } catch (error) {
      console.error("Error fetching Products data:", error);
    }
  };
};

export const addProduct = (productData) => {
  return async (dispatch) => {
    console.log(productData);
    try {
      // Send a POST request to your server's API endpoint to add the product
      const response = await axios.post(`${api}/products`, productData, {
        headers: {
          "Content-Type": "multipart/form-data", // Set the content type to multipart/form-data
        },
      });

      dispatch(addProductToStore(response.data));
    } catch (error) {
      console.error("Error adding a product:", error);
    }
  };
};

export const deleteProduct = (productId) => {
  return async (dispatch) => {
    try {
      // Send a DELETE request to your server's API endpoint to delete the product
      await axios.delete(`${api}/products/${productId}`);

      // Dispatch the action to delete the product from the Redux store
      dispatch(deleteProductFromStore(productId));
    } catch (error) {
      console.error("Error deleting a product:", error);
    }
  };
};

export const totalProducts = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${api}/products`);
      const productCount = response.data.length; // Assuming the response is an array of employees
      dispatch(setProductsCount(productCount));
    } catch (error) {
      console.error("Error fetching Employees data:", error);
    }
  };
};
