import {
  GET_TABLE_REQUEST_SUCCESS,
  SET_RESERVED_TABLES,
  MADE_TABLE_RESERVED,
  MADE_TABLE_AVAILABLE,
  ADD_TABLE_REQUEST_SUCCESS,
  DELETE_TABLE_REQUEST_SUCCESS,
  UPDATE_TABLE_REQUEST_SUCCESS,
  GET_TABLE_BY_ID_REQUEST_SUCCESS,
} from "../../constants/tableConstants";

const initialState = {
  tableData: [],
  reservedTables: [],
  selectedTable: null,
};

const tableReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TABLE_REQUEST_SUCCESS:
      return {
        ...state,
        tableData: action.payload,
      };
    case ADD_TABLE_REQUEST_SUCCESS:
      return {
        ...state,
        tableData: [...state.tableData, action.payload],
      };
    case SET_RESERVED_TABLES:
      return {
        ...state,
        reservedTables: action.payload,
      };
    case MADE_TABLE_RESERVED:
      const reservedTableId = action.tableId;
      const updatedReservedTablesReserved =
        state.reservedTables.concat(reservedTableId);
      return {
        ...state,
        reservedTables: updatedReservedTablesReserved,
      };
    case MADE_TABLE_AVAILABLE:
      const availableTableId = action.tableId;
      const updatedReservedTablesAvailable = state.reservedTables.filter(
        (tableId) => tableId !== availableTableId
      );
      return {
        ...state,
        reservedTables: updatedReservedTablesAvailable,
      };
    case DELETE_TABLE_REQUEST_SUCCESS:
      return {
        ...state,
        tableData: state.tableData.filter(
          (table) => table._id !== action.payload
        ),
      };

    case UPDATE_TABLE_REQUEST_SUCCESS:
      const updatedIndex = state.tableData.findIndex(
        (table) => table && action.payload && table._id === action.payload._id
      );

      if (updatedIndex !== -1) {
        const updatedTableData = [...state.tableData];
        updatedTableData[updatedIndex];
        return {
          ...state,
          tableData: updatedTableData,
        };
      } else {
        return state;
      }

    case GET_TABLE_BY_ID_REQUEST_SUCCESS:
      return {
        ...state,
        selectedTable: action.payload,
      };

    default:
      return state;
  }
};

export default tableReducer;
