import { View, Text, TextInput, Pressable, ScrollView } from "react-native";
import React, { useEffect, useState, useContext } from "react";
import adminStyles from "../styles/adminStyles";
import { useNavigation } from "@react-navigation/native";
import { connect } from "react-redux";
import defaultStyles from "../../defaultStyles";
import {
  fetchCategoryData,
  deleteCategory,
} from "../../redux/actions/categoryActions";

import SocketContext from "../../context/socketContext";
import {
  emitSocket,
  changeViaSocket,
} from "../../socketConfig/socketFunctions";

import Loader from "../Loader";
import ErrorPage from "../ErrorPage";
import AdminEditIcon from "../common/AdminEditIcon";
import AdminDeleteIcon from "../common/AdminDeleteIcon";

const Categories = ({
  fetchCategoryData,
  categoryData,
  deleteCategory,
  isLoading,
  isError,
}) => {
  useEffect(() => {
    fetchCategoryData();
  }, [fetchCategoryData]);

  const handleCategoryChanged = () => {
    fetchCategoryData(); // Wait for the data to be fetched
    console.log("Category data fetched successfully");
  };
  useEffect(() => {
    changeViaSocket(socket, "categoryChanged", handleCategoryChanged);
  }, [socket]);
  const navigation = useNavigation();
  const socket = useContext(SocketContext);

  const [searchText, setSearchText] = useState("");

  const filteredCategories = categoryData.filter(
    (category) =>
      category &&
      category.name &&
      category.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const goToUpdate = (categoryId) => {
    navigation.navigate("Update Category", { categoryId });
  };

  const deleteACategory = async (categoryId) => {
    try {
      await deleteCategory(categoryId);
      emitSocket(socket, "categoryChanged");
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <ErrorPage />;
  }

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
                <Text style={[defaultStyles.fWB, defaultStyles.fs16]}>
                  {category.name}
                </Text>
              </View>
              <View>
                {/* <View>
                  <Text style={[defaultStyles.fWB, defaultStyles.fs20]}>
                    110
                  </Text>
                </View> */}
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
                    <AdminEditIcon />
                  </Pressable>
                  <Pressable onPress={() => deleteACategory(category._id)}>
                    <AdminDeleteIcon />
                  </Pressable>
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
    isLoading: state.loadingErrors.isLoading,
    isError: state.loadingErrors.isError,
  };
};

const mapDispatchToProps = {
  fetchCategoryData,
  deleteCategory,
};
export default connect(mapStateToProps, mapDispatchToProps)(Categories);
