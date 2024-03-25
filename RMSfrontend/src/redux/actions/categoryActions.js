// categoryActions.js
import axios from "axios";
import { api } from "../../api/api";

// Action Types
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
  UPDATE_CATEGORY_REQUEST_SUCCESS,
  UPDATE_CATEGORY_REQUEST,
  UPDATE_CATEGORY_REQUEST_FAILURE,
} from "../../constants/categotyConstants";

// Action Creators
export const setCategoryData = (categoryData) => ({
  type: GET_CATEGORY_REQUEST_SUCCESS,
  payload: categoryData,
});

export const selectCategory = (categoryId) => ({
  type: GET_CATEGORY_BY_ID_REQUEST_SUCCESS,
  payload: categoryId,
});

export const addCategoryToStore = (category) => ({
  type: ADD_CATEGORY_REQUEST_SUCCESS,
  payload: category,
});

export const updateCategoryData = (category) => ({
  type: UPDATE_CATEGORY_REQUEST_SUCCESS,
  payload: category,
});

export const updateCategory = (categoryId, updatedData) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_CATEGORY_REQUEST });
    try {
      const response = await axios.put(
        `${api}/categories/${categoryId}`,
        updatedData
      );
      dispatch(updateCategoryData(response.data)); // Corrected dispatch
      dispatch({ type: UPDATE_CATEGORY_REQUEST_SUCCESS }); // Dispatching success action
    } catch (err) {
      console.error("Error updating Categories data:", err);
      dispatch({ type: UPDATE_CATEGORY_REQUEST_FAILURE });
    }
  };
};

// Thunk Action to Fetch Category Data
export const fetchCategoryData = () => {
  return async (dispatch) => {
    dispatch({ type: GET_CATEGORY_REQUEST });
    try {
      const response = await axios.get(`${api}/categories`);
      dispatch({ type: GET_CATEGORY_REQUEST_SUCCESS });
      dispatch(setCategoryData(response.data));
    } catch (error) {
      console.error("Error fetching Categories data:", error);
      dispatch({ type: GET_CATEGORY_REQUEST_FAILURE });
    }
  };
};

export const addCategory = (category) => {
  return async (dispatch) => {
    dispatch({ type: ADD_CATEGORY_REQUEST_SUCCESS });
    try {
      const response = await axios.post(`${api}/categories`, category);
      dispatch({ type: ADD_CATEGORY_REQUEST_SUCCESS });
      dispatch(addCategoryToStore(response.data));
    } catch (err) {
      console.error(err);
      dispatch({ type: ADD_CATEGORY_REQUEST_FAILURE });
      throw err;
    }
  };
};

// Thunk Action to Get Order by ID
export const getCategoryById = (categoryId) => {
  return async (dispatch) => {
    dispatch({ type: GET_CATEGORY_BY_ID_REQUEST }); // Dispatching request action
    try {
      const response = await axios.get(`${api}/categories/${categoryId}`);
      dispatch({
        type: GET_CATEGORY_BY_ID_REQUEST_SUCCESS,
        payload: response.data,
      }); // Dispatching success action with order data
    } catch (err) {
      console.error("Error getting Category by ID:", err);
      dispatch({
        type: GET_CATEGORY_BY_ID_REQUEST_FAILURE,
        payload: err.message,
      }); // Dispatching failure action with error message
    }
  };
};
