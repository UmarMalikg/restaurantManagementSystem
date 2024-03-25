import axios from "axios";
import { api } from "../../api/api";

import {
  GET_FLOOR_REQUEST,
  GET_FLOOR_REQUEST_FAILURE,
  GET_FLOOR_REQUEST_SUCCESS,
} from "../../constants/floorConstants";

export const setFloorData = (floorData) => ({
  type: GET_FLOOR_REQUEST_SUCCESS,
  payload: floorData,
});

export const fetchFloorData = (floorData) => {
  return async (dispatch) => {
    dispatch({ type: GET_FLOOR_REQUEST });
    try {
      const response = await axios.get(`${api}/floors`);
      dispatch({ type: GET_FLOOR_REQUEST_SUCCESS });
      dispatch(setFloorData(response.data));
    } catch (err) {
      console.error("Error fetching Floors data:", err);
      dispatch({ type: GET_FLOOR_REQUEST_FAILURE });
    }
  };
};
