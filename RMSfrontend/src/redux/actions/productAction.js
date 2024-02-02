import axios from "axios";
import { api } from "../../api/api";

export const setProductData = (productData) => ({
  type: "SET_PRODUCT_DATA",
  payload: productData,
});
// productActions.js
export const addProductToStore = (productData) => ({
  type: "ADD_PRODUCT",
  payload: productData,
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
