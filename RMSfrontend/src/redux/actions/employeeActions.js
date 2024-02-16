import axios from "axios";
import { api } from "../../api/api";

// action types
import {
  SET_EMPLOYEE_DATA,
  ADD_EMPLOYEE,
  DELETE_EMPLOYEE,
  SET_TOTAL_EMPLOYEES_COUNT,
} from "../../constants/employeeConstants";

export const setEmployeeData = (employeeData) => ({
  type: SET_EMPLOYEE_DATA,
  payload: employeeData,
});

export const addEmployeeToStore = (employeeData) => ({
  type: ADD_EMPLOYEE,
  payload: employeeData,
});

export const deleteEmployeeFromStore = (employeeId) => ({
  type: DELETE_EMPLOYEE,
  payload: employeeId,
});

export const setTotalEmployeesCount = (count) => ({
  type: SET_TOTAL_EMPLOYEES_COUNT,
  payload: count,
});

export const fetchEmployeeData = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${api}/employees`);
      dispatch(setEmployeeData(response.data));
    } catch (error) {
      console.error("Error fetching Employees data:", error);
    }
  };
};

export const addEmployee = (employeeData) => {
  return async (dispatch) => {
    console.log(employeeData);
    try {
      // Send a POST request to your server's API endpoint to add the employee
      const response = await axios.post(`${api}/employees`, employeeData, {
        headers: {
          "Content-Type": "multipart/form-data", // Set the content type to multipart/form-data
        },
      });

      dispatch(addEmployeeToStore(response.data));
    } catch (error) {
      console.error("Error adding an employee:", error);
    }
  };
};

export const deleteEmployee = (employeeId) => {
  return async (dispatch) => {
    try {
      // Send a DELETE request to your server's API endpoint to delete the product
      await axios.delete(`${api}/employees/${employeeId}`);

      // Dispatch the action to delete the product from the Redux store
      dispatch(deleteEmployeeFromStore(employeeId));
    } catch (error) {
      console.error("Error deleting a employee:", error);
    }
  };
};

export const totalEmployees = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${api}/employees`);
      const employeeCount = response.data.length; // Assuming the response is an array of employees
      dispatch(setTotalEmployeesCount(employeeCount));
    } catch (error) {
      console.error("Error fetching Employees data:", error);
    }
  };
};
