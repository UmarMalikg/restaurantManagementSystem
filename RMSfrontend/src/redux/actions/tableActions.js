import axios from "axios";
import { api } from "../../api/api";

export const setTableData = (tableData) => ({
  type: "SET_TABLE_DATA",
  payload: tableData,
});

export const setReservedTables = (reservedTables) => ({
  type: "SET_RESERVED_TABLES",
  payload: reservedTables,
});
export const setTableReserved = (tableId) => ({
  type: "MADE_TABLE_RESERVED",
  tableId,
});
export const setTableAvailable = (tableId) => ({
  type: "MADE_TABLE_AVAILABLE",
  tableId,
});

export const fetchTableData = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${api}/tables`);
      const allTables = response.data;
      const reservedTables = allTables.filter((table) => table.isReserved);

      dispatch(setTableData(allTables));
      dispatch(setReservedTables(reservedTables));
    } catch (error) {
      console.error("Error fetching table data:", error);
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
