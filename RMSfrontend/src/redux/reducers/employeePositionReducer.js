// categoryReducer.js
import {
  SET_EMPLOYEE_POSITION_DATA,
  SELECT_EMPLOYEE_POSITION,
} from "../actions/employeePositionActions";

const initialState = {
  employeePositionData: [],
  selectedEmployeePosition: null, // Initially, no category is selected
};

const employeePositionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_EMPLOYEE_POSITION_DATA:
      return {
        ...state,
        employeePositionData: action.payload,
      };
    case SELECT_EMPLOYEE_POSITION:
      return { ...state, selectedEmployeePosition: action.payload };
    default:
      return state;
  }
};

export default employeePositionReducer;
