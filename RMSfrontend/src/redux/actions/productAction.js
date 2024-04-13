import axios from "axios";
import { api } from "../../api/api";

// action types
import {
  GET_PRODUCT_REQUEST,
  GET_PRODUCT_REQUEST_SUCCESS,
  GET_PRODUCT_REQUEST_FAILURE,
  ADD_PRODUCT_REQUEST,
  ADD_PRODUCT_REQUEST_SUCCESS,
  ADD_PRODUCT_REQUEST_FAILURE,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_REQUEST_SUCCESS,
  DELETE_PRODUCT_REQUEST_FAILURE,
  TOTAL_PRODUCT_COUNT_REQUEST,
  TOTAL_PRODUCT_COUNT_REQUEST_SUCCESS,
  TOTAL_PRODUCT_COUNT_REQUEST_FAILURE,
  GET_PRODUCT_BY_ID_REQUEST,
  GET_PRODUCT_BY_ID_REQUEST_SUCCESS,
  GET_PRODUCT_BY_ID_REQUEST_FAILURE,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_REQUEST_SUCCESS,
  UPDATE_PRODUCT_REQUEST_FAILURE,
} from "../../constants/productConstants";

export const setProductData = (productData) => ({
  type: GET_PRODUCT_REQUEST_SUCCESS,
  payload: productData,
});
// productActions.js
export const addProductToStore = (productData) => ({
  type: ADD_PRODUCT_REQUEST_SUCCESS,
  payload: productData,
});
export const deleteProductFromStore = (productId) => ({
  type: DELETE_PRODUCT_REQUEST_SUCCESS,
  payload: productId,
});

export const setProductsCount = (count) => ({
  type: TOTAL_PRODUCT_COUNT_REQUEST_SUCCESS,
  payload: count,
});

export const selectProduct = (productId) => ({
  type: GET_PRODUCT_BY_ID_REQUEST_SUCCESS,
  payload: productId,
});

export const updateProductRequest = (product) => ({
  type: UPDATE_PRODUCT_REQUEST_SUCCESS,
  payload: product,
});

export const updateProduct = (productId, updatedData) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_PRODUCT_REQUEST });
    try {
      const response = await axios.put(
        `${api}/products/${productId}`,
        updatedData
      );
      dispatch(
        {
          type: UPDATE_PRODUCT_REQUEST_SUCCESS,
        },
        updateProductRequest(productId)
      );
    } catch (err) {
      console.error("Error updating the product", err);
      dispatch({ type: UPDATE_PRODUCT_REQUEST_FAILURE, payload: err.message });
    }
  };
};

export const getProductById = (productId) => {
  return async (dispatch) => {
    dispatch({ type: GET_PRODUCT_BY_ID_REQUEST });
    try {
      const response = await axios.get(`${api}/products/${productId}`);
      dispatch({
        type: GET_PRODUCT_BY_ID_REQUEST_SUCCESS,
        payload: response.data,
      });
    } catch (err) {
      console.error("Error loading the product with this id ", err);
      dispatch({
        type: GET_PRODUCT_BY_ID_REQUEST_FAILURE,
        payload: err.message,
      });
    }
  };
};

export const fetchProductData = () => {
  return async (dispatch) => {
    dispatch({ type: GET_PRODUCT_REQUEST });
    try {
      const response = await axios.get(`${api}/products`);
      dispatch({ type: GET_PRODUCT_REQUEST_SUCCESS });
      dispatch(setProductData(response.data));
    } catch (err) {
      console.error("Error fetching Products data:", err);
      dispatch({ type: GET_PRODUCT_REQUEST_FAILURE, payload: err.message });
    }
  };
};

export const addProduct = (productData) => {
  return async (dispatch) => {
    dispatch({ type: ADD_PRODUCT_REQUEST });
    try {
      // Send a POST request to your server's API endpoint to add the product
      const response = await axios.post(`${api}/products`, productData);
      dispatch({ type: ADD_PRODUCT_REQUEST_SUCCESS });
      dispatch(addProductToStore(response.data));
    } catch (err) {
      console.error("Error adding a product:", err);
      dispatch({ type: ADD_PRODUCT_REQUEST_FAILURE, payload: err.message });
    }
  };
};

export const deleteProduct = (productId) => {
  return async (dispatch) => {
    dispatch({ type: DELETE_PRODUCT_REQUEST });
    try {
      // Send a DELETE request to your server's API endpoint to delete the product
      await axios.delete(`${api}/products/${productId}`);
      dispatch({ type: DELETE_PRODUCT_REQUEST_SUCCESS });
      // Dispatch the action to delete the product from the Redux store
      dispatch(deleteProductFromStore(productId));
    } catch (err) {
      console.error("Error deleting a product:", err);
      dispatch({ type: DELETE_PRODUCT_REQUEST_FAILURE, payload: err.message });
    }
  };
};

export const totalProducts = () => {
  return async (dispatch) => {
    dispatch({ type: TOTAL_PRODUCT_COUNT_REQUEST });
    try {
      const response = await axios.get(`${api}/products`);
      const productCount = response.data.length; // Assuming the response is an array of employees
      dispatch({ type: TOTAL_PRODUCT_COUNT_REQUEST_SUCCESS });
      dispatch(setProductsCount(productCount));
    } catch (err) {
      console.error("Error fetching Employees data:", err);
      dispatch({
        type: TOTAL_PRODUCT_COUNT_REQUEST_FAILURE,
        payload: err.message,
      });
    }
  };
};
