import React, { useState, useEffect } from "react";
import { Image, ScrollView, Text, Pressable, View } from "react-native";
import waiterStyles from "../styles/style";
import { useAppContext } from "../../../context/States";
import { connect } from "react-redux";
import { fetchProductData } from "../../../redux/actions/productAction";
import { addOrder } from "../../../redux/actions/orderActions";
import { useNavigation } from "@react-navigation/native";
import { fetchTableData } from "../../../redux/actions/tableActions";

const OrderPlacement = ({
  fetchProductData,
  fetchTableData,
  tableData,
  productData,
  addOrder,
}) => {
  useEffect(() => {
    fetchProductData();
    fetchTableData();
  }, [fetchProductData, fetchTableData]);

  const navigation = useNavigation();

  const {
    addedItemsForOrder,
    employee,
    selectedTable,
    updateItemsForOrder,
    setAddedItemsforOrder,
    setSelectedTable,
  } = useAppContext();

  const emptyItemIndex = addedItemsForOrder.find(
    (item) => item.item === "" && item.qty === ""
  );

  const [totalCharges, setTotalCharges] = useState(0);

  const priceCalculator = () => {
    let itemCharges = 0;
    addedItemsForOrder.forEach((item) => {
      const product = productData.find((p) => p._id === item.item);
      if (product) {
        itemCharges += product.price * item.qty;
      }
    });
    setTotalCharges(itemCharges);
  };

  const quantityIncrease = (productId) => {
    // Find if the item already exists in addedItemsForOrder
    const existingItem = addedItemsForOrder.find(
      (item) => item.item === productId
    );

    if (existingItem) {
      // If the item exists, update its quantity
      const updatedQty = existingItem.qty + 1;
      updateItemsForOrder(productId, updatedQty);
      priceCalculator(); // Recalculate the total charges
    } else {
      // If the item doesn't exist, add it with quantity 1
      updateItemsForOrder(productId, 1);
      priceCalculator(); // Recalculate the total charges
    }
  };

  const quantityDecrease = (productId) => {
    // Find if the item already exists in addedItemsForOrder
    const existingItem = addedItemsForOrder.find(
      (item) => item.item === productId
    );

    if (existingItem && existingItem.qty > 1) {
      // If the item exists and quantity is greater than 1, decrease its quantity
      const updatedQty = existingItem.qty - 1;
      updateItemsForOrder(productId, updatedQty);
      priceCalculator(); // Recalculate the total charges
    }
  };

  useEffect(() => {
    priceCalculator();
  }, [addedItemsForOrder, productData]);

  const selectTable = () => {
    employee ? navigation.navigate("Tables") : alert("Login first");
  };

  const submitOrderform = () => {
    if (emptyItemIndex) {
      alert("please select an item for taking the order");
    } else if (!employee) {
      alert("Please Login first");
    } else if (!selectedTable) {
      alert("please select the table before taking order");
    }
    console.log(addedItemsForOrder, selectedTable, employee._id, totalCharges);
    const newOrder = {
      tableNo: selectedTable,
      orderItems: addedItemsForOrder,
      orderTaker: employee._id,
    };
    addOrder(newOrder);
    setAddedItemsforOrder([{ item: "", qty: "" }]);
    setSelectedTable(null);
  };
  const cancelOrder = () => {
    setAddedItemsforOrder([{ item: "", qty: "" }]);
    setSelectedTable(null);
  };

  return (
    <View style={waiterStyles.orderPlacement}>
      <View style={waiterStyles.orderSelectTableBox}>
        <Pressable
          style={waiterStyles.orderSelectTable}
          onPress={() => selectTable()}
        >
          <Text style={waiterStyles.orderSelectTableText}>
            {selectedTable
              ? `${
                  tableData.find((t) => t._id === selectedTable)?.name
                } Selected`
              : `Select Table`}
          </Text>
        </Pressable>
      </View>

      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={waiterStyles.orderMenuBox}>
          {emptyItemIndex ? (
            <View></View>
          ) : (
            addedItemsForOrder?.map((item) => {
              const product = productData.find((p) => p._id === item.item);

              return (
                <View style={waiterStyles.singleOrderMenuBox}>
                  <View style={waiterStyles.orderMenuImgBox}>
                    {productData.find((p) => p._id === item.item) ? (
                      <Image
                        style={waiterStyles.orderMenuImg}
                        source={{
                          uri: `http://localhost:8080/${productData
                            .find((p) => p._id === item.item)
                            .img.replace(/\\/g, "/")}`,
                        }}
                      />
                    ) : (
                      <Text>Image</Text>
                    )}
                  </View>

                  <View style={waiterStyles.orderMenuDetailsAndActionsBox}>
                    <View style={waiterStyles.orderMenuDesBox}>
                      <View style={waiterStyles.orderMenuName}>
                        <Text style={waiterStyles.orderMenuNameText}>
                          {product?.name || "NA"}
                        </Text>
                      </View>
                      <View style={waiterStyles.orderMenuPrice}>
                        <Text style={waiterStyles.orderMenuPriceText}>
                          {product?.price || "NA"}
                        </Text>
                      </View>
                      <View style={waiterStyles.orderMenuQty}>
                        <View style={waiterStyles.orderMenuQtyActionBox}>
                          <Pressable
                            onPress={() => quantityDecrease(item.item)}
                          >
                            <Text style={waiterStyles.orderMenuQtyActionText}>
                              &minus;
                            </Text>
                          </Pressable>
                        </View>
                        <View style={waiterStyles.orderMenuQtyTextBox}>
                          <Text style={waiterStyles.orderMenuQtyText}>
                            {item.qty}
                          </Text>
                        </View>
                        <View style={waiterStyles.orderMenuQtyActionBox}>
                          <Pressable
                            onPress={() => quantityIncrease(item.item)}
                          >
                            <Text style={waiterStyles.orderMenuQtyActionText}>
                              +
                            </Text>
                          </Pressable>
                        </View>
                      </View>
                    </View>

                    <View style={waiterStyles.orderMenuActionBox}>
                      <Pressable>
                        <Text>delete</Text>
                      </Pressable>
                    </View>
                  </View>
                </View>
              );
            })
          )}
        </View>
      </ScrollView>

      <View style={waiterStyles.orderCalculationsBox}>
        <View style={waiterStyles.orderLeftCircle}></View>
        <View style={waiterStyles.orderRightCircle}></View>
        <View style={waiterStyles.orderCharges}>
          <View style={waiterStyles.singleOrderCharge}>
            <View>
              <Text style={waiterStyles.orderChargesDesText}>charges</Text>
            </View>
            <View>
              <Text style={waiterStyles.orderChargesPriceText}>
                {totalCharges}
              </Text>
            </View>
          </View>
          <View style={waiterStyles.singleOrderCharge}>
            <View>
              <Text style={waiterStyles.orderChargesDesText}>discount</Text>
            </View>
            <View>
              <Text style={waiterStyles.orderChargesPriceText}>0</Text>
            </View>
          </View>
        </View>

        <View style={waiterStyles.orderTotal}>
          <View>
            <Text style={waiterStyles.orderTotalDesText}>Total</Text>
          </View>
          <View>
            <Text style={waiterStyles.orderTotalPriceText}>{totalCharges}</Text>
          </View>
        </View>
        <View style={waiterStyles.orderActionButtons}>
          <Pressable
            style={[waiterStyles.orderButtons, waiterStyles.orderPlaceButton]}
            onPress={() => submitOrderform()}
          >
            <Text style={waiterStyles.orderButtonsText}>Order</Text>
          </Pressable>
          <Pressable
            onPress={() => cancelOrder()}
            style={[waiterStyles.orderButtons, waiterStyles.orderCancelButton]}
          >
            <Text style={waiterStyles.orderButtonsText}>Cancel</Text>
          </Pressable>
          <Pressable
            style={[waiterStyles.orderButtons, waiterStyles.orderDraftButton]}
          >
            <Text
              style={waiterStyles.orderButtonsText}
              onPress={() => console.log(employee._id)}
            >
              Draft
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    productData: state.products.productData,
    tableData: state.tables.tableData,
  };
};

const mapDispatchToProps = {
  fetchProductData,
  addOrder,
  fetchTableData,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderPlacement);
