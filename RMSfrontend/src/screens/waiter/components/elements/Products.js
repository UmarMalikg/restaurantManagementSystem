// Products.js
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchProductData } from "../../../../redux/actions/productAction";
import {
  increaseQuantity,
  decreaseQuantity,
} from "../../../../redux/actions/quantityActions";
import { Text, View, FlatList, Image, Pressable } from "react-native";
import waiterStyles from "../../../styles/waiterStyles";
import { useAppContext } from "../../../../context/States";

const numColumns = 5; // Number of columns

const Products = ({
  productData,
  fetchProductData,
  selectedCategory,
  increaseQuantity,
  decreaseQuantity,
  quantity,
}) => {
  const { employee, updateItemsForOrder } = useAppContext();
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    fetchProductData();
  }, [fetchProductData]);

  useEffect(() => {
    // Filter products based on the selected category
    if (selectedCategory) {
      const filtered = productData.filter(
        (product) => product.category === selectedCategory
      );
      setFilteredProducts(filtered);
    } else {
      // If no category is selected, show all products
      setFilteredProducts(productData);
    }
  }, [selectedCategory, productData]);

  const handleAddItemsToOrder = (item, qty) => {
    if (employee) {
      updateItemsForOrder(item, qty); // Call the updateOrderItems function with item and qty
    } else {
      alert("Please Login before taking order");
    }
  };

  return (
    <View style={waiterStyles.products}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        numColumns={numColumns}
        renderItem={({ item }) => (
          <View style={[waiterStyles.product, { flex: 1 / numColumns }]}>
            <View style={waiterStyles.productImage}>
              <Image
                source={{
                  uri: `${item.img}`,
                }}
                style={{ width: "100%", aspectRatio: 1, borderRadius: 10 }}
                onError={(error) =>
                  console.error(
                    `Error loading image: ${error.nativeEvent.error}`
                  )
                }
              />
            </View>
            <View style={waiterStyles.productDetail}>
              <View>
                <Text
                  style={[waiterStyles.productName, { textAlign: "center" }]}
                >
                  {item.name}
                </Text>
              </View>
              <View>
                <Text style={{ textAlign: "center" }}>Rs. {item.price}</Text>
              </View>

              <View>
                <View
                  style={[
                    waiterStyles.productDetailItem,
                    { justifyContent: "center" },
                  ]}
                >
                  <Pressable
                    style={waiterStyles.qtyButtons}
                    onPress={() => decreaseQuantity(item._id)}
                  >
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontSize: 18,
                        color: "#fff",
                      }}
                    >
                      &minus;
                    </Text>
                  </Pressable>
                  <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                    {" "}
                    {quantity[item._id] || 1}{" "}
                  </Text>
                  <Pressable
                    style={waiterStyles.qtyButtons}
                    onPress={() => increaseQuantity(item._id)}
                  >
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontSize: 18,
                        color: "#fff",
                      }}
                    >
                      +
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>
            <View style={waiterStyles.productCartButton}>
              <Pressable
                onPress={() =>
                  handleAddItemsToOrder(item._id, quantity[item._id] || 1)
                }
              >
                <Text style={waiterStyles.colorWhite}>Add</Text>
              </Pressable>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    productData: state.products.productData,
    selectedCategory: state.categories.selectedCategory,
    quantity: state.qty,
  };
};

const mapDispatchToProps = {
  fetchProductData,
  increaseQuantity,
  decreaseQuantity,
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);
