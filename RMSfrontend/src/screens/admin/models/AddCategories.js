import React, { useState, useContext } from "react";
import { View, Text, TextInput, Pressable, ScrollView } from "react-native";
import { connect } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import adminStyles from "../../styles/adminStyles";
import { addCategory } from "../../../redux/actions/categoryActions";
import SocketContext from "../../../context/socketContext";
import { emitSocket } from "../../../socketConfig/socketFunctions";

import Loader from "../../Loader";
import ErrorPage from "../../ErrorPage";

const AddCategories = ({ addCategory, isLoading, isError }) => {
  const navigation = useNavigation();
  const socket = useContext(SocketContext);

  // defining the fields required for the submission of form
  const [formData, setFormData] = useState({
    name: "",
  });

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
      await addCategory(categoryData);
      // Optionally, you can reset the form after submission
      setFormData({
        name: "",
      });
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
    <View style={adminStyles.model}>
      <Text style={adminStyles.modelHeader}>Add New Category</Text>
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
          <Text style={adminStyles.modelButtonText}>Add Category</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
};
const mapStateToProps = (state) => {
  return {
    isLoading: state.loadingErrors.isLoading,
    isError: state.loadingErrors.isError,
  };
};
const mapDispatchToProps = {
  addCategory,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddCategories);
