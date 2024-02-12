import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Pressable,
  ImageBackground,
} from "react-native";
import { connect } from "react-redux";
import registrFormStyles from "./registerFormStyle";
import { useNavigation } from "@react-navigation/native";
import { addUser } from "../redux/actions/userActions";

const Register = ({ addUser }) => {
  const navigation = useNavigation();

  const [formData, setFormData] = useState({
    name: "",
    userName: "",
    email: "",
    phNo: "",
    pswrd: "",
    dOB: "",
    gender: "",
    nationalId: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  });

  const handleChange = (fieldName, value) => {
    setFormData({
      ...formData,
      [fieldName]: value,
    });
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
      gender: "",
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
      <View style={registrFormStyles.container}>
        <View style={registrFormStyles.positioner}>
          <View style={registrFormStyles.formBox}>
            <ScrollView
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
            >
              <View>
                <View style={registrFormStyles.formHeader}>
                  <Text style={registrFormStyles.formHeaderTitle}>
                    Registeration Form
                  </Text>
                </View>
                <View>
                  <View>
                    <TextInput
                      style={registrFormStyles.inputfield}
                      value={formData.name}
                      placeholder="Enter your full name..."
                      onChangeText={(text) => handleChange("name", text)}
                      required
                    />
                  </View>

                  <View>
                    <TextInput
                      style={registrFormStyles.inputfield}
                      value={formData.userName}
                      placeholder="Type the username..."
                      onChangeText={(text) => handleChange("userName", text)}
                      required
                    />
                  </View>

                  <View>
                    <TextInput
                      style={registrFormStyles.inputfield}
                      value={formData.email}
                      placeholder="Enter your email..."
                      onChangeText={(text) => handleChange("email", text)}
                      required
                    />
                  </View>

                  <View>
                    <TextInput
                      style={registrFormStyles.inputfield}
                      value={formData.phNo}
                      placeholder="Enter mobile phone number..."
                      onChangeText={(text) => handleChange("phNo", text)}
                      required
                    />
                  </View>

                  <View>
                    <TextInput
                      style={registrFormStyles.inputfield}
                      value={formData.pswrd}
                      placeholder="Enter the strong Passwword..."
                      onChangeText={(text) => handleChange("pswrd", text)}
                      secureTextEntry
                    />
                  </View>

                  <View>
                    <TextInput
                      style={registrFormStyles.inputfield}
                      value={formData.dOB}
                      placeholder="Enter your dOB..."
                      onChangeText={(text) => handleChange("dOB", text)}
                      required
                    />
                  </View>

                  <View>
                    <TextInput
                      style={registrFormStyles.inputfield}
                      value={formData.gender}
                      placeholder="Select your gender..."
                      onChangeText={(text) => handleChange("gender", text)}
                      required
                    />
                  </View>

                  <View>
                    <TextInput
                      style={registrFormStyles.inputfield}
                      value={formData.nationalId}
                      placeholder="Enter your National Id..."
                      onChangeText={(text) => handleChange("nationalId", text)}
                      required
                    />
                  </View>
                  <View>
                    <TextInput
                      style={registrFormStyles.inputfield}
                      value={formData.street}
                      placeholder="Street..."
                      onChangeText={(text) => handleChange("street", text)}
                      required
                    />
                  </View>

                  <View>
                    <TextInput
                      style={registrFormStyles.inputfield}
                      value={formData.city}
                      placeholder="City..."
                      onChangeText={(text) => handleChange("city", text)}
                      required
                    />
                  </View>

                  <View>
                    <TextInput
                      style={registrFormStyles.inputfield}
                      value={formData.state}
                      placeholder="State..."
                      onChangeText={(text) => handleChange("state", text)}
                      required
                    />
                  </View>

                  <View>
                    <TextInput
                      style={registrFormStyles.inputfield}
                      value={formData.zipCode}
                      placeholder="Zip Code..."
                      onChangeText={(text) => handleChange("zipCode", text)}
                      required
                    />
                  </View>

                  <View>
                    <TextInput
                      style={registrFormStyles.inputfield}
                      value={formData.country}
                      placeholder="Country..."
                      onChangeText={(text) => handleChange("country", text)}
                      required
                    />
                  </View>
                </View>

                <Pressable
                  style={registrFormStyles.registerButton}
                  onPress={submitForm}
                >
                  <Text style={registrFormStyles.registerButtonText}>
                    Register
                  </Text>
                </Pressable>
              </View>
            </ScrollView>
            <View style={registrFormStyles.alreadyAccount}>
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
