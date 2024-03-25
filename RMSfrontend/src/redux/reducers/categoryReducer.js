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
  UPDATE_CATEGORY_REQUEST_SUCCESS,
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
    case UPDATE_CATEGORY_REQUEST_SUCCESS:
      // Find the index of the category to be updated
      const updatedIndex = state.categoryData.findIndex(
        (category) =>
          category && action.payload && category._id === action.payload._id
      );

      // If the category is found, update it
      if (updatedIndex !== -1) {
        const updatedCategoryData = [...state.categoryData];
        updatedCategoryData[updatedIndex] = action.payload;

        return {
          ...state,
          categoryData: updatedCategoryData,
        };
      } else {
        // If the category is not found, return the state as it is
        return state;
      }

    default:
      return state;
  }
};

export default categoryReducer;
