import { SET_SOCKET, CLEAR_SOCKET } from "../../constants/socketConstants";

const initialState = {
  socket: null,
};

const socketReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SOCKET:
      return {
        ...state,
        socket: action.payload,
      };
    case CLEAR_SOCKET:
      return {
        ...state,
        socket: null,
      };
    default:
      return state;
  }
};

export default socketReducer;
