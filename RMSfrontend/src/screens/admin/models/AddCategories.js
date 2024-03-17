import React, { useState } from "react";
import { View, Text, TextInput, Pressable, ScrollView } from "react-native";
import { connect } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import adminStyles from "../../styles/adminStyles";
import { addCategory } from "../../../redux/actions/categoryActions";

const AddCategories = ({ addCategory }) => {
  const navigation = useNavigation();

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
  const submitForm = () => {
    // Check if all required fields are filled
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
    addCategory(categoryData);

    // Optionally, you can reset the form after submission
    setFormData({
      name: "",
    });
  };

  return (
    <View style={adminStyles.model}>
      <Text style={adminStyles.modelHeader}>Add New Product</Text>
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

const mapDispatchToProps = {
  addCategory,
};

export default connect(null, mapDispatchToProps)(AddCategories);
