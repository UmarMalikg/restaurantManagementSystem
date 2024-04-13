import axios from "axios";
import { api } from "../../api/api";

import {
  GET_TABLE_REQUEST,
  GET_TABLE_REQUEST_SUCCESS,
  GET_TABLE_REQUEST_FAILURE,
  SET_RESERVED_TABLES,
  MADE_TABLE_AVAILABLE,
  MADE_TABLE_RESERVED,
  ADD_TABLE_REQUEST_SUCCESS,
  ADD_TABLE_REQUEST,
  ADD_TABLE_REQUEST_FAILURE,
  DELETE_TABLE_REQUEST,
  DELETE_TABLE_REQUEST_FAILURE,
  DELETE_TABLE_REQUEST_SUCCESS,
  UPDATE_TABLE_REQUEST,
  UPDATE_TABLE_REQUEST_FAILURE,
  UPDATE_TABLE_REQUEST_SUCCESS,
  GET_TABLE_BY_ID_REQUEST,
  GET_TABLE_BY_ID_REQUEST_FAILURE,
  GET_TABLE_BY_ID_REQUEST_SUCCESS,
} from "../../constants/tableConstants";

export const setTableData = (tableData) => ({
  type: GET_TABLE_REQUEST_SUCCESS,
  payload: tableData,
});

export const selectTable = (tableId) => ({
  type: GET_TABLE_BY_ID_REQUEST_SUCCESS,
  payload: tableId,
});

export const setReservedTables = (reservedTables) => ({
  type: SET_RESERVED_TABLES,
  payload: reservedTables,
});
export const setTableReserved = (tableId) => ({
  type: MADE_TABLE_RESERVED,
  tableId,
});
export const setTableAvailable = (tableId) => ({
  type: MADE_TABLE_AVAILABLE,
  tableId,
});
export const addTableToStore = (table) => ({
  type: ADD_TABLE_REQUEST_SUCCESS,
  payload: table,
});

export const deletTableRequest = (tableId) => ({
  type: DELETE_TABLE_REQUEST_SUCCESS,
  payload: tableId,
});

export const updateTableRequest = (table) => ({
  type: UPDATE_TABLE_REQUEST_SUCCESS,
  payload: table,
});

export const updateTable = (tableId, updatedData) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_TABLE_REQUEST });
    try {
      const response = await axios.put(`${api}/tables/${tableId}`, updatedData);
      dispatch(
        { type: UPDATE_TABLE_REQUEST_SUCCESS },
        updateTableRequest(tableId)
      );
    } catch (err) {
      console.error("Error fetching table data:", err);
      dispatch({
        type: UPDATE_TABLE_REQUEST_FAILURE,
        payload: err.message,
      });
    }
  };
};

export const addTable = (table) => {
  return async (dispatch) => {
    dispatch({ type: ADD_TABLE_REQUEST });
    try {
      const response = await axios.post(`${api}/tables`, table);
      dispatch({ type: ADD_TABLE_REQUEST_SUCCESS });
      dispatch(addTableToStore(response.data));
    } catch (err) {
      console.error("Error fetching table data:", err);
      dispatch({ type: ADD_TABLE_REQUEST_FAILURE, payload: err.message });
    }
  };
};
export const fetchTableData = () => {
  return async (dispatch) => {
    dispatch({ type: GET_TABLE_REQUEST });
    try {
      const response = await axios.get(`${api}/tables`);
      const allTables = response.data;
      const reservedTables = allTables.filter((table) => table.isReserved);
      dispatch({ type: GET_TABLE_REQUEST_SUCCESS });
      dispatch(setTableData(allTables));
      dispatch(setReservedTables(reservedTables));
    } catch (err) {
      console.error("Error fetching table data:", err);
      dispatch({ type: GET_TABLE_REQUEST_FAILURE, payload: err.message });
    }
  };
};

export const updateTableData = (tableId) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${api}/tables/${tableId}`);
      const tableToUpdate = response.data;

      if (!tableToUpdate) {
        console.error("Table not found.");
        return;
      }
      dispatch(makeTableReserved(tableId));
      dispatch(makeTableAvailable(tableId));
    } catch (error) {
      console.error("Error updating table data:", error);
    }
  };
};

export const makeTableReserved = (tableId) => {
  return async (dispatch) => {
    try {
      await axios.put(`${api}/tables/${tableId}`, {
        isReserved: true,
      });
      dispatch(setTableReserved(tableId));
    } catch (error) {
      console.error("Error making the table reserved:", error);
    }
  };
};

export const makeTableAvailable = (tableId) => {
  return async (dispatch) => {
    try {
      await axios.put(`${api}/tables/${tableId}`, {
        isReserved: false,
      });
      dispatch(setTableAvailable(tableId));
    } catch (error) {
      console.error("Error making the table available:", error);
    }
  };
};

export const deleteTable = (tableId) => {
  return async (dispatch) => {
    dispatch({ type: DELETE_TABLE_REQUEST });
    try {
      await axios.delete(`${api}/tables/${tableId}`);
      dispatch({ type: DELETE_TABLE_REQUEST_SUCCESS });
      dispatch(deletTableRequest(tableId));
    } catch (err) {
      console.error("Error Deletint=g the table:", err);
      dispatch({ type: DELETE_TABLE_REQUEST_FAILURE, payload: err.message });
    }
  };
};

// 2 function getById and updateTable

export const getTableById = (tableId) => {
  return async (dispatch) => {
    dispatch({ type: GET_TABLE_BY_ID_REQUEST });
    try {
      const response = await axios.get(`${api}/tables/${tableId}`);
      dispatch({
        type: GET_TABLE_BY_ID_REQUEST_SUCCESS,
        payload: response.data,
      });
    } catch (err) {
      console.error("Error Geting the Table with this Id");
      dispatch({
        type: GET_TABLE_BY_ID_REQUEST_FAILURE,
        payload: err.message,
      });
    }
  };
};
