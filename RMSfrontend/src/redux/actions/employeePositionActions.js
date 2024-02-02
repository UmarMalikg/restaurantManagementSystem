// categoryActions.js
import axios from "axios";
import { api } from "../../api/api";

// Action Types
export const SET_EMPLOYEE_POSITION_DATA = "SET_EMPLOYEE_POSITION_DATA";
export const SELECT_EMPLOYEE_POSITION = "SELECT_EMPLOYEE_POSITION";

// Action Creators
export const setEmployeePositionData = (employeePositionData) => ({
  type: SET_EMPLOYEE_POSITION_DATA,
  payload: employeePositionData,
});

export const selectEmployeePosition = (employeePositionId) => ({
  type: SELECT_EMPLOYEE_POSITION,
  payload: employeePositionId,
});

// Thunk Action to Fetch Category Data
export const fetchEmployeePositionData = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${api}/employeePositions`);
      dispatch(setEmployeePositionData(response.data));
    } catch (error) {
      console.error("Error fetching Employee Poistion data:", error);
    }
  };
};
