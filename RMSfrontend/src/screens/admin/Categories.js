import { View, Text, TextInput, Pressable, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import adminStyles from "../styles/adminStyles";
import { useNavigation } from "@react-navigation/native";
import { connect } from "react-redux";
import defaultStyles from "../../defaultStyles";
import {
  fetchCategoryData,
  deleteCategory,
} from "../../redux/actions/categoryActions";

const Categories = ({ fetchCategoryData, categoryData, deleteCategory }) => {
  useEffect(() => {
    fetchCategoryData();
  }, [fetchCategoryData]);
  const navigation = useNavigation();

  const [searchText, setSearchText] = useState("");

  const filteredCategories = categoryData.filter((category) =>
    category.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const goToUpdate = (categoryId) => {
    navigation.navigate("Update Category", { categoryId });
  };

  return (
    <View style={adminStyles.theScreen}>
      <View style={adminStyles.dataViewerHeader}>
        <View>
          <Text style={adminStyles.dataTitle}>All Categories</Text>
        </View>
        <Pressable
          onPress={() => navigation.navigate("Add Category")}
          style={adminStyles.goToModelButton}
        >
          <Text style={adminStyles.goToModelButtonText}>Add Categories</Text>
        </Pressable>
      </View>
      <View>
        <TextInput
          style={adminStyles.dataSearcher}
          placeholder="Search..."
          onChangeText={(text) => setSearchText(text)}
        ></TextInput>
      </View>
      <ScrollView>
        <View style={adminStyles.catTabPosition}>
          {filteredCategories?.map((category) => (
            <View style={adminStyles.catTabBox} key={category._id}>
              <View>
                <View>
                  <Text style={[defaultStyles.fWB, defaultStyles.fs16]}>
                    {category.name}
                  </Text>
                </View>
                <View>
                  <View>
                    <Text style={[defaultStyles.fWB, defaultStyles.fs20]}>
                      110
                    </Text>
                  </View>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Pressable
                      onPress={() => {
                        goToUpdate(category._id);
                      }}
                    >
                      <Text>edit</Text>
                    </Pressable>
                    <Pressable onPress={() => deleteCategory(category._id)}>
                      <Text>delete</Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    categoryData: state.categories.categoryData,
  };
};

const mapDispatchToProps = {
  fetchCategoryData,
  deleteCategory,
};
export default connect(mapStateToProps, mapDispatchToProps)(Categories);
