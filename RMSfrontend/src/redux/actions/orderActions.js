import axios from "axios";
import { api } from "../../api/api";

// Importing action constants
import {
  // add order contants
  ADD_ORDER_REQUEST,
  ADD_ORDER_REQUEST_FAILURE,
  ADD_ORDER_REQUEST_SUCCESS,

  // get all order constants
  GET_ORDERS_REQUEST,
  GET_ORDERS_REQUEST_FAILURE,
  GET_ORDERS_REQUEST_SUCCESS,

  // get single order constants
  GET_ORDER_BY_ID_REQUEST,
  GET_ORDER_BY_ID_REQUEST_FAILURE,
  GET_ORDER_BY_ID_REQUEST_SUCCESS,

  // delete constants
  DELETE_ORDER_REQUEST,
  DELETE_ORDER_REQUEST_FAILURE,
  DELETE_ORDER_REQUEST_SUCCESS,

  //update constants
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_REQUEST_FAILURE,
  UPDATE_ORDER_REQUEST_SUCCESS,

  // items status update constants
  UPDATE_ORDER_ITEM_STATUS_REQUEST,
  UPDATE_ORDER_ITEM_STATUS_REQUEST_FAILURE,
  UPDATE_ORDER_ITEM_STATUS_REQUEST_SUCCESS,

  // order's status update constants
  UPDATE_ORDER_STATUS_REQUEST,
  UPDATE_ORDER_STATUS_REQUEST_FAILURE,
  UPDATE_ORDER_STATUS_REQUEST_SUCCESS,

  //counting constants
  TOTAL_ORDERS_COUNT_REQUEST,
  TOTAL_ORDERS_COUNT_REQUEST_FAILURE,
  TOTAL_ORDERS_COUNT_REQUEST_SUCCESS,

  // dlete item from order
  DELETE_ORDER_ITEM_REQUEST,
  DELETE_ORDER_ITEM_REQUEST_FAILURE,
  DELETE_ORDER_ITEM_REQUEST_SUCCESS,

  // for updating the added discount
  UPDATE_ORDER_DISCOUNT_REQUEST,
  UPDATE_ORDER_DISCOUNT_REQUEST_SUCCESS,
  UPDATE_ORDER_DISCOUNT_REQUEST_FAILURE,

  // for updating the delivery charges
  UPDATE_ORDER_DELIVERY_CHARGES_REQUEST,
  UPDATE_ORDER_DELIVERY_CHARGES_REQUEST_SUCCESS,
  UPDATE_ORDER_DELIVERY_CHARGES_REQUEST_FAILURE,

  // for payment update
  UPDATE_ORDER_PAYMENT_REQUEST,
  UPDATE_ORDER_PAYMENT_REQUEST_SUCCESS,
  UPDATE_ORDER_PAYMENT_REQUEST_FAILURE,
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

export const deleteOrderRequest = (orderId) => ({
  type: DELETE_ORDER_REQUEST_SUCCESS,
  payload: orderId,
});

export const getOrderByIdRequest = (orderId) => ({
  type: GET_ORDER_BY_ID_REQUEST_SUCCESS,
  payload: orderId,
});

export const updateOrder = (order) => ({
  type: UPDATE_ORDER_REQUEST_SUCCESS,
  payload: order,
});

export const updateOrderItemStatusRequest = (orderId, itemId, newStatus) => ({
  type: UPDATE_ORDER_ITEM_STATUS_REQUEST_SUCCESS,
  payload: { orderId, itemId, newStatus },
});

export const deleteOrderItemRequest = (orderId, itemId) => ({
  type: DELETE_ORDER_ITEM_REQUEST_SUCCESS,
  payload: { orderId, itemId },
});

export const updateOrderStatusRequest = (orderId, newStatus) => ({
  type: UPDATE_ORDER_STATUS_REQUEST_SUCCESS,
  payload: { orderId, newStatus },
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
      // console.log("function works", response.data);
    } catch (err) {
      console.error("Error fetching Order data:", err);
      dispatch({ type: GET_ORDERS_REQUEST_FAILURE, payload: err.message }); // Dispatching failure action with error message
    }
  };
};

