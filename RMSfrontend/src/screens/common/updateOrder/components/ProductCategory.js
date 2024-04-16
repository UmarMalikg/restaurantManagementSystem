import { View, Text } from "react-native";
import React from "react";
import updateOrderStyle from "../../../styles/updateOrderStyle";
import CategoryButtons from "../../../waiter/components/elements/CategoryButtons";
import ProductsUpdate from "./elements/ProductsUpdate";

const ProductCategory = () => {
  return (
    <View style={updateOrderStyle.updateProductCategoryPosition}>
      <CategoryButtons />
      <ProductsUpdate />
    </View>
  );
};

export default ProductCategory;
