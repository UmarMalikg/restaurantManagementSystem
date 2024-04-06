import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Pressable,
  Platform,
  Image,
  ImageBackground,
} from "react-native";
import { RadioButton } from "react-native-paper";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { connect } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { addUser } from "../redux/actions/userActions";
import { isWeb } from "../constants/stylesConstants";
import loginRegisterFormStyles from "./styles/loginRegisterPageStyle";
import defaultStyles from "../defaultStyles";

const Register = ({ addUser }) => {
  const navigation = useNavigation();

  const [formData, setFormData] = useState({
    name: "",
    userName: "",
    email: "",
    phNo: "",
    pswrd: "",
    dOB: "",
    gender: "male",
    nationalId: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  });

  const handleChange = (fieldName, value, isNumeric) => {
    const cleanedValue = isNumeric ? value.replace(/[^0-9]/g, "") : value;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [fieldName]: cleanedValue,
    }));
  };

  const [gender, setGender] = useState(formData.gender);
  const handleGenderChange = (value) => {
    setGender(value);
    setFormData({ ...formData, gender: value });
  };

  const [isDOBPickerVisible, setDOBPickerVisible] = useState(false);
  const handleBOBDateChange = (date) => {
    setDOBPickerVisible(false);
    if (date) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        dOB: date,
      }));
    }
  };
  const showDOBDatePicker = () => {
    setDOBPickerVisible(true);
  };
  const hideDatePicker = () => {
    setDOBPickerVisible(false);
  };

  const submitForm = () => {
    if (
      !formData.name ||
      !formData.userName ||
      !formData.email ||
      !formData.phNo ||
      !formData.pswrd ||
      !formData.nationalId
    ) {
      console.log("Please fill in all fields");
      alert("Please fill in all required fields");
      return;
    }

    const userData = {
      name: formData.name,
      userName: formData.userName,
      email: formData.email,
      phNo: formData.phNo,
      pswrd: formData.pswrd,
      nationalId: formData.nationalId,
      dOB: formData.dOB,
      gender: formData.gender,
      address: {
        street: formData.street,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        country: formData.country,
      },
    };

    // dispatch add user function
    addUser(userData);

    setFormData({
      name: "",
      userName: "",
      email: "",
      phNo: "",
      pswrd: "",
      dOB: "",
      gender: "male",
      nationalId: "",
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
    });
    navigation.navigate("SignIn");
  };

  return (
    <ImageBackground
      source={require("../../assets/images/background.jpg")}
      style={{
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
      }}
    >
      <View style={defaultStyles.container}>
        <View style={loginRegisterFormStyles.positioner}>
          <View style={loginRegisterFormStyles.formBox}>
            <ScrollView
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
            >
              <View>
                <View style={loginRegisterFormStyles.formHeader}>
                  <Text style={loginRegisterFormStyles.TitleText}>Sign Up</Text>
                </View>
                <View style={loginRegisterFormStyles.quote}>
                  <Text>Register yourself to enjoy the delecious meal</Text>
                </View>
                <View>
                  <View>
                    <TextInput
                      style={loginRegisterFormStyles.inputfield}
                      value={formData.name}
                      placeholder="Enter your full name..."
                      onChangeText={(text) => handleChange("name", text)}
                      required
                    />
                  </View>

                  <View>
                    <TextInput
                      style={loginRegisterFormStyles.inputfield}
                      value={formData.userName}
                      placeholder="Type the username..."
                      onChangeText={(text) => handleChange("userName", text)}
                      required
                    />
                  </View>

                  <View>
                    <TextInput
                      style={loginRegisterFormStyles.inputfield}
                      value={formData.email}
                      placeholder="Enter your email..."
                      onChangeText={(text) => handleChange("email", text)}
                      required
                    />
                  </View>

                  <View>
                    <TextInput
                      style={loginRegisterFormStyles.inputfield}
                      value={formData.phNo}
                      placeholder="Enter mobile phone number..."
                      onChangeText={(text) => handleChange("phNo", text, true)}
                      required
                    />
                  </View>

                  <View>
                    <TextInput
                      style={loginRegisterFormStyles.inputfield}
                      value={formData.pswrd}
                      placeholder="Enter the strong Passwword..."
                      onChangeText={(text) => handleChange("pswrd", text)}
                      secureTextEntry
                    />
                  </View>

                  <View>
                    <TextInput
                      style={loginRegisterFormStyles.inputfield}
                      value={formData.dOB}
                      placeholder="Enter your dOB..."
                      onChangeText={(text) => handleChange("dOB", text)}
                      required
                    />
                  </View>
                  <View style={defaultStyles.mrgH20}>
                    <Text style={{ fontSize: 18 }}>
                      Date of Birth
                      <Text style={{ fontSize: 18, color: "#f00" }}>*</Text>
                    </Text>

                    {isWeb ? (
                      <input
                        style={{
                          fontSize: 18,
                          borderWidth: 0,
                          borderBottomWidth: 1,
                          borderColor: "#000",
                          padding: 10,
                          backgroundColor: "transparent",
                        }}
                        type="date"
                        value={formData.dOB}
                        onChange={(e) => {
                          setFormData((prevFormData) => ({
                            ...prevFormData,
                            dOB: e.target.value,
                          }));
                        }}
                      />
                    ) : (
                      <View>
                        <View style={defaultStyles.rowSpacingFlex}>
                          <Text>
                            {formData.dOB
                              ? formData.dOB.toDateString()
                              : `Date of Birth...`}
                          </Text>

                          <Pressable onPress={showDOBDatePicker}>
                            <Image
                              style={{ width: 30, height: 30 }}
                              source={require("../../assets/images/datePicker.png")}
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
                  </View>

                  <View
                    style={[
                      defaultStyles.mrgH20,
                      defaultStyles.mrgT20,
                      {
                        flexDirection: "row",
                        alignItems: "center",
                      },
                    ]}
                  >
                    <Text style={{ fontSize: 18 }}>
                      Gender<Text>*</Text>
                    </Text>
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <RadioButton
                        style={{ fontSize: 18 }}
                        value="male"
                        status={gender === "male" ? "checked" : "unchecked"}
                        onPress={() => handleGenderChange("male")}
                      />
                      <Text style={{ fontSize: 18 }}>Male</Text>
                      <RadioButton
                        style={{ fontSize: 18 }}
                        value="female"
                        status={gender === "female" ? "checked" : "unchecked"}
                        onPress={() => handleGenderChange("female")}
                      />
                      <Text style={{ fontSize: 18 }}>Female</Text>
                      <RadioButton
                        style={{ fontSize: 18 }}
                        value="other"
                        status={gender === "other" ? "checked" : "unchecked"}
                        onPress={() => handleGenderChange("other")}
                      />
                      <Text style={{ fontSize: 18 }}>Other</Text>
                    </View>
                  </View>

                  <View>
                    <TextInput
                      style={loginRegisterFormStyles.inputfield}
                      value={formData.nationalId}
                      placeholder="Enter your National Id..."
                      onChangeText={(text) => handleChange("nationalId", text)}
                      required
                    />
                  </View>
                  <View>
                    <TextInput
                      style={loginRegisterFormStyles.inputfield}
                      value={formData.street}
                      placeholder="Street..."
                      onChangeText={(text) => handleChange("street", text)}
                      required
                    />
                  </View>

                  <View>
                    <TextInput
                      style={loginRegisterFormStyles.inputfield}
                      value={formData.city}
                      placeholder="City..."
                      onChangeText={(text) => handleChange("city", text)}
                      required
                    />
                  </View>

                  <View>
                    <TextInput
                      style={loginRegisterFormStyles.inputfield}
                      value={formData.state}
                      placeholder="State..."
                      onChangeText={(text) => handleChange("state", text)}
                      required
                    />
                  </View>

                  <View>
                    <TextInput
                      style={loginRegisterFormStyles.inputfield}
                      value={formData.zipCode}
                      placeholder="Zip Code..."
                      onChangeText={(text) => handleChange("zipCode", text)}
                      required
                    />
                  </View>

                  <View>
                    <TextInput
                      style={loginRegisterFormStyles.inputfield}
                      value={formData.country}
                      placeholder="Country..."
                      onChangeText={(text) => handleChange("country", text)}
                      required
                    />
                  </View>
                </View>

                <Pressable
                  style={loginRegisterFormStyles.loginRegisterButton}
                  onPress={submitForm}
                >
                  <Text style={loginRegisterFormStyles.loginRegisterButtonText}>
                    Register
                  </Text>
                </Pressable>
              </View>
            </ScrollView>
            <View style={loginRegisterFormStyles.alreadyAccount}>
              <Text>Already have an account? </Text>
              <Text
                style={{ fontWeight: "bold", color: "#00f" }}
                onPress={() => navigation.navigate("SignIn")}
              >
                Login
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const mapDispatchToProps = {
  addUser,
};
export default connect(null, mapDispatchToProps)(Register);
