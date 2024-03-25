// some necessary imports for use
import { Pressable, View, Text } from "react-native";

// react and useeffect to use the React
import React, { useEffect } from "react";

// import for creating the routes for different pages
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// imported components for admin
import SideBar from "./components/SideBar";
import adminStyles from "../styles/adminStyles";
import Dashboard from "./Dashboard";
import NavBar from "./components/NavBar";
import Products from "./Products";
import Employees from "./Employees";
import OrderLists from "./OrderLists";
import AddProducts from "./models/AddProducts";
import AddEmployees from "./models/AddEmployees";
import Tables from "./Tables";
import Categories from "./Categories";
import AddCategories from "./models/AddCategories";
import AddTables from "./models/AddTables";
import UpdateCategories from "./models/UpdateCategories";
import UpdateTables from "./models/UpdateTables";

// imported api
import { api } from "../../api/api";

// imprted axios to fetch the api
import axios from "axios";

// imported useNavigation to navigate between pages
import { useNavigation } from "@react-navigation/native";

// imported context to fetch the data required data
import { useAppContext } from "../../context/States";

// created stack variable for putting the pages in a stack
const Stack = createNativeStackNavigator();

// component stated
const Admin = () => {
  // fetched the logind employee
  const { employee } = useAppContext();

  // navigation variable to navigate between screens
  const navigation = useNavigation();

  // a check if the user is logined or not
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

  // returning the component
  return (
    <View style={adminStyles.container}>
      {/* navbar and sideBar will be rendered outside the stack as they required in every screen */}
      <NavBar />
      <SideBar />

      {/* stack container */}
      <Stack.Navigator
        initialRouteName="Dashboard"
        screenOptions={{ headerShown: false }}
      >
        {/* a stack group fo pages */}
        <Stack.Group>
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name="Employees" component={Employees} />
          <Stack.Screen name="Products" component={Products} />
          <Stack.Screen name="OrderLists" component={OrderLists} />
          <Stack.Screen name="Categories" component={Categories} />
          <Stack.Screen name="Tables" component={Tables} />
        </Stack.Group>

        {/* a stack group for modals */}
        <Stack.Group
          screenOptions={{
            presentation: "transparentModal",
          }}
        >
          <Stack.Screen name="Add Product" component={AddProducts} />
          <Stack.Screen name="Add Employee" component={AddEmployees} />
          <Stack.Screen name="Add Category" component={AddCategories} />
          <Stack.Screen name="Add Table" component={AddTables} />
          <Stack.Screen name="Update Category" component={UpdateCategories} />
          <Stack.Screen name="Update Table" component={UpdateTables} />
        </Stack.Group>
      </Stack.Navigator>
    </View>
  );
  /* (
    /*<View>
      <Pressable onPress={() => navigation.navigate("SignIn")}>
        <Text>Please Login</Text>
      </Pressable>
    </View>
  // )*/
};

export default Admin;
