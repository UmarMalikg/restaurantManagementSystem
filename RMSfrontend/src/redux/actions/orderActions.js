import axios from "axios";
import { api } from "../../api/api";

// Importing action constants
import {
  ADD_ORDER_REQUEST,
  ADD_ORDER_REQUEST_FAILURE,
  ADD_ORDER_REQUEST_SUCCESS,
  GET_ORDERS_REQUEST,
  GET_ORDERS_REQUEST_FAILURE,
  GET_ORDERS_REQUEST_SUCCESS,
  GET_ORDER_BY_ID_REQUEST,
  GET_ORDER_BY_ID_REQUEST_FAILURE,
  GET_ORDER_BY_ID_REQUEST_SUCCESS,
  DELETE_ORDER_REQUEST,
  DELETE_ORDER_REQUEST_FAILURE,
  DELETE_ORDER_REQUEST_SUCCESS,
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_REQUEST_FAILURE,
  UPDATE_ORDER_REQUEST_SUCCESS,
  TOTAL_ORDERS_COUNT_REQUEST,
  TOTAL_ORDERS_COUNT_REQUEST_FAILURE,
  TOTAL_ORDERS_COUNT_REQUEST_SUCCESS,
} from "../../constants/orderConstants";

// Action Creators
export const setOrderData = (orderData) => ({
  type: GET_ORDERS_REQUEST_SUCCESS,
  payload: orderData,
});

export const addOrderToStore = (order) => ({
  type: ADD_ORDER_REQUEST_SUCCESS,
  payload: order,
});

export const deleteOrder = (orderId) => ({
  type: DELETE_ORDER_REQUEST_SUCCESS,
  payload: orderId,
});

export const getOrderById = (orderId) => ({
  type: GET_ORDER_BY_ID_REQUEST_SUCCESS,
  payload: orderId,
});

export const updateOrder = (order) => ({
  type: UPDATE_ORDER_REQUEST_SUCCESS,
  payload: order,
});

export const setTotalSalesCount = (count) => ({
  type: TOTAL_ORDERS_COUNT_REQUEST_SUCCESS,
  payload: count,
});

// Thunk Action to Fetch Order Data
export const fetchOrderData = () => {
  return async (dispatch) => {
    dispatch({ type: GET_ORDERS_REQUEST }); // Dispatching request action
    try {
      const response = await axios.get(`${api}/orders`);
      dispatch({ type: GET_ORDERS_REQUEST_SUCCESS }); // Dispatching success action
      dispatch(setOrderData(response.data));
    } catch (error) {
      console.error("Error fetching Order data:", error);
      dispatch({ type: GET_ORDERS_REQUEST_FAILURE, payload: error.message }); // Dispatching failure action with error message
    }
  };
};

// Thunk Action to Add an Order
export const addOrder = (order) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${api}/orders`, order);
      dispatch(addOrderToStore(response.data));
      dispatch({ type: ADD_ORDER_REQUEST_SUCCESS }); // Dispatching success action
    } catch (error) {
      console.error("Error adding Order:", error);
      dispatch({ type: ADD_ORDER_REQUEST_FAILURE, payload: error.message }); // Dispatching failure action with error message
      throw error;
    }
  };
};

// Thunk Action to Delete an Order
export const deleteOrderRequest = (orderId) => {
  return async (dispatch) => {
    try {
      await axios.delete(`${api}/orders/${orderId}`);
      dispatch(deleteOrder(orderId));
      dispatch({ type: DELETE_ORDER_REQUEST_SUCCESS }); // Dispatching success action
    } catch (error) {
      console.error("Error deleting Order:", error);
      dispatch({ type: DELETE_ORDER_REQUEST_FAILURE, payload: error.message }); // Dispatching failure action with error message
    }
  };
};

// Thunk Action to Get Order by ID
export const getOrderByIdRequest = (orderId) => {
  return async (dispatch) => {
    dispatch({ type: GET_ORDER_BY_ID_REQUEST }); // Dispatching request action
    try {
      const response = await axios.get(`${api}/orders/${orderId}`);
      dispatch({ type: GET_ORDER_BY_ID_REQUEST_SUCCESS }); // Dispatching success action
      dispatch(getOrderById(response.data));
    } catch (error) {
      console.error("Error getting Order by ID:", error);
      dispatch({
        type: GET_ORDER_BY_ID_REQUEST_FAILURE,
        payload: error.message,
      }); // Dispatching failure action with error message
    }
  };
};

// Thunk Action to Update Order Data
export const updateOrderData = (orderId, updatedData) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_ORDER_REQUEST }); // Dispatching request action
    try {
      const response = await axios.put(`${api}/orders/${orderId}`, updatedData);
      dispatch({ type: UPDATE_ORDER_REQUEST_SUCCESS }); // Dispatching success action
      dispatch(updateOrder(response.data));
    } catch (error) {
      console.error("Error updating Order data:", error);
      dispatch({ type: UPDATE_ORDER_REQUEST_FAILURE, payload: error.message }); // Dispatching failure action with error message
    }
  };
};

// Thunk Action to Calculate Total Sales
export const totalSales = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${api}/orders`);
      const salesCount = response.data.length; // Assuming the response is an array of orders
      dispatch(setTotalSalesCount(salesCount));
    } catch (error) {
      console.error("Error fetching sales Count data:", error);
    }
  };
};
