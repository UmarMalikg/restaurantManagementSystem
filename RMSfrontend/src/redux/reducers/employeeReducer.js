const initialState = {
  employeeData: [],
};

const employeeReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_EMPLOYEE_DATA":
      return {
        ...state,
        employeeData: action.payload,
      };
    case "ADD_EMPLOYEE":
      return {
        ...state,
        employeeData: [...state.employeeData, action.payload],
      };
    case "DELETE_EMPLOYEE":
      return {
        ...state,
        employeeData: state.employeeData.filter(
          (employee) => employee._id !== action.payload
        ),
      };
    case "SET_TOTAL_EMPLOYEES_COUNT":
      return {
        ...state,
        totalEmployeesCount: action.payload,
      };
    default:
      return state;
  }
};

export default employeeReducer;
