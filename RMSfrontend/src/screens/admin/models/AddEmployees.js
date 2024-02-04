import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Picker,
  ScrollView,
} from "react-native";
import { connect } from "react-redux";
import { addEmployee } from "../../../redux/actions/employeeActions";
import { useNavigation } from "@react-navigation/native";
import adminStyles from "../styles/style";

const AddEmployee = ({ addEmployee }) => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    nationalID: "",
    pswrd: "",
    photo: null,
    salary: "",
    userName: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    email: "",
    phone: "",
    isAdmin: false,
    isWaiter: false,
    isCachier: false,
    isKitchenManager: false,
    isReceptionist: false,
    joiningDate: "",
    emergencyContact: {
      name: "",
      relationship: "",
      phone: "",
    },
  });

  const handleChange = (fieldName, value) => {
    setFormData({
      ...formData,
      [fieldName]: value,
    });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      setFormData({
        ...formData,
        photo: file,
      });
    }
  };

  const submitForm = () => {
    // Check if all required fields are filled
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.dateOfBirth ||
      !formData.gender ||
      !formData.nationalID ||
      !formData.pswrd ||
      !formData.photo ||
      !formData.salary ||
      !formData.userName
      // !formData.street ||
      // !formData.city ||
      // !formData.state ||
      // !formData.zipCode ||
      // !formData.country ||
      // !formData.email ||
      // !formData.phone ||
      // !formData.joiningDate
    ) {
      console.log("Please fill in all fields");
      alert("Please fill in all required fields");
      return;
    }

    // Pass an object with properties for each employee field to addEmployee
    const employeeData = {
      personalInfo: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        dateOfBirth: formData.dateOfBirth,
        gender: formData.gender,
        nationalID: formData.nationalID,
        email: formData.email,
        phone: formData.phone,
      },
      pswrd: formData.pswrd,
      photo: formData.photo,
      salary: formData.salary,
      userName: formData.userName,
      address: {
        street: formData.street,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        country: formData.country,
      },
      position: formData.position,
      isAdmin: formData.isAdmin,
      isWaiter: formData.isWaiter,
      isCachier: formData.isCachier,
      isKitchenManager: formData.isKitchenManager,
      isReceptionist: formData.isReceptionist,
      joiningDate: formData.joiningDate,
      emergencyContact: formData.emergencyContact,
    };

    // Dispatch the addEmployee action
    addEmployee(employeeData);

    // Optionally, you can reset the form after submission
    setFormData({
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      gender: "",
      nationalID: "",
      pswrd: "",
      photo: null,
      salary: "",
      userName: "",
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
      email: "",
      phone: "",
      isAdmin: false,
      isWaiter: false,
      isCachier: false,
      isKitchenManager: false,
      isReceptionist: false,
      joiningDate: "",
      emergencyContact: {
        name: "",
        relationship: "",
        phone: "",
      },
    });
  };

  return (
    <View style={adminStyles.model}>
      <Text style={adminStyles.modelHeader}>Add New Employee</Text>
      <TouchableOpacity
        style={adminStyles.modelCloser}
        onPress={() => navigation.navigate("Employees")}
      >
        <Text style={adminStyles.modelCloserText}>X</Text>
      </TouchableOpacity>
      <ScrollView
        style={adminStyles.scroller}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        {/* Add employee fields here similar to the Add Product form */}
        <Text style={adminStyles.modelLabel}>
          First Name<Text style={adminStyles.requiredStar}>*</Text>
        </Text>
        <TextInput
          style={adminStyles.modelInput}
          value={formData.firstName}
          placeholder="First Name..."
          onChangeText={(text) => handleChange("firstName", text)}
          required
        />

        <Text style={adminStyles.modelLabel}>
          Last Name<Text style={adminStyles.requiredStar}>*</Text>
        </Text>
        <TextInput
          style={adminStyles.modelInput}
          value={formData.lastName}
          placeholder="Last Name..."
          onChangeText={(text) => handleChange("lastName", text)}
          required
        />

        <Text style={adminStyles.modelLabel}>
          Date of Birth<Text style={adminStyles.requiredStar}>*</Text>
        </Text>
        <TextInput
          type="date"
          style={adminStyles.modelInput}
          value={formData.dateOfBirth}
          placeholder="Date of Birth..."
          onChangeText={(text) => handleChange("dateOfBirth", text)}
        />

        <Text style={adminStyles.modelLabel}>
          Gender<Text style={adminStyles.requiredStar}>*</Text>
        </Text>
        <TextInput
          style={adminStyles.modelInput}
          value={formData.gender}
          placeholder="Gender..."
          onChangeText={(text) => handleChange("gender", text)}
        />

        <Text style={adminStyles.modelLabel}>
          National ID<Text style={adminStyles.requiredStar}>*</Text>
        </Text>
        <TextInput
          style={adminStyles.modelInput}
          value={formData.nationalID}
          placeholder="National ID..."
          onChangeText={(text) => handleChange("nationalID", text)}
        />
        <Text style={adminStyles.modelLabel}>
          Passward<Text style={adminStyles.requiredStar}>*</Text>
        </Text>
        <TextInput
          style={adminStyles.modelInput}
          value={formData.pswrd}
          placeholder="Passward..."
          onChangeText={(text) => handleChange("pswrd", text)}
        />

        <Text style={adminStyles.modelLabel}>
          Photo<Text style={adminStyles.requiredStar}>*</Text>
        </Text>
        <input
          style={adminStyles.modelInput}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          required
        />
        {formData.photo && (
          <Image
            source={{ uri: URL.createObjectURL(formData.photo) }}
            style={{ width: 100, height: 100 }}
          />
        )}

        <Text style={adminStyles.modelLabel}>
          Salary<Text style={adminStyles.requiredStar}>*</Text>
        </Text>
        <TextInput
          style={adminStyles.modelInput}
          value={formData.salary}
          placeholder="Salary..."
          onChangeText={(text) => handleChange("salary", text)}
          keyboardType="numeric"
        />

        <Text style={adminStyles.modelLabel}>
          User Name<Text style={adminStyles.requiredStar}>*</Text>
        </Text>
        <TextInput
          style={adminStyles.modelInput}
          value={formData.userName}
          placeholder="User Name..."
          onChangeText={(text) => handleChange("userName", text)}
        />

        <Text style={adminStyles.modelLabel}>
          Street<Text style={adminStyles.requiredStar}>*</Text>
        </Text>
        <TextInput
          style={adminStyles.modelInput}
          value={formData.street}
          placeholder="Street..."
          onChangeText={(text) => handleChange("street", text)}
        />

        <Text style={adminStyles.modelLabel}>
          City<Text style={adminStyles.requiredStar}>*</Text>
        </Text>
        <TextInput
          style={adminStyles.modelInput}
          value={formData.city}
          placeholder="City..."
          onChangeText={(text) => handleChange("city", text)}
        />

        <Text style={adminStyles.modelLabel}>
          State<Text style={adminStyles.requiredStar}>*</Text>
        </Text>
        <TextInput
          style={adminStyles.modelInput}
          value={formData.state}
          placeholder="State..."
          onChangeText={(text) => handleChange("state", text)}
        />

        <Text style={adminStyles.modelLabel}>
          Zip Code<Text style={adminStyles.requiredStar}>*</Text>
        </Text>
        <TextInput
          style={adminStyles.modelInput}
          value={formData.zipCode}
          placeholder="Zip Code..."
          onChangeText={(text) => handleChange("zipCode", text)}
        />

        <Picker
          style={adminStyles.modelInput}
          selectedValue={null} // Set selectedValue to null initially, as no default role is selected
          onValueChange={(itemValue) => {
            // Handle the selected role and set corresponding state values
            setFormData({
              ...formData,
              isAdmin: itemValue === "isAdmin", // Set isAdmin to true when "Admin" is selected
              isWaiter: itemValue === "isWaiter",
              isCachier: itemValue === "isCachier",
              isKitchenManager: itemValue === "isKitchenManager",
              isReceptionist: itemValue === "isReceptionist",
              // ... other state values
            });
          }}
        >
          <Picker.Item label="Select Role" value={null} />
          <Picker.Item label="Admin" value="isAdmin" />
          <Picker.Item label="Waiter" value="isWaiter" />
          <Picker.Item label="Cahier" value="isCachier" />
          <Picker.Item label="Kitchen Manager" value="isKitchenManager" />
          <Picker.Item label="Receptionist" value="isReceptionist" />
          {/* ... other roles */}
        </Picker>

        <Text style={adminStyles.modelLabel}>
          Country<Text style={adminStyles.requiredStar}>*</Text>
        </Text>
        <TextInput
          style={adminStyles.modelInput}
          value={formData.country}
          placeholder="Country..."
          onChangeText={(text) => handleChange("country", text)}
        />

        <Text style={adminStyles.modelLabel}>
          Email<Text style={adminStyles.requiredStar}>*</Text>
        </Text>
        <TextInput
          style={adminStyles.modelInput}
          value={formData.email}
          placeholder="Email..."
          onChangeText={(text) => handleChange("email", text)}
        />

        <Text style={adminStyles.modelLabel}>
          Phone<Text style={adminStyles.requiredStar}>*</Text>
        </Text>
        <TextInput
          style={adminStyles.modelInput}
          value={formData.phone}
          placeholder="Phone..."
          onChangeText={(text) => handleChange("phone", text)}
          keyboardType="numeric"
        />

        <Text style={adminStyles.modelLabel}>
          Joining Date<Text style={adminStyles.requiredStar}>*</Text>
        </Text>
        <TextInput
          style={adminStyles.modelInput}
          value={formData.joiningDate}
          placeholder="Joining Date..."
          onChangeText={(text) => handleChange("joiningDate", text)}
        />
        <TouchableOpacity onPress={submitForm} style={adminStyles.modelButton}>
          <Text style={adminStyles.modelButtonText}>Add Product</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const mapDispatchToProps = {
  addEmployee,
};

export default connect(null, mapDispatchToProps)(AddEmployee);
