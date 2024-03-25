import { GET_FLOOR_REQUEST_SUCCESS } from "../../constants/floorConstants";

const initialState = {
  floorData: [],
};

const floorReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_FLOOR_REQUEST_SUCCESS:
      return {
        ...state,
        floorData: action.payload,
      };
    default:
      return state;
  }
};

export default floorReducer;
