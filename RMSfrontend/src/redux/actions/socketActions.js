import { SET_SOCKET, CLEAR_SOCKET } from "../../constants/socketConstants";

export const setSocket = (socket) => ({
  type: SET_SOCKET,
  payload: socket,
});

export const clearSocket = () => ({
  type: CLEAR_SOCKET,
});
