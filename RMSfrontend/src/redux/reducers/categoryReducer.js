import {
  ADD_CATEGORY_REQUEST,
  ADD_CATEGORY_REQUEST_SUCCESS,
  ADD_CATEGORY_REQUEST_FAILURE,
  GET_CATEGORY_REQUEST,
  GET_CATEGORY_REQUEST_SUCCESS,
  GET_CATEGORY_REQUEST_FAILURE,
  GET_CATEGORY_BY_ID_REQUEST,
  GET_CATEGORY_BY_ID_REQUEST_SUCCESS,
  GET_CATEGORY_BY_ID_REQUEST_FAILURE,
} from "../../constants/categotyConstants";

const initialState = {
  categoryData: [],
  selectedCategory: null, // Initially, no category is selected
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CATEGORY_REQUEST_SUCCESS:
      return {
        ...state,
        categoryData: action.payload,
      };
    case GET_CATEGORY_BY_ID_REQUEST_SUCCESS:
      return { ...state, selectedCategory: action.payload };
    case ADD_CATEGORY_REQUEST_SUCCESS:
      return {
        ...state,
        categoryData: [...state.categoryData, action.payload],
      };
    default:
      return state;
  }
};

export default categoryReducer;
