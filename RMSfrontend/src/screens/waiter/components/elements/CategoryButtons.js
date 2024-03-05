import React, { useEffect } from "react";
import { View, Pressable, Text, ScrollView } from "react-native";
import { connect } from "react-redux";
import {
  fetchCategoryData,
  selectCategory,
} from "../../../../redux/actions/categoryActions";
import waiterStyles from "../../../styles/waiterStyles"; // Adjust import path as needed

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
          <Pressable
            style={[
              waiterStyles.categoryButtons,
              selectedCategory === null && waiterStyles.selectedCategoryButtons,
            ]}
            onPress={() => handleCategoryClick(null)} // Deselect category (All button)
          >
            <Text>All</Text>
          </Pressable>
          {categoryData.map((category) => (
            <Pressable
              key={category._id}
              style={[
                waiterStyles.categoryButtons,
                selectedCategory === category._id &&
                  waiterStyles.selectedCategoryButtons,
              ]}
              onPress={() => handleCategoryClick(category._id)} // Handle other category clicks
            >
              <Text>{category.name}</Text>
            </Pressable>
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
