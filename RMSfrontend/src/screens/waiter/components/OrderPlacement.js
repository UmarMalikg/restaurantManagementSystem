import React, { useState, useEffect, useContext } from "react";
import { Image, ScrollView, Text, Pressable, View } from "react-native";
import waiterStyles from "../../styles/waiterStyles";
import { useAppContext } from "../../../context/States";
import { connect } from "react-redux";
import { fetchProductData } from "../../../redux/actions/productAction";
import { fetchFloorData } from "../../../redux/actions/floorActions";
import { addOrder } from "../../../redux/actions/orderActions";
import { useNavigation } from "@react-navigation/native";
import { fetchTableData } from "../../../redux/actions/tableActions";
import {
  successAlertBackground,
  successAlertMessage,
  dangerAlertBackground,
  dangerAlertMessage,
} from "../../../constants/stylesConstants";

import SocketContext from "../../../context/socketContext";

import { emitSocket } from "../../../socketConfig/socketFunctions";
import AdminDeleteIcon from "../../common/AdminDeleteIcon";
import { TextInput } from "react-native-paper";

const OrderPlacement = ({
  fetchProductData,
  fetchTableData,
  fetchFloorData,
  floorData,
  tableData,
  productData,
  addOrder,
}) => {
  useEffect(() => {
    fetchProductData();
    fetchTableData();
    fetchFloorData();
  }, [fetchProductData, fetchTableData, fetchFloorData]);

  const navigation = useNavigation();
  const socket = useContext(SocketContext);

  const {
    addedItemsForOrder,
    employee,
    selectedTable,
    updateItemsForOrder,
    setAddedItemsforOrder,
    setSelectedTable,
  } = useAppContext();

  const [popUpMessage, setPopUpMessage] = useState("");
  const [isOrdered, setIsOrdered] = useState(false);
  const [isOrderCancelled, setIsOrderCancelled] = useState(false);

  const showPopUp = (set) => {
    set(true);
    setTimeout(() => {
      set(false);
      setPopUpMessage("");
    }, 1000);
  };

  const emptyItemIndex =
    addedItemsForOrder &&
    addedItemsForOrder.find((item) => item.item === "" && item.qty === "");

  const [totalCharges, setTotalCharges] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [subTotal, setSubTotal] = useState(0);

  const priceCalculator = () => {
    let itemCharges = 0;
    let discountedAmount = 0;
    addedItemsForOrder.forEach((item) => {
      const product =
        productData && productData.find((p) => p._id === item.item);
      if (product) {
        itemCharges += product.price * item.qty;
      }
    });
    setSubTotal(itemCharges);
    discountedAmount = (itemCharges * discount) / 100;
    const totalCharges = itemCharges - discountedAmount;
    setTotalCharges(totalCharges);
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
  }, [addedItemsForOrder, productData, discount]);

  const selectTable = () => {
    employee ? navigation.navigate("Tables") : alert("Login first");
  };

  const submitOrderform = async () => {
    try {
      if (emptyItemIndex) {
        return alert("please select an item for taking the order");
      } else if (!employee) {
        return alert("Please Login first");
      } else if (!selectedTable) {
        return alert("please select the table before taking order");
      }
      // console.log(addedItemsForOrder, selectedTable, employee._id, );
      const newOrder = {
        tableNo: selectedTable,
        orderItems: addedItemsForOrder,
        orderTaker: employee._id,
        discount: discount,
      };
      await addOrder(newOrder);
      setAddedItemsforOrder([{ item: "", qty: "", itemStatus: "Pending" }]);
      setSelectedTable(null);
      setPopUpMessage("Successfully ordered!");
      showPopUp(setIsOrdered);
      emitSocket(socket, "orderChanged");
    } catch (err) {
      console.error(err);
    }
  };

  const cancelOrder = () => {
    setAddedItemsforOrder([{ item: "", qty: "", itemStatus: "Pending" }]);
    setSelectedTable(null);
    setPopUpMessage("Order Canelled!");
    showPopUp(setIsOrderCancelled);
  };

  const deleteListedItem = (productId) => {
    const updatedItems = addedItemsForOrder.filter(
      (item) => item.item !== productId
    );
    setAddedItemsforOrder(updatedItems);
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
              ? (() => {
                  const table = tableData.find((t) => t._id === selectedTable);
                  const floorName =
                    table && floorData.find((f) => f._id === table.floor)?.name;
                  return `${table?.name || ""}, ${floorName || ""} Selected`;
                })()
              : "Select Table"}
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
              const product =
                productData && productData.find((p) => p._id === item.item);

              return (
                <View style={waiterStyles.singleOrderMenuBox}>
                  <View style={waiterStyles.orderMenuImgBox}>
                    {productData &&
                    productData.find((p) => p._id === item.item) ? (
                      <Image
                        style={waiterStyles.orderMenuImg}
                        source={{
                          uri: `${
                            productData &&
                            productData.find((p) => p._id === item.item).img
                          }`,
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
                      <Pressable onPress={() => deleteListedItem(item.item)}>
                        <AdminDeleteIcon />
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
        {/* <View style={waiterStyles.orderLeftCircle}></View>
        <View style={waiterStyles.orderRightCircle}></View> */}
        {/* <View style={waiterStyles.orderCharges}>
          <View style={waiterStyles.singleOrderCharge}>
            <View>
              <Text style={waiterStyles.orderChargesDesText}>Sub Total:</Text>
            </View>
            <View>
              <Text style={waiterStyles.orderChargesPriceText}>{subTotal}</Text>
            </View>
          </View>
          <View style={waiterStyles.singleOrderCharge}>
            <View>
              <Text style={waiterStyles.orderChargesDesText}>discount</Text>
            </View>
            <View>
            <Text style={waiterStyles.orderChargesDesText}>0</Text>
            </View>
          </View>
        </View> */}

        <View style={waiterStyles.orderTotal}>
          <View>
            <Text style={waiterStyles.orderTotalDesText}>Total</Text>
          </View>
          <View>
            <Text style={waiterStyles.orderTotalPriceText}>{totalCharges}</Text>
          </View>
        </View>
        <View style={waiterStyles.orderActionButtons}>
          <View style={{ position: "relative" }}>
            <Pressable
              style={[waiterStyles.orderButtons, waiterStyles.orderPlaceButton]}
              onPress={() => submitOrderform()}
            >
              <Text style={waiterStyles.orderButtonsText}>Order</Text>
            </Pressable>
            {isOrdered && (
              <View
                style={{
                  position: "absolute",
                  top: -25,
                  display: "flex",
                  borderRadius: 5,
                  zIndex: 1, // Set the maximum width to 400% of its parent
                  width: "230%",
                  backgroundColor: successAlertBackground,
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: successAlertMessage,
                    fontWeight: "bold",
                  }}
                >
                  {popUpMessage}
                </Text>
              </View>
            )}
          </View>
          <View style={{ position: "relative" }}>
            <Pressable
              onPress={() => cancelOrder()}
              style={[
                waiterStyles.orderButtons,
                waiterStyles.orderCancelButton,
              ]}
            >
              <Text style={waiterStyles.orderButtonsText}>Cancel</Text>
            </Pressable>
            {isOrderCancelled && (
              <View
                style={{
                  position: "absolute",
                  top: -25,
                  right: 0,
                  borderRadius: 5,
                  zIndex: 1,
                  width: "200%",
                  backgroundColor: dangerAlertBackground,
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: dangerAlertMessage,
                    fontWeight: "bold",
                  }}
                >
                  {popUpMessage}
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    productData: state.products.productData,
    tableData: state.tables.tableData,
    floorData: state.floors.floorData,
  };
};

const mapDispatchToProps = {
  fetchProductData,
  addOrder,
  fetchTableData,
  fetchFloorData,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderPlacement);
