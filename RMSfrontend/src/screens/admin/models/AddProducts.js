import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  Picker,
  ScrollView,
} from "react-native";
import { connect } from "react-redux";
import { addProduct } from "../../../redux/actions/productAction";
import { fetchCategoryData } from "../../../redux/actions/categoryActions";
import { useNavigation } from "@react-navigation/native";
import adminStyles from "../../styles/waiterStyles";

const AddProduct = ({ addProduct, fetchCategoryData, categoryData }) => {
  const navigation = useNavigation();

  // defining the fields required for the submission of form
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    img: null,
    price: "",
    category: "",
    qty: "",
  });

  // fetching the required data needed during the submission of form
  useEffect(() => {
    // Fetch category data when the component mounts
    fetchCategoryData();
  }, [fetchCategoryData]);

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
  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      setFormData({
        ...formData,
        img: file,
      });
    }
  };

  // defining the for submission function
  const submitForm = () => {
    // Check if all required fields are filled
    if (
      !formData.name ||
      !formData.description ||
      !formData.img ||
      !formData.price
    ) {
      console.log("Please fill in all fields");
      alert("Please fill in all required fields");
      return;
    }

    // Pass an object with properties name, description, img, and price to addProduct
    const productData = {
      name: formData.name,
      description: formData.description,
      img: formData.img,
      price: formData.price,
      category: formData.category,
      qty: formData.qty,
    };

    // Dispatch the addProduct action
    addProduct(productData);

    // Optionally, you can reset the form after submission
    setFormData({
      name: "",
      description: "",
      img: null,
      price: "",
      category: "",
      qty: "",
    });
  };

  return (
    <View style={adminStyles.model}>
      <Text style={adminStyles.modelHeader}>Add New Product</Text>
      <Pressable
        style={adminStyles.modelCloser}
        onPress={() => navigation.navigate("Products")}
      >
        <Text style={adminStyles.modelCloserText}>X</Text>
      </Pressable>
      <ScrollView
        style={adminStyles.scroller}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <Text style={adminStyles.modelLabel}>
          Product Name<Text style={adminStyles.requiredStar}>*</Text>
        </Text>
        <TextInput
          style={adminStyles.modelInput}
          value={formData.name}
          placeholder="Product Name..."
          onChangeText={(text) => handleChange("name", text)}
          required
        />
        <Text style={adminStyles.modelLabel}>
          Product Description<Text style={adminStyles.requiredStar}>*</Text>
        </Text>
        <TextInput
          style={adminStyles.modelInput}
          value={formData.description}
          placeholder="Description..."
          onChangeText={(text) => handleChange("description", text)}
        />
        <Text style={adminStyles.modelLabel}>
          Product Image<Text style={adminStyles.requiredStar}>*</Text>
        </Text>
        <input
          style={adminStyles.modelInput}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          required
        />
        {formData.img && (
          <>
            <Image
              source={{ uri: URL.createObjectURL(formData.img) }}
              style={{ width: 100, height: 100 }}
            />
          </>
        )}
        <Text style={adminStyles.modelLabel}>Product Category</Text>
        <Picker
          style={adminStyles.modelInput}
          selectedValue={formData.category}
          onValueChange={(itemValue) => handleChange("category", itemValue)}
        >
          <Picker.Item label="Select a Category" value="" />
          {categoryData.map((category) => (
            <Picker.Item
              key={category._id}
              label={category.name}
              value={category._id}
            />
          ))}
        </Picker>
        <Text style={adminStyles.modelLabel}>Product Quantity</Text>
        <TextInput
          style={adminStyles.modelInput}
          value={formData.qty}
          placeholder="Quantity..."
          onChangeText={(text) => handleChange("qty", text, true)}
        />
        <Text style={adminStyles.modelLabel}>
          Product Price<Text style={adminStyles.requiredStar}>*</Text>
        </Text>
        <TextInput
          style={adminStyles.modelInput}
          value={formData.price}
          placeholder="Price-..."
          onChangeText={(text) => handleChange("price", text, true)}
          keyboardType="numeric" // Assuming price is a numeric value
        />
        <Pressable onPress={submitForm} style={adminStyles.modelButton}>
          <Text style={adminStyles.modelButtonText}>Add Product</Text>
        </Pressable>
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
  addProduct,
  fetchCategoryData,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddProduct);
