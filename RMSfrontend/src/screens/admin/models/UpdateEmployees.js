import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  Platform,
  Picker,
  ScrollView,
} from "react-native";
import { connect } from "react-redux";
import {
  getEmployeeById,
  updateEmployee,
} from "../../../redux/actions/employeeActions";
import { useNavigation } from "@react-navigation/native";
import adminStyles from "../../styles/adminStyles";

const UpdateEmployees = ({
  route,
  getEmployeeById,
  updateEmployee,
  selectedEmployee,
}) => {
  const { employeeId } = route.params;
  const navigation = useNavigation();

  // defining the fields required for the submission of form
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "male",
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

  // as gender field is taken by RadioButtons so defined here
  const [gender, setGender] = useState(formData.gender);

  useEffect(() => {
    if (employeeId) {
      getEmployeeById(employeeId);
    }
  }, [getEmployeeById, employeeId]);

  useEffect(() => {
    if (selectedEmployee) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        firstName: selectedEmployee.personalInfo.firstName,
        lastName: selectedEmployee.personalInfo.lastName,
        dateOfBirth: selectedEmployee.personalInfo.dateOfBirth,
        gender: selectedEmployee.personalInfo.gender,
        nationalID: selectedEmployee.personalInfo.nationalID,
        pswrd: selectedEmployee.pswrd,
        photo: selectedEmployee.photo,
        salary: selectedEmployee.salary,
        userName: selectedEmployee.userName,
        street: selectedEmployee.address.street,
        city: selectedEmployee.address.city,
        state: selectedEmployee.address.state,
        zipCode: selectedEmployee.address.zipCode,
        country: selectedEmployee.address.country,
        email: selectedEmployee.personalInfo.email,
        phone: selectedEmployee.personalInfo.phone,
        isAdmin: selectedEmployee.isAdmin,
        isWaiter: selectedEmployee.isWaiter,
        isCachier: selectedEmployee.isCachier,
        isKitchenManager: selectedEmployee.isKitchenManager,
        isReceptionist: selectedEmployee.isReceptionist,
        joiningDate: selectedEmployee.joiningDate,
        emergencyContact: {
          name: selectedEmployee.emergencyContact.name,
          relationship: selectedEmployee.emergencyContact.relationship,
          phone: selectedEmployee.emergencyContact.phone,
        },
      }));
    }
  }, [selectedEmployee]);

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
        photo: file,
      });
    }
  };

  // defining the for submission function
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
    updateEmployee(employeeId, employeeData);

    // Optionally, you can reset the form after submission
    setFormData({
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      gender: "male",
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
    console.log("updated");
    navigation.navigate("Employees");
  };

  //Component
  return (
    <View style={adminStyles.model}>
      <Text style={adminStyles.modelHeader}>Add New Employee</Text>
      <Pressable
        style={adminStyles.modelCloser}
        onPress={() => navigation.navigate("Employees")}
      >
        <Text style={adminStyles.modelCloserText}>X</Text>
      </Pressable>
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
          <>
            {formData.photo === selectedEmployee.photo ? (
              <Image
                source={{
                  uri: `http://localhost:8080/${selectedEmployee.photo.replace(
                    /\\/g,
                    "/"
                  )}`,
                }}
                style={{ width: 100, height: 100 }}
              />
            ) : (
              <Image
                source={{ uri: URL.createObjectURL(formData.photo) }}
                style={{ width: 100, height: 100 }}
              />
            )}
          </>
        )}

        <Text style={adminStyles.modelLabel}>
          Salary<Text style={adminStyles.requiredStar}>*</Text>
        </Text>
        <TextInput
          style={adminStyles.modelInput}
          value={formData.salary}
          placeholder="Salary..."
          onChangeText={(text) => handleChange("salary", text, true)}
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
          onChangeText={(text) => handleChange("zipCode", text, true)}
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
          onChangeText={(text) => handleChange("phone", text, true)}
          keyboardType="numeric"
        />
        <Pressable onPress={submitForm} style={adminStyles.modelButton}>
          <Text style={adminStyles.modelButtonText}>Add Employee</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    selectedEmployee: state.employees.selectedEmployee,
  };
};

const mapDispatchToProps = {
  getEmployeeById,
  updateEmployee,
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateEmployees);
