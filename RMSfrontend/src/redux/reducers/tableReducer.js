const initialState = {
  tableData: [],
  reservedTables: [],
};

const tableReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_TABLE_DATA":
      return {
        ...state,
        tableData: action.payload,
      };
    case "SET_RESERVED_TABLES":
      return {
        ...state,
        reservedTables: action.payload,
      };
    case "MADE_TABLE_RESERVED":
      const reservedTableId = action.tableId;
      const updatedReservedTablesReserved =
        state.reservedTables.concat(reservedTableId);
      return {
        ...state,
        reservedTables: updatedReservedTablesReserved,
      };
    case "MADE_TABLE_AVAILABLE":
      const availableTableId = action.tableId;
      const updatedReservedTablesAvailable = state.reservedTables.filter(
        (tableId) => tableId !== availableTableId
      );
      return {
        ...state,
        reservedTables: updatedReservedTablesAvailable,
      };
    default:
      return state;
  }
};

export default tableReducer;
