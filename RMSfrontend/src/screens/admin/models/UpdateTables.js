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
import { updateTable, getTableById } from "../../../redux/actions/tableActions";
import { fetchFloorData } from "../../../redux/actions/floorActions";

const UpdateTables = ({
  route,
  fetchFloorData,
  floorData,
  selectedTable,
  getTableById,
  updateTable,
}) => {
  const { tableId } = route.params;
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

  useEffect(() => {
    if (tableId) {
      getTableById(tableId);
    }
  }, [getTableById, tableId]);

  useEffect(() => {
    if (selectedTable) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        name: selectedTable.name,
        floor: selectedTable.floor,
        seats: selectedTable.seats,
      }));
    }
  }, [selectedTable]);

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
    updateTable(tableId, tableData);
    console.log("updated", tableData);
    navigation.navigate("Tables");

    // Optionally, you can reset the form after submission
    setFormData({
      name: "",
      floor: "",
      seats: 4,
    });
  };

  if (!selectedTable) {
    return <Text>Loading...</Text>;
  }

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
    selectedTable: state.tables.selectedTable,
  };
};

const mapDispatchToProps = {
  updateTable,
  fetchFloorData,
  getTableById,
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateTables);
