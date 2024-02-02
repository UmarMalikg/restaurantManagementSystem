import React, { useEffect } from "react";
import axios from "axios";
import { View, TouchableOpacity, Text, ScrollView } from "react-native";
import { connect } from "react-redux";
import {
  fetchCategoryData,
  selectCategory,
} from "../../../../redux/actions/categoryActions";
import waiterStyles from "../../styles/style"; // Adjust import path as needed

const CategoryButtons = ({
  categoryData,
  fetchCategoryData,
  selectCategory,
  selectedCategory,
}) => {
  useEffect(() => {
    fetchCategoryData();
  }, [fetchCategoryData]);

  const handleCategoryClick = (categoryId) => {
    // Dispatch the selected category to the Redux store
    selectCategory(categoryId);
  };

  return (
    <>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={waiterStyles.category}>
          <TouchableOpacity
            style={[
              waiterStyles.categoryButtons,
              selectedCategory === null && waiterStyles.selectedCategoryButtons,
            ]}
            onPress={() => handleCategoryClick(null)} // Deselect category (All button)
          >
            <Text>All</Text>
          </TouchableOpacity>
          {categoryData.map((category) => (
            <TouchableOpacity
              key={category._id}
              style={[
                waiterStyles.categoryButtons,
                selectedCategory === category._id &&
                  waiterStyles.selectedCategoryButtons,
              ]}
              onPress={() => handleCategoryClick(category._id)} // Handle other category clicks
            >
              <Text>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    categoryData: state.categories.categoryData,
    selectedCategory: state.categories.selectedCategory,
  };
};

const mapDispatchToProps = {
  fetchCategoryData,
  selectCategory,
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryButtons);
