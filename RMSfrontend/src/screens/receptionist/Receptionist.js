import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { api } from "../../api/api";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const Receptionist = () => {
  const navigation = useNavigation();

  axios.defaults.withCredentials = true;
  useEffect(() => {
    const fetchToken = async () => {
      try {
        const res = await axios.get(`${api}/userAuth`);
        console.log("Server Response:", res.data); // Log the response
        if (!res.data.valid) {
          navigation.navigate("SignIn");
        }
      } catch (err) {
        console.error("Error from Server:", err); // Log the error
      }
    };

    fetchToken();
  }, [navigation]);
  return (
    <View>
      <Text>Receptionist</Text>
    </View>
  );
};

export default Receptionist;
