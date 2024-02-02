// Products.js
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchProductData } from "../../../../redux/actions/productAction";
import {
  increaseQuantity,
  decreaseQuantity,
} from "../../../../redux/actions/quantityActions";
import { Text, View, FlatList, Image, TouchableOpacity } from "react-native";
import waiterStyles from "../../styles/style";

const numColumns = 3; // Number of columns

const Products = ({
  productData,
  fetchProductData,
  selectedCategory,
  increaseQuantity,
  decreaseQuantity,
  quantity,
}) => {
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
                  uri: `http://localhost:8080/${item.img.replace(/\\/g, "/")}`,
                }}
                style={{ width: 120, height: 120, borderRadius: 120 }}
                onError={(error) =>
                  console.error(
                    `Error loading image: ${error.nativeEvent.error}`
                  )
                }
              />
            </View>
            <View style={waiterStyles.productDetail}>
              <View>
                <Text style={waiterStyles.productName}>{item.name}</Text>
              </View>
              <View style={waiterStyles.productDetailItem}>
                <Text>Price</Text>
                <Text>{item.price} PKR</Text>
              </View>
              <View style={waiterStyles.productDetailItem}>
                <View>
                  <Text>Quantity</Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <TouchableOpacity onPress={() => decreaseQuantity(item._id)}>
                    <Text
                      style={{
                        borderWidth: 1,
                        borderColor: "#ddd",
                        padding: 2,
                      }}
                    >
                      -{" "}
                    </Text>
                  </TouchableOpacity>
                  <Text
                    style={{ borderWidth: 1, borderColor: "#ddd", padding: 2 }}
                  >
                    {" "}
                    {quantity[item._id] || 1}{" "}
                  </Text>
                  <TouchableOpacity onPress={() => increaseQuantity(item._id)}>
                    <Text
                      style={{
                        borderWidth: 1,
                        borderColor: "#ddd",
                        padding: 2,
                      }}
                    >
                      {" "}
                      +{" "}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={waiterStyles.productCartButton}>
              <TouchableOpacity>
                <Text style={waiterStyles.colorWhite}>Add to Cart</Text>
              </TouchableOpacity>
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
