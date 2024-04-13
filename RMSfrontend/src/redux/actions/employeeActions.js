import axios from "axios";
import { api } from "../../api/api";

// action types
import {
  GET_EMPLOYEE_REQUEST,
  GET_EMPLOYEE_REQUEST_SUCCESS,
  GET_EMPLOYEE_REQUEST_FAILURE,
  ADD_EMPLOYEE_REQUEST,
  ADD_EMPLOYEE_REQUEST_SUCCESS,
  ADD_EMPLOYEE_REQUEST_FAILURE,
  DELETE_EMPLOYEE_REQUEST,
  DELETE_EMPLOYEE_REQUEST_SUCCESS,
  DELETE_EMPLOYEE_REQUEST_FAILURE,
  TOTAL_EMPLOYEE_COUNT_REQUEST,
  TOTAL_EMPLOYEE_COUNT_REQUEST_SUCCESS,
  TOTAL_EMPLOYEE_COUNT_REQUEST_FAILURE,
  GET_EMPLOYEE_BY_ID_REQUEST,
  GET_EMPLOYEE_BY_ID_REQUEST_FAILURE,
  GET_EMPLOYEE_BY_ID_REQUEST_SUCCESS,
  UPDATE_EMPLOYEE_REQUEST,
  UPDATE_EMPLOYEE_REQUEST_FAILURE,
  UPDATE_EMPLOYEE_REQUEST_SUCCESS,
} from "../../constants/employeeConstants";

export const setEmployeeData = (employeeData) => ({
  type: GET_EMPLOYEE_REQUEST_SUCCESS,
  payload: employeeData,
});

export const addEmployeeToStore = (employeeData) => ({
  type: ADD_EMPLOYEE_REQUEST_SUCCESS,
  payload: employeeData,
});

export const deleteEmployeeFromStore = (employeeId) => ({
  type: DELETE_EMPLOYEE_REQUEST_SUCCESS,
  payload: employeeId,
});

export const setTotalEmployeesCount = (count) => ({
  type: TOTAL_EMPLOYEE_COUNT_REQUEST_SUCCESS,
  payload: count,
});

export const getEmployeeByIdRequest = (employeeId) => ({
  type: GET_EMPLOYEE_BY_ID_REQUEST_SUCCESS,
  payload: employeeId,
});

export const updateEmployeeRequest = (employee) => ({
  type: UPDATE_EMPLOYEE_REQUEST_SUCCESS,
  payload: employee,
});

export const fetchEmployeeData = () => {
  return async (dispatch) => {
    dispatch({ type: GET_EMPLOYEE_REQUEST });
    try {
      const response = await axios.get(`${api}/employees`);
      dispatch({ type: GET_EMPLOYEE_REQUEST_SUCCESS });
      dispatch(setEmployeeData(response.data));
    } catch (err) {
      console.error("Error fetching Employees data:", err);
      dispatch({ type: GET_EMPLOYEE_REQUEST_FAILURE, payload: err.message });
    }
  };
};

export const addEmployee = (employeeData) => {
  return async (dispatch) => {
    dispatch({ type: ADD_EMPLOYEE_REQUEST });

    try {
      // Send a POST request to your server's API endpoint to add the employee
      const response = await axios.post(`${api}/employees`, employeeData);
      dispatch({ type: ADD_EMPLOYEE_REQUEST_SUCCESS });
      dispatch(addEmployeeToStore(response.data));
    } catch (err) {
      console.error("Error adding an employee:", err);
      dispatch({ type: ADD_EMPLOYEE_REQUEST_FAILURE, payload: err.message });
    }
  };
};

export const deleteEmployee = (employeeId) => {
  return async (dispatch) => {
    dispatch({ type: DELETE_EMPLOYEE_REQUEST });
    try {
      // Send a DELETE request to your server's API endpoint to delete the product
      await axios.delete(`${api}/employees/${employeeId}`);
      dispatch({ type: DELETE_EMPLOYEE_REQUEST_SUCCESS });
      // Dispatch the action to delete the product from the Redux store
      dispatch(deleteEmployeeFromStore(employeeId));
    } catch (err) {
      console.error("Error deleting a employee:", err);
      dispatch({ type: DELETE_EMPLOYEE_REQUEST_FAILURE, payload: err.message });
    }
  };
};

export const totalEmployees = () => {
  return async (dispatch) => {
    dispatch({ type: TOTAL_EMPLOYEE_COUNT_REQUEST });
    try {
      const response = await axios.get(`${api}/employees`);
      const employeeCount = response.data.length; // Assuming the response is an array of employees
      dispatch({ type: TOTAL_EMPLOYEE_COUNT_REQUEST_SUCCESS });
      dispatch(setTotalEmployeesCount(employeeCount));
    } catch (err) {
      console.error("Error fetching Employees data:", err);
      dispatch({
        type: TOTAL_EMPLOYEE_COUNT_REQUEST_FAILURE,
        payload: err.message,
      });
    }
  };
};

export const getEmployeeById = (employeeId) => {
  return async (dispatch) => {
    dispatch({ type: GET_EMPLOYEE_BY_ID_REQUEST });
    try {
      const response = await axios.get(`${api}/employees/${employeeId}`);
      dispatch({
        type: GET_EMPLOYEE_BY_ID_REQUEST_SUCCESS,
        payload: response.data,
      });
    } catch (err) {
      console.error("Error getting the employee", err);
      dispatch({
        type: GET_EMPLOYEE_BY_ID_REQUEST_FAILURE,
        payload: err.message,
      });
    }
  };
};

export const updateEmployee = (employeeId, updatedData) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_EMPLOYEE_REQUEST });
    try {
      const response = await axios.put(
        `${api}/employees/${employeeId}`,
        updatedData
      );
      dispatch(updateEmployeeRequest(response.data));
      dispatch({ type: UPDATE_EMPLOYEE_REQUEST_SUCCESS });
    } catch (err) {
      console.error("Error updating employee", err);
      dispatch({ type: UPDATE_EMPLOYEE_REQUEST_FAILURE, payload: err.message });
    }
  };
};
