import axios from "axios";
import { api } from "../../api/api";

export const setEmployeeData = (employeeData) => ({
  type: "SET_EMPLOYEE_DATA",
  payload: employeeData,
});

export const addEmployeeToStore = (employeeData) => ({
  type: "ADD_EMPLOYEE",
  payload: employeeData,
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
