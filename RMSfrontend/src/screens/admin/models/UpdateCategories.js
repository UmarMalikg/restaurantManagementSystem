import React, { useState, useEffect, useContext } from "react";
import { View, Text, TextInput, Pressable, ScrollView } from "react-native";
import { connect } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import adminStyles from "../../styles/adminStyles";
import {
  updateCategory,
  getCategoryById,
} from "../../../redux/actions/categoryActions";

import SocketContext from "../../../context/socketContext";
import { emitSocket } from "../../../socketConfig/socketFunctions";

import Loader from "../../Loader";
import ErrorPage from "../../ErrorPage";

const UpdateCategories = ({
  route,
  updateCategory,
  selectedCategory,
  getCategoryById,
  isLoading,
  isError,
}) => {
  const { categoryId } = route.params;
  const navigation = useNavigation();
  const socket = useContext(SocketContext);
  // defining the fields required for the submission of form
  const [formData, setFormData] = useState({
    name: "",
  });

  useEffect(() => {
    if (categoryId) {
      getCategoryById(categoryId);
    }
  }, [getCategoryById, categoryId]);

  useEffect(() => {
    if (selectedCategory) {
      // Update formData state with selectedCategory's name
      setFormData((prevFormData) => ({
        ...prevFormData,
        name: selectedCategory.name,
      }));
    }
  }, [selectedCategory]);

  //definig the function resposible for chang of values in the fields
  // here isNumeric is defined for those fields that can only accepts the numeric value
  const handleChange = (fieldName, value, isNumeric) => {
    const cleanedValue = isNumeric ? value.replace(/[^0-9]/g, "") : value;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [fieldName]: cleanedValue,
    }));
  };

  // defining the field that handles the change of selection of image

  // defining the for submission function
  const submitForm = async () => {
    // Check if all required fields are filled
    try {
      if (!formData.name) {
        console.log("Please fill in all fields");
        alert("Please fill in all required fields");
        return;
      }

      // Pass an object with properties name, description, img, and price to addProduct
      const categoryData = {
        name: formData.name,
      };

      // Dispatch the addProduct action
      await updateCategory(categoryId, categoryData);
      console.log("updated");
      navigation.navigate("Categories");

      // Optionally, you can reset the form after submission
      setFormData({
        name: "",
      });

      emitSocket(socket, "categoryChanged");
    } catch (err) {
      console.error(err);
    }
  };

  if (!selectedCategory) {
    // Render loading indicator or placeholder while data is being fetched
    return <Text>Loading...</Text>;
  }
  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <ErrorPage />;
  }
  return (
    <View style={adminStyles.model}>
      <Text style={adminStyles.modelHeader}>Edit Category</Text>
      <Pressable
        style={adminStyles.modelCloser}
        onPress={() => navigation.navigate("Categories")}
      >
        <Text style={adminStyles.modelCloserText}>X</Text>
      </Pressable>
      <ScrollView
        style={adminStyles.scroller}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <Text style={adminStyles.modelLabel}>
          Category Name<Text style={adminStyles.requiredStar}>*</Text>
        </Text>
        <TextInput
          style={adminStyles.modelInput}
          value={formData.name}
          placeholder="Category Name..."
          onChangeText={(text) => handleChange("name", text)}
          required
        />

        <Pressable onPress={submitForm} style={adminStyles.modelButton}>
          <Text style={adminStyles.modelButtonText}>Update Category</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    selectedCategory: state.categories.selectedCategory,
    isLoading: state.loadingErrors.isLoading,
    isError: state.loadingErrors.isError,
  };
};
const mapDispatchToProps = {
  updateCategory,
  getCategoryById,
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateCategories);
