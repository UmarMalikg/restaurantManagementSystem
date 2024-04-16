import { View, Text, Pressable } from "react-native";
import React from "react";
import updateOrderStyle from "../../styles/updateOrderStyle";
import { useNavigation } from "@react-navigation/native";
import UpdateOrderPlacement from "./components/UpdateOrderPlacement";
import ProductCategory from "./components/ProductCategory";

const UpdateOrder = ({ route }) => {
  const navigation = useNavigation();
  const { orderId } = route.params;
  return (
    <View style={updateOrderStyle.page}>
      <View style={updateOrderStyle.backButtonPosition}>
        <Pressable onPress={() => navigation.goBack()}>
          <Text>Go Back</Text>
        </Pressable>
      </View>
      <ProductCategory />
      <UpdateOrderPlacement orderId={orderId} />
    </View>
  );
};

export default UpdateOrder;
