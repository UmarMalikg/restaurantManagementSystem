import { View, Text, Pressable } from "react-native";
import React, { useEffect } from "react";
import { api } from "../../api/api";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { fetchCategoryData } from "../../redux/actions/categoryActions";
import { connect } from "react-redux";

const Home = ({ fetchCategoryData, categoryData }) => {
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

  useEffect(() => {
    fetchCategoryData();
  }, [fetchCategoryData]);
  console.log(categoryData);
  return (
    <View>
      <Text>Home</Text>
      <Pressable onPress={() => navigation.navigate("SignIn")}>
        <Text>Sign In</Text>
      </Pressable>
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    categoryData: state.categories.categoryData,
  };
};

const mapDispatchToProps = {
  fetchCategoryData,
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
