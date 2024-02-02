import React from "react";
import { View, Text, ScrollView } from "react-native";
import waiterStyles from "../styles/style";
import { Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

const Header = () => {
  const navigation = useNavigation();
  return (
    // <ScrollView>
    <View style={waiterStyles.header}>
      <Button
        onPress={() => navigation.navigate("Admin")}
        title="Go to admin page"
      />
    </View>
    // </ScrollView>
  );
};

export default Header;
