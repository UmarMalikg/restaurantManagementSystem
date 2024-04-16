import React, { useState, useEffect, useContext } from "react";
import { Image, ScrollView, Text, Pressable, View } from "react-native";
import waiterStyles from "../../../styles/waiterStyles";
import { useAppContext } from "../../../../context/States";
import { connect } from "react-redux";
import { fetchProductData } from "../../../../redux/actions/productAction";
import {
  updateOrderData,
  getOrderById,
} from "../../../../redux/actions/orderActions";
import { useNavigation } from "@react-navigation/native";
import { fetchTableData } from "../../../../redux/actions/tableActions";
import {
  successAlertBackground,
  successAlertMessage,
  dangerAlertBackground,
  dangerAlertMessage,
  warningAertBackground,
  warningAertMessage,
} from "../../../../constants/stylesConstants";

import SocketContext from "../../../../context/socketContext";

import { emitSocket } from "../../../../socketConfig/socketFunctions";
import updateOrderStyle from "../../../styles/updateOrderStyle";
import Loader from "../../../Loader";
import ErrorPage from "../../../ErrorPage";
import defaultStyles from "../../../../defaultStyles";

const UpdateOrderPlacement = ({
  orderId,
  fetchProductData,
  fetchTableData,
  tableData,
  productData,
  updateOrderData,
  getOrderById,
  selectedOrder,
  isLoading,
  isError,
}) => {
  useEffect(() => {
    fetchProductData();
    fetchTableData();
    getOrderById(orderId);
  }, [fetchProductData, fetchTableData, getOrderById, orderId]);

  const navigation = useNavigation();
  const socket = useContext(SocketContext);

  const {
    updatedAddedItemsForOrder,
    employee,
    updateUpdatedItemsForOrder,
    setUpdatedAddedItemsforOrder,
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

  const emptyItemIndex = updatedAddedItemsForOrder.find(
    (item) => item.item === "" && item.qty === ""
  );

  const [totalCharges, setTotalCharges] = useState(0);

  const priceCalculator = () => {
    let itemCharges = 0;
    updatedAddedItemsForOrder.forEach((item) => {
      const product = productData.find((p) => p._id === item.item);
      if (product) {
        itemCharges += product.price * item.qty;
      }
    });
    setTotalCharges(itemCharges);
  };

  const quantityIncrease = (productId) => {
    // Find if the item already exists in addedItemsForOrder
    const existingItem = updatedAddedItemsForOrder.find(
      (item) => item.item === productId
    );

    if (existingItem) {
      // If the item exists, update its quantity
      const updatedQty = existingItem.qty + 1;
      updateUpdatedItemsForOrder(productId, updatedQty);
      priceCalculator(); // Recalculate the total charges
    } else {
      // If the item doesn't exist, add it with quantity 1
      updateUpdatedItemsForOrder(productId, 1);
      priceCalculator(); // Recalculate the total charges
    }
  };

  const quantityDecrease = (productId) => {
    // Find if the item already exists in addedItemsForOrder
    const existingItem = updatedAddedItemsForOrder.find(
      (item) => item.item === productId
    );

    if (existingItem && existingItem.qty > 1) {
      // If the item exists and quantity is greater than 1, decrease its quantity
      const updatedQty = existingItem.qty - 1;
      updateUpdatedItemsForOrder(productId, updatedQty);
      priceCalculator(); // Recalculate the total charges
    }
  };

  useEffect(() => {
    priceCalculator();
  }, [updatedAddedItemsForOrder, productData]);

  const submitOrderform = async () => {
    try {
      if (emptyItemIndex) {
        return alert("please select an item for taking the order");
      } else if (!employee) {
        return alert("Please Login first");
      }
      const newOrder = {
        orderItems: updatedAddedItemsForOrder,
        status: "Pending",
      };
      await updateOrderData(orderId, newOrder);
      setUpdatedAddedItemsforOrder([
        { item: "", qty: "", itemStatus: "Pending" },
      ]);
      setPopUpMessage("Successfully updated!");
      showPopUp(setIsOrdered);
      emitSocket(socket, "orderChanged");
      navigation.goBack();
    } catch (err) {
      console.error(err);
      setPopUpMessage("Successfully updated!");
      showPopUp(setIsOrdered);
    }
  };

  const discardChanges = () => {
    setUpdatedAddedItemsforOrder([
      { item: "", qty: "", itemStatus: "Pending" },
    ]);
    setSelectedTable(null);
    setPopUpMessage("Changes Discarded!");
    showPopUp(setIsOrderCancelled);
    navigation.goBack();
  };

  const deleteListedItem = (productId) => {
    const updatedItems = updatedAddedItemsForOrder.filter(
      (item) => item.item !== productId
    );
    setUpdatedAddedItemsforOrder(updatedItems);
  };

  useEffect(() => {
    if (selectedOrder && selectedOrder.orderItems) {
      const updatedItems = selectedOrder.orderItems.map((item) => ({
        item: item.item,
        qty: item.qty,
        itemStatus: item.itemStatus,
      }));
      // Update updatedAddedItemsForOrder with the new items
      setUpdatedAddedItemsforOrder(updatedItems);
      console.log(selectedOrder.totalPrice);
    }
  }, [selectedOrder]);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <ErrorPage />;
  }

  return (
    <View style={updateOrderStyle.orderPlacment}>
      <View style={waiterStyles.orderSelectTableBox}>
        <View style={defaultStyles.rowFlex}>
          <View>
            <Text style={defaultStyles.fWB}>Order type: {"  "}</Text>
          </View>
          <View>
            <Text>{selectedOrder !== null && selectedOrder.orderType}</Text>
          </View>
        </View>
      </View>

      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={waiterStyles.orderMenuBox}>
          {emptyItemIndex ? (
            <View></View>
          ) : (
            updatedAddedItemsForOrder?.map((item) => {
              const product = productData.find((p) => p._id === item.item);

              return (
                <View style={waiterStyles.singleOrderMenuBox}>
                  <View style={waiterStyles.orderMenuImgBox}>
                    {productData.find((p) => p._id === item.item) ? (
                      <Image
                        style={waiterStyles.orderMenuImg}
                        source={{
                          uri: `${
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
              onPress={() => discardChanges()}
              style={[
                waiterStyles.orderButtons,
                waiterStyles.orderCancelButton,
              ]}
            >
              <Text style={waiterStyles.orderButtonsText}>Discard Changes</Text>
            </Pressable>
            {isOrderCancelled && (
              <View
                style={{
                  position: "absolute",
                  top: -30,
                  left: "50%", // Center the text horizontally
                  transform: [{ translateX: "-50%" }], // Move the text back half of its width to center it
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
    orderData: state.orders.orderData,
    selectedOrder: state.orders.selectedOrder,
    isLoading: state.loadingErrors.isLoading,
    isError: state.loadingErrors.isError,
  };
};
const mapDispatchToProps = {
  fetchProductData,
  updateOrderData,
  fetchTableData,
  getOrderById,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateOrderPlacement);