// Thunk Action to Add an Order
export const addOrder = (order) => {
  return async (dispatch) => {
    dispatch({ type: ADD_ORDER_REQUEST });
    try {
      const response = await axios.post(`${api}/orders`, order);
      dispatch(addOrderToStore(response.data));
      dispatch({ type: ADD_ORDER_REQUEST_SUCCESS }); // Dispatching success action
    } catch (err) {
      console.error("Error adding Order:", err);
      dispatch({ type: ADD_ORDER_REQUEST_FAILURE, payload: err.message }); // Dispatching failure action with error message
      throw err;
    }
  };
};

// Thunk Action to Delete an Order
export const deleteOrder = (orderId) => {
  return async (dispatch) => {
    dispatch({ type: DELETE_ORDER_REQUEST });
    try {
      await axios.delete(`${api}/orders/${orderId}`);
      dispatch(deleteOrderRequest(orderId));
      dispatch({ type: DELETE_ORDER_REQUEST_SUCCESS }); // Dispatching success action
    } catch (err) {
      console.error("Error deleting Order:", err);
      dispatch({ type: DELETE_ORDER_REQUEST_FAILURE, payload: err.message }); // Dispatching failure action with error message
    }
  };
};

// Thunk Action to Get Order by ID
export const getOrderById = (orderId) => {
  return async (dispatch) => {
    dispatch({ type: GET_ORDER_BY_ID_REQUEST }); // Dispatching request action
    try {
      const response = await axios.get(`${api}/orders/${orderId}`);
      dispatch({
        type: GET_ORDER_BY_ID_REQUEST_SUCCESS,
        payload: response.data,
      }); // Dispatching success action with order data
    } catch (err) {
      console.error("Error getting Order by ID:", err);
      dispatch({
        type: GET_ORDER_BY_ID_REQUEST_FAILURE,
        payload: err.message,
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
      dispatch(updateOrder(response.data));
      dispatch({ type: UPDATE_ORDER_REQUEST_SUCCESS }); // Dispatching success action
    } catch (err) {
      console.error("Error updating Order data:", err);
      dispatch({ type: UPDATE_ORDER_REQUEST_FAILURE, payload: err.message }); // Dispatching failure action with error message
    }
  };
};

// Thunk Action to Update Order's Item Status
export const updateOrderItemStatus = (orderId, itemId, newStatus) => {
  // Dispatch the updateOrderItemStatusRequest action with the provided orderId, itemId, and newStatus
  return async (dispatch) => {
    dispatch({ type: UPDATE_ORDER_ITEM_STATUS_REQUEST }); // Dispatching request action
    try {
      // Assuming there's an API endpoint to update the item status
      console.log(`in action try`);
      const response = await axios.put(
        `${api}/orders/${orderId}/items/${itemId}/status`,
        { newStatus: newStatus }
      );
      console.log(`after request in try`);
      dispatch({
        type: UPDATE_ORDER_ITEM_STATUS_REQUEST_SUCCESS,
        payload: { orderId, itemId, newStatus },
      }); // Dispatching success action with orderId, itemId, and newStatus

      console.log(`after dispatch in try`);
    } catch (err) {
      console.error("Error updating item status:", err);
      dispatch({
        type: UPDATE_ORDER_ITEM_STATUS_REQUEST_FAILURE,
        payload: err.message,
      }); // Dispatching failure action with error message
    }
  };
};

// Thunk Action to Update Order's Item Status
export const updateOrderStatus = (orderId, newStatus) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_ORDER_STATUS_REQUEST });
    try {
      const response = await axios.put(`${api}/orders/${orderId}/status`, {
        newStatus: newStatus,
      });
      dispatch({
        type: UPDATE_ORDER_ITEM_STATUS_REQUEST_SUCCESS,
        payload: { orderId, newStatus },
      }); // Dispatching success action with orderId, itemId, and newStatus
    } catch (err) {
      console.error(`Error updating order's status:`, err);
      dispatch({
        type: UPDATE_ORDER_STATUS_REQUEST_FAILURE,
        payload: err.message,
      }); // Dispatching failure action with error message
    }
  };
};

