import {
  GET_EMPLOYEE_REQUEST_SUCCESS,
  ADD_EMPLOYEE_REQUEST_SUCCESS,
  DELETE_EMPLOYEE_REQUEST_SUCCESS,
  TOTAL_EMPLOYEE_COUNT_REQUEST_SUCCESS,
  GET_EMPLOYEE_BY_ID_REQUEST_SUCCESS,
  UPDATE_EMPLOYEE_REQUEST_SUCCESS,
} from "../../constants/employeeConstants";

const initialState = {
  employeeData: [],
  selectedEmployee: null,
};

const employeeReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_EMPLOYEE_REQUEST_SUCCESS:
      return {
        ...state,
        employeeData: action.payload,
      };
    case ADD_EMPLOYEE_REQUEST_SUCCESS:
      return {
        ...state,
        employeeData: [...state.employeeData, action.payload],
      };
    case DELETE_EMPLOYEE_REQUEST_SUCCESS:
      return {
        ...state,
        employeeData: state.employeeData.filter(
          (employee) => employee._id !== action.payload
        ),
      };
    case TOTAL_EMPLOYEE_COUNT_REQUEST_SUCCESS:
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
