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
    default:
      return state;
  }
};

export default employeeReducer;