// Thunk Action to Calculate Total Sales
export const totalSales = () => {
  return async (dispatch) => {
    dispatch({ type: TOTAL_ORDERS_COUNT_REQUEST });
    try {
      const response = await axios.get(`${api}/orders`);
      const salesCount = response.data.length; // Assuming the response is an array of orders
      dispatch(setTotalSalesCount(salesCount));
    } catch (err) {
      console.error("Error fetching sales Count data:", err);
      dispatch({
        type: TOTAL_ORDERS_COUNT_REQUEST_FAILURE,
        payload: err.message,
      }); // Dispatching failure action with error message
    }
  };
};

export const deleteItem = (orderId, itemId) => {
  return async (dispatch) => {
    dispatch({ type: DELETE_ORDER_ITEM_REQUEST });
    try {
      const response = await axios.put(
        `${api}/orders/${orderId}/items/${itemId}/delete`
      );
      dispatch({
        type: DELETE_ORDER_ITEM_REQUEST_SUCCESS,
        payload: { orderId, itemId },
      });
    } catch (err) {
      console.error(`Error deleting order item:`, err);
      dispatch({
        type: DELETE_ORDER_ITEM_REQUEST_FAILURE,
        payload: err.message,
      });
    }
  };
};

export const updateDiscount = (orderId, discount) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_ORDER_DISCOUNT_REQUEST }); // Dispatch request action

    try {
      // Make the PATCH request to update the discount
      const response = await axios.patch(
        `${api}/orders/${orderId}/updatediscount`,
        {
          discount,
        }
      );

      // Dispatch success action with the updated order data
      dispatch({
        type: UPDATE_ORDER_DISCOUNT_REQUEST_SUCCESS,
        payload: response.data.order, // Assuming the response contains the updated order
      });
    } catch (error) {
      console.error("Error updating order discount:", error);
      // Dispatch failure action with the error message
      dispatch({
        type: UPDATE_ORDER_DISCOUNT_REQUEST_FAILURE,
        payload: error.message || "Failed to update order discount",
      });
    }
  };
};

export const updatedeliveryCharges = (orderId, deliveryCharges) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_ORDER_DELIVERY_CHARGES_REQUEST }); // Dispatch request action

    try {
      // Make the PATCH request to update the discount
      const response = await axios.patch(
        `${api}/orders/${orderId}/updatedeliveryCharges`,
        {
          deliveryCharges,
        }
      );

      // Dispatch success action with the updated order data
      dispatch({
        type: UPDATE_ORDER_DELIVERY_CHARGES_REQUEST_SUCCESS,
        payload: response.data.order, // Assuming the response contains the updated order
      });
    } catch (error) {
      console.error("Error updating order discount delivery charges:", error);
      // Dispatch failure action with the error message
      dispatch({
        type: UPDATE_ORDER_DELIVERY_CHARGES_REQUEST_FAILURE,
        payload:
          error.message || "Failed to update order discountdelivery charges",
      });
    }
  };
};
export const updatePayment = (orderId, isPaid) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_ORDER_PAYMENT_REQUEST }); // Dispatch request action

    try {
      // Make the PATCH request to update the discount
      const response = await axios.patch(
        `${api}/orders/${orderId}/updatePayment`,
        {
          isPaid,
        }
      );

      // Dispatch success action with the updated order data
      dispatch({
        type: UPDATE_ORDER_PAYMENT_REQUEST_SUCCESS,
        payload: response.data.order, // Assuming the response contains the updated order
      });
    } catch (error) {
      console.error("Error updating order discount delivery charges:", error);
      // Dispatch failure action with the error message
      dispatch({
        type: UPDATE_ORDER_PAYMENT_REQUEST_FAILURE,
        payload:
          error.message || "Failed to update order discountdelivery charges",
      });
    }
  };
};
