import React, { useState, useEffect, useContext } from "react";
import {
  Image,
  ScrollView,
  Text,
  Pressable,
  View,
  Picker,
  TextInput,
} from "react-native";
import waiterStyles from "../../styles/waiterStyles";
import adminStyles from "../../styles/waiterStyles";
import { useAppContext } from "../../../context/States";
import { connect } from "react-redux";
import { fetchProductData } from "../../../redux/actions/productAction";
import { addOrder } from "../../../redux/actions/orderActions";
import { useNavigation } from "@react-navigation/native";
import {
  successAlertBackground,
  successAlertMessage,
  dangerAlertBackground,
  dangerAlertMessage,
  warningAertBackground,
  warningAertMessage,
} from "../../../constants/stylesConstants";

import SocketContext from "../../../context/socketContext";

import { emitSocket } from "../../../socketConfig/socketFunctions";

const COrderPlacement = ({ fetchProductData, productData, addOrder }) => {
  useEffect(() => {
    fetchProductData();
  }, [fetchProductData]);

  const navigation = useNavigation();
  const socket = useContext(SocketContext);
  const [selectedOrderType, setSelectedOrderType] = useState("");
  const [customerDeliveryAddress, setCustomerDeliveryAddress] = useState("");

  const {
    addedItemsForOrder,
    employee,
    updateItemsForOrder,
    setAddedItemsforOrder,
  } = useAppContext();

  const [popUpMessage, setPopUpMessage] = useState("");
  const [isOrdered, setIsOrdered] = useState(false);
  const [isOrderCancelled, setIsOrderCancelled] = useState(false);
  const [isDrafted, setIsDrafted] = useState(false);

  const showPopUp = (set) => {
    set(true);
    setTimeout(() => {
      set(false);
      setPopUpMessage("");
    }, 1000);
  };

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

  const submitOrderform = async () => {
    try {
      if (emptyItemIndex) {
        return alert("please select an item for taking the order");
      } else if (!employee) {
        return alert("Please Login first");
      } else if (!selectedOrderType) {
        return alert("please select the table before taking order");
      }
      // console.log(addedItemsForOrder, selectedTable, employee._id, totalCharges);
      //   let newOrder;
      const newOrder = {
        orderType: selectedOrderType,
        orderItems: addedItemsForOrder,
        orderTaker: employee._id,
        ...(selectedOrderType === "Delivery"
          ? { deliveryAddress: customerDeliveryAddress }
          : { customerName: customerDeliveryAddress }),
      };
      await addOrder(newOrder);
      setAddedItemsforOrder([{ item: "", qty: "", itemStatus: "Pending" }]);
      setSelectedOrderType("");
      setCustomerDeliveryAddress("");
      setPopUpMessage("Successfully ordered!");
      showPopUp(setIsOrdered);
      emitSocket(socket, "orderChanged");
    } catch (err) {
      console.error(err);
    }
  };

  const cancelOrder = () => {
    setAddedItemsforOrder([{ item: "", qty: "", itemStatus: "Pending" }]);
    setSelectedOrderType("");
    setCustomerDeliveryAddress("");
    setPopUpMessage("Order Canelled!");
    showPopUp(setIsOrderCancelled);
  };

  const draftOrder = () => {
    setPopUpMessage("Order Drafted!");
    showPopUp(setIsDrafted);
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
        <View>
          <Picker
            style={adminStyles.modelInput}
            selectedValue={selectedOrderType}
            onValueChange={(value) => setSelectedOrderType(value)}
          >
            <Picker.Item label="Select the Order Type" value="" />
            <Picker.Item label="Take-Away" value="Take-Away" />
            <Picker.Item label="Delivery" value="Delivery" />
          </Picker>
        </View>
        <View>
          {selectedOrderType === "Delivery" && (
            <TextInput
              placeholder="Delivery Address"
              value={customerDeliveryAddress}
              onChangeText={(text) => setCustomerDeliveryAddress(text)}
            />
          )}
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
            addedItemsForOrder?.map((item) => {
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
          {/* <View style={{ position: "relative" }}>
            <Pressable
              style={[waiterStyles.orderButtons, waiterStyles.orderDraftButton]}
              onPress={draftOrder}
            >
              <Text style={waiterStyles.orderButtonsText}>Draft</Text>
            </Pressable>
            {isDrafted && (
              <View
                style={{
                  position: "absolute",
                  top: -25,
                  display: "flex",
                  right: 0,
                  borderRadius: 5,
                  zIndex: 1, // Set the maximum width to 400% of its parent
                  width: "200%",
                  backgroundColor: warningAertBackground,
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: warningAertMessage,
                    fontWeight: "bold",
                  }}
                >
                  {popUpMessage}
                </Text>
              </View>
            )}
          </View> */}
        </View>
      </View>
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    productData: state.products.productData,
  };
};

const mapDispatchToProps = {
  fetchProductData,
  addOrder,
};

export default connect(mapStateToProps, mapDispatchToProps)(COrderPlacement);
