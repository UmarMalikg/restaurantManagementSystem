import axios from "axios";
import { api } from "../../api/api";

// Action Types
export const SET_ORDER_DATA = "SET_ORDER_DATA";
export const ADD_ORDER = "ADD_ORDER";
export const DELETE_ORDER = "DELETE_ORDER";
export const GET_ORDER_BY_ID = "GET_ORDER_BY_ID";
export const SET_TOTAL_SALES_COUNT = "SET_TOTAL_SALES_COUNT";

// Action Creators
export const setOrderData = (orderData) => ({
  type: SET_ORDER_DATA,
  payload: orderData,
});

export const addOrderToStore = (order) => ({
  type: ADD_ORDER,
  payload: order,
});

export const deleteOrder = (orderId) => ({
  type: DELETE_ORDER,
  payload: orderId,
});

export const getOrderById = (orderId) => ({
  type: GET_ORDER_BY_ID,
  payload: orderId,
});

export const setTotalSalesCount = (count) => ({
  type: SET_TOTAL_SALES_COUNT,
  payload: count,
});

// Thunk Action to Fetch Order Data
export const fetchOrderData = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${api}/orders`);
      dispatch(setOrderData(response.data));
    } catch (error) {
      console.error("Error fetching Order data:", error);
    }
  };
};

// Thunk Action to Add an Order
export const addOrder = (order) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${api}/orders`, order);
      dispatch(addOrderToStore(response.data));
    } catch (error) {
      console.error("Error adding Order:", error);
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
    } catch (error) {
      console.error("Error deleting Order:", error);
    }
  };
};

// Thunk Action to Get Order by ID
export const getOrderByIdRequest = (orderId) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${api}/orders/${orderId}`);
      dispatch(getOrderById(response.data));
    } catch (error) {
      console.error("Error getting Order by ID:", error);
    }
  };
};

export const totalSales = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${api}/orders`);
      const salesCount = response.data.length; // Assuming the response is an array of employees
      dispatch(setTotalSalesCount(salesCount));
    } catch (error) {
      console.error("Error fetching sales Count data:", error);
    }
  };
};
