import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  Platform,
  Picker,
  ScrollView,
  Button,
} from "react-native";
import { connect } from "react-redux";
import { addEmployee } from "../../../redux/actions/employeeActions";
import { useNavigation } from "@react-navigation/native";
import adminStyles from "../../styles/adminStyles";
import { RadioButton } from "react-native-paper";
import DateTimePickerModal from "react-native-modal-datetime-picker";
let isWeb = Platform.OS === "web";
import * as ImagePicker from "expo-image-picker";

const AddEmployee = ({ addEmployee }) => {
  const navigation = useNavigation();

  const [image, setImage] = useState(null);

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

  // defining the function resposible for handling the change in gender field
  const handleGenderChange = (value) => {
    setGender(value);
    setFormData({ ...formData, gender: value });
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setFormData({
        ...formData,
        photo: result.assets[0].uri,
      });
    }
  };

  // defining the states resonsible for picking the date in android
  const [isDOBPickerVisible, setDOBPickerVisible] = useState(false);
  const [isJoningDatePickerVisible, setJoningDatePickerVisible] =
    useState(false);

  // defining the fuctions responsible for changing the date
  const handleBOBDateChange = (date) => {
    setDOBPickerVisible(false);
    if (date) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        dateOfBirth: date,
      }));
    }
  };

  const handleJoiningDateChange = (date) => {
    setJoningDatePickerVisible(false);
    if (date) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        joiningDate: date,
      }));
    }
  };

  // defining the functions resposible for displaying the date picker modal
  const showJoiningDatePicker = () => {
    setJoningDatePickerVisible(true);
  };
  const showDOBDatePicker = () => {
    setDOBPickerVisible(true);
  };

  // defining the fuction resposible for hiding the date picker modal
  const hideDatePicker = () => {
    setDOBPickerVisible(false);
    setJoningDatePickerVisible(false);
  };

  //definig the function resposible for chang of values in the fields
  // here isNumeric is defined for those fields that can only accepts the numeric value
  const handleChange = (fieldName, value, isNumeric) => {
    const cleanedValue = isNumeric ? value.replace(/[^0-9]/g, "") : value;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [fieldName]: cleanedValue,
    }));
  };

  console.log(image);

  // defining the for submission function
  const submitForm = () => {
    // Check if all required fields are filled
    // console.log(formData.photo);
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
      photo: image,
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

        {isWeb ? (
          <input
            type="date"
            style={adminStyles.modelInput}
            value={formData.dateOfBirth}
            onChange={(e) => {
              setFormData((prevFormData) => ({
                ...prevFormData,
                dateOfBirth: e.target.value,
              }));
            }}
          />
        ) : (
          <View>
            <View
              style={[
                adminStyles.modelInput,
                {
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                },
              ]}
            >
              <Text>
                {formData.dateOfBirth
                  ? formData.dateOfBirth.toDateString()
                  : `Date of Birth...`}
              </Text>

              <Pressable onPress={showDOBDatePicker}>
                <Image
                  style={{ width: 30, height: 30 }}
                  source={require("../../../../assets/images/datePicker.png")}
                />
              </Pressable>
            </View>
            <DateTimePickerModal
              isVisible={isDOBPickerVisible}
              mode="date"
              onConfirm={handleBOBDateChange}
              onCancel={hideDatePicker}
            />
          </View>
        )}

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={adminStyles.modelLabel}>
            Gender<Text style={adminStyles.requiredStar}>*</Text>
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <RadioButton
              value="male"
              status={gender === "male" ? "checked" : "unchecked"}
              onPress={() => handleGenderChange("male")}
            />
            <Text>Male</Text>
            <RadioButton
              value="female"
              status={gender === "female" ? "checked" : "unchecked"}
              onPress={() => handleGenderChange("female")}
            />
            <Text>Female</Text>
            <RadioButton
              value="other"
              status={gender === "other" ? "checked" : "unchecked"}
              onPress={() => handleGenderChange("other")}
            />
            <Text>Other</Text>
          </View>
        </View>

        <Text style={adminStyles.modelLabel}>
          National ID<Text style={adminStyles.requiredStar}>*</Text>
        </Text>
        <TextInput
          style={adminStyles.modelInput}
          value={formData.nationalID}
          placeholder="National ID..."
          onChangeText={(text) => handleChange("nationalID", text, true)}
        />
        <Text style={adminStyles.modelLabel}>
          Passward<Text style={adminStyles.requiredStar}>*</Text>
        </Text>
        <TextInput
          style={adminStyles.modelInput}
          value={formData.pswrd}
          placeholder="Passward..."
          onChangeText={(text) => handleChange("pswrd", text)}
          secureTextEntry
        />

        <Text style={adminStyles.modelLabel}>
          Photo<Text style={adminStyles.requiredStar}>*</Text>
        </Text>
        <Button title="Pick an image from camera roll" onPress={pickImage} />
        {image && formData.photo && (
          <Image source={{ uri: image }} style={{ width: 100, height: 100 }} />
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

        <Text style={adminStyles.modelLabel}>
          Joining Date<Text style={adminStyles.requiredStar}>*</Text>
        </Text>
        {isWeb ? (
          <input
            type="date"
            style={adminStyles.modelInput}
            value={formData.joiningDate}
            onChange={(e) => {
              setFormData((prevFormData) => ({
                ...prevFormData,
                joiningDate: e.target.value,
              }));
            }}
          />
        ) : (
          <View>
            <View
              style={[
                adminStyles.modelInput,
                {
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                },
              ]}
            >
              <Text>
                {formData.joiningDate
                  ? formData.joiningDate.toDateString()
                  : `Date of Birth...`}
              </Text>

              <Pressable onPress={showJoiningDatePicker}>
                <Image
                  style={{ width: 30, height: 30 }}
                  source={require("../../../../assets/images/datePicker.png")}
                />
              </Pressable>
            </View>
            <DateTimePickerModal
              isVisible={isJoningDatePickerVisible}
              mode="date"
              onConfirm={handleJoiningDateChange}
              onCancel={hideDatePicker}
            />
          </View>
        )}
        <Pressable onPress={submitForm} style={adminStyles.modelButton}>
          <Text style={adminStyles.modelButtonText}>Add Employee</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
};

const mapDispatchToProps = {
  addEmployee,
};

export default connect(null, mapDispatchToProps)(AddEmployee);
