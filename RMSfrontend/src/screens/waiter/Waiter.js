import React, { useEffect } from "react";
import Header from "./components/Header";
import Home from "./Home";
import { View } from "react-native";
import waiterStyles from "./styles/style";
import { api } from "../../api/api";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const Waiter = () => {
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
    <View style={waiterStyles.container}>
      <Header />
      <Home />
    </View>
  );
};

export default Waiter;
