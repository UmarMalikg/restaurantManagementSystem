import axios from "axios";
import { api } from "../../api/api";

export const setUserData = (userData) => ({
  type: "SET_USER_DATA",
  payload: userData,
});

export const addUserToStore = (userData) => ({
  type: "ADD_USER",
  payload: userData,
});

export const fetchUserData = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${api}/users`);
      dispatch(setUserData(response.data));
    } catch (error) {
      console.error("Error fetching Users data:", error);
    }
  };
};

export const addUser = (userData) => {
  return async (dispatch) => {
    console.log(userData);
    try {
      // Send a POST request to your server's API endpoint to add the user
      const response = await axios.post(`${api}/users`, userData);

      dispatch(addUserToStore(response.data));
    } catch (error) {
      console.error("Error adding a User:", error);
    }
  };
};
