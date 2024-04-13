import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import categoriesReducer from "../reducers/categoryReducer";
import tableReduce from "../reducers/tableReducer";
import productReducer from "../reducers/productReducer";
import quantityReducer from "../reducers/quantityReducer";
import employeeReducer from "../reducers/employeeReducer";
import userReducer from "../reducers/userReducer";
import orderReducer from "../reducers/orderReducer";
import floorReducer from "../reducers/floorReducer";
import loadingErrorReducer from "../reducers/loadingErrorReducer";

const rootReducer = combineReducers({
  categories: categoriesReducer,
  tables: tableReduce,
  products: productReducer,
  qty: quantityReducer,
  employees: employeeReducer,
  users: userReducer,
  orders: orderReducer,
  floors: floorReducer,
  loadingErrors: loadingErrorReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
