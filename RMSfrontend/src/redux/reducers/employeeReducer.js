import {
  SET_EMPLOYEE_DATA,
  ADD_EMPLOYEE,
  DELETE_EMPLOYEE,
  SET_TOTAL_EMPLOYEES_COUNT,
  GET_EMPLOYEE_BY_ID_REQUEST_SUCCESS,
  UPDATE_EMPLOYEE_REQUEST_SUCCESS,
} from "../../constants/employeeConstants";

const initialState = {
  employeeData: [],
  selectedEmployee: null,
};

const employeeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_EMPLOYEE_DATA:
      return {
        ...state,
        employeeData: action.payload,
      };
    case ADD_EMPLOYEE:
      return {
        ...state,
        employeeData: [...state.employeeData, action.payload],
      };
    case DELETE_EMPLOYEE:
      return {
        ...state,
        employeeData: state.employeeData.filter(
          (employee) => employee._id !== action.payload
        ),
      };
    case SET_TOTAL_EMPLOYEES_COUNT:
      return {
        ...state,
        totalEmployeesCount: action.payload,
      };

    case GET_EMPLOYEE_BY_ID_REQUEST_SUCCESS:
      return {
        ...state,
        selectedEmployee: action.payload,
      };

    case UPDATE_EMPLOYEE_REQUEST_SUCCESS:
      const updatedIndex = state.employeeData.findIndex(
        (employee) =>
          employee && action.payload && employee._id === action.payload._id
      );

      if (updatedIndex !== -1) {
        const updatedEmployeeData = [...state.employeeData];
        updatedEmployeeData[updatedIndex] = action.payload;
        return {
          ...state,
          employeeData: updatedEmployeeData,
        };
      }

    default:
      return state;
  }
};

export default employeeReducer;
