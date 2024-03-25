import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  Picker,
} from "react-native";
import { connect } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import adminStyles from "../../styles/adminStyles";
import { addTable } from "../../../redux/actions/tableActions";
import { fetchFloorData } from "../../../redux/actions/floorActions";

const AddTables = ({ addTable, fetchFloorData, floorData }) => {
  const navigation = useNavigation();

  // defining the fields required for the submission of form
  const [formData, setFormData] = useState({
    name: "",
    floor: "",
    seats: 4,
  });

  useEffect(() => {
    // Fetch category data when the component mounts
    fetchFloorData();
  }, [fetchFloorData]);
  console.log("floorData:", floorData);

  //definig the function resposible for chang of values in the fields
  // here isNumeric is defined for those fields that can only accepts the numeric value
  const handleChange = (fieldName, value, isNumeric) => {
    const cleanedValue = isNumeric ? value.replace(/[^0-9]/g, "") : value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [fieldName]: cleanedValue,
    }));
  };

  // defining the for submission function
  const submitForm = () => {
    // Check if all required fields are filled
    if (!formData.name || !formData.floor) {
      console.log("Please fill in all fields");
      alert("Please fill in all required fields");
      return;
    }
    if (formData.seats < 1) {
      console.log("seats can't be less than 1");
      alert("seats can't be less than 1");
      return;
    }

    // Pass an object with properties name, description, img, and price to addProduct
    const tableData = {
      name: formData.name,
      floor: formData.floor,
      seats: formData.seats,
    };

    // Dispatch the addProduct action
    addTable(tableData);
    console.log("added");
    alert("added");

    // Optionally, you can reset the form after submission
    setFormData({
      name: "",
      floor: "",
      seats: 4,
    });
  };

  return (
    <View style={adminStyles.model}>
      <Text style={adminStyles.modelHeader}>Add New Table</Text>
      <Pressable
        style={adminStyles.modelCloser}
        onPress={() => navigation.navigate("Tables")}
      >
        <Text style={adminStyles.modelCloserText}>X</Text>
      </Pressable>
      <ScrollView
        style={adminStyles.scroller}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <Text style={adminStyles.modelLabel}>
          Table Name<Text style={adminStyles.requiredStar}>*</Text>
        </Text>
        <TextInput
          style={adminStyles.modelInput}
          value={formData.name}
          placeholder="Table Name..."
          onChangeText={(text) => handleChange("name", text)}
          required
        />

        <Text style={adminStyles.modelLabel}>
          Select Floor<Text style={adminStyles.requiredStar}>*</Text>
        </Text>

        <Picker
          style={adminStyles.modelInput}
          selectedValue={formData.floor}
          onValueChange={(itemValue) => handleChange("floor", itemValue)}
        >
          <Picker.Item label="Select the Floor" value="" />
          {floorData?.map((floor) => (
            <Picker.Item key={floor._id} label={floor.name} value={floor._id} />
          ))}
        </Picker>

        <Text style={adminStyles.modelLabel}>
          Table seats<Text style={adminStyles.requiredStar}>*</Text>
        </Text>
        <TextInput
          style={adminStyles.modelInput}
          value={formData.seats}
          placeholder="Table Seats..."
          onChangeText={(text) => handleChange("seats", text, true)}
          min={1}
          required
        />

        <Pressable onPress={submitForm} style={adminStyles.modelButton}>
          <Text style={adminStyles.modelButtonText}>Add Table</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    floorData: state.floors.floorData,
  };
};

const mapDispatchToProps = {
  addTable,
  fetchFloorData,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddTables);
