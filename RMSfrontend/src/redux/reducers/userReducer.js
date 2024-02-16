import { SET_USER_DATA, ADD_USER } from "../../constants/userConstants";

const initialState = {
  userData: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        userData: action.payload,
      };
    case ADD_USER:
      return {
        ...state,
        userData: [...state.userData, action.payload],
      };
    default:
      return state;
  }
};

export default userReducer;
