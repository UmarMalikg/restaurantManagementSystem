// categoryActions.js
import axios from "axios";
import { api } from "../../api/api";

// Action Types
export const SET_CATEGORY_DATA = "SET_CATEGORY_DATA";
export const SELECT_CATEGORY = "SELECT_CATEGORY";

// Action Creators
export const setCategoryData = (categoryData) => ({
  type: SET_CATEGORY_DATA,
  payload: categoryData,
});

export const selectCategory = (categoryId) => ({
  type: SELECT_CATEGORY,
  payload: categoryId,
});

// Thunk Action to Fetch Category Data
export const fetchCategoryData = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${api}/categories`);
      dispatch(setCategoryData(response.data));
    } catch (error) {
      console.error("Error fetching Categories data:", error);
    }
  };
};
