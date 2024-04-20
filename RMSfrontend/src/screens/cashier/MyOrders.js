import { View, Text, ScrollView, Image, Pressable } from "react-native";
import React, { useEffect, useContext } from "react";
import waiterStyles from "../styles/waiterStyles";
import defaultStyles from "../../defaultStyles";

import { connect } from "react-redux";

import {
  fetchOrderData,
  updateOrderItemStatus,
  updateOrderStatus,
  deleteItem,
} from "../../redux/actions/orderActions";
import { fetchProductData } from "../../redux/actions/productAction";
import { fetchEmployeeData } from "../../redux/actions/employeeActions";

import { useNavigation } from "@react-navigation/native";

import SocketContext from "../../context/socketContext";

import { useAppContext } from "../../context/States";
import { Ionicons } from "@expo/vector-icons";

import {
  emitSocket,
  changeViaSocket,
} from "../../socketConfig/socketFunctions";
import Loader from "../Loader";

import { FontAwesome6 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ErrorPage from "../ErrorPage";

const MyOrders = ({
  fetchOrderData,
  updateOrderItemStatus,
  updateOrderStatus,
  orderData,
  fetchProductData,
  productData,
  fetchEmployeeData,
  employeeData,
  isLoading,
  isError,
  deleteItem,
}) => {
  const navigation = useNavigation();
  const socket = useContext(SocketContext);

  const { employee } = useAppContext();
  // getting all the orders Data
  useEffect(() => {
    fetchOrderData();
    fetchProductData();
    fetchEmployeeData();
  }, [fetchOrderData, fetchProductData, fetchEmployeeData]);

  const handleOrderChange = () => {
    fetchOrderData();
    console.log(`Order Data Fetched`);
  };

  useEffect(() => {
    changeViaSocket(socket, "orderChanged", handleOrderChange);
  }, [socket]);

  // function to display Orders for the current employee
  const displayOrders = () => {
    // Filter orders based on the logged-in employee's ID
    return orderData.filter((order) => order.orderTaker === employee._id);
  };

  const changeOrderStatus = async (orderId) => {
    try {
      console.log(`in try`);
      await updateOrderStatus(orderId, "Completed");
      console.log(`after update`);
      emitSocket(socket, "orderChanged");
    } catch (err) {
      console.error(err);
    }
  };

  const changeItemsStatus = async (orderId, itemId, newStatus) => {
    try {
      await updateOrderItemStatus(orderId, itemId, newStatus);
      emitSocket(socket, "orderChanged");
    } catch (err) {
      console.error(err);
    }
  };

  const addNewItem = (orderId) => {
    navigation.navigate("UpdateOrder", { orderId });
  };

  const deleteAnItem = async (orderId, itemId) => {
    try {
      await deleteItem(orderId, itemId);
      emitSocket(socket, "orderChanged");
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <ErrorPage />;
  }

  if (displayOrders().length === 0) {
    return (
      <View style={defaultStyles.container}>
        <Text style={[defaultStyles.fs25, defaultStyles.fWB]}>
          There's No Order...
        </Text>
      </View>
    );
  }

  return (
    <View style={waiterStyles.orders}>
      {/* all orders */}
      <ScrollView>
        {displayOrders().map((order) => {
          return (
            <View
              key={order._id}
              style={{ backgroundColor: "#ff0", marginVertical: 10 }}
            >
              {/* single order */}
              <View>
                <View style={defaultStyles.rowSpacingFlex}>
                  <View style={[defaultStyles.rowFlex]}>
                    <View style={[defaultStyles.rowFlex, defaultStyles.mrgH15]}>
                      <View>
                        <Text style={[defaultStyles.fWB, defaultStyles.fs22]}>
                          Delivery Type:{" "}
                        </Text>
                      </View>
                      <View>
                        <Text style={[defaultStyles.fs22]}>
                          {order.orderType}
                        </Text>
                      </View>
                    </View>
                    <View style={[defaultStyles.rowFlex, defaultStyles.mrgH15]}>
                      <View>
                        <Text style={[defaultStyles.fWB, defaultStyles.fs22]}>
                          Order Status:{" "}
                        </Text>
                      </View>
                      <View>
                        <Text style={[defaultStyles.fs22]}>{order.status}</Text>
                      </View>
                    </View>
                  </View>
                  <View style={defaultStyles.mrgH15}>
                    <Pressable
                      onPress={() => {
                        changeOrderStatus(order._id);
                      }}
                      style={[
                        {
                          padding: 10,
                          borderRadius: 4,
                          backgroundColor: "#0ff",
                        },
                        defaultStyles.mrgH20,
                      ]}
                    >
                      <Text>Completed ?</Text>
                    </Pressable>
                  </View>
                </View>

                <ScrollView showsHorizontalScrollIndicator={false}>
                  {/* single Item */}
                  <View style={waiterStyles.allItems}>
                    <Pressable
                      onPress={() => {
                        addNewItem(order._id);
                      }}
                    >
                      <View
                        style={[
                          waiterStyles.singleItem,
                          defaultStyles.rowCenteredFlex,
                        ]}
                      >
                        <View>
                          <Ionicons
                            name="add-circle-outline"
                            size={100}
                            color="black"
                          />
                          <Text>Add new item(s)</Text>
                        </View>
                      </View>
                    </Pressable>
                    {order.orderItems.map((item) => {
                      const product = productData.find(
                        (p) => p._id === item.item
                      );

                      return (
                        <View key={item.item} style={waiterStyles.singleItem}>
                          <View
                            style={[
                              defaultStyles.rowCenteredFlex,
                              defaultStyles.mrg6,
                            ]}
                          >
                            <View>
                              <Text style={defaultStyles.fWB}>Status: </Text>
                            </View>
                            <View>
                              <Text>{item?.itemStatus || "NA"}</Text>
                            </View>
                          </View>

                          <View
                            style={[
                              defaultStyles.rowCenteredFlex,
                              { flex: 1 },
                              defaultStyles.mrgV6,
                            ]}
                          >
                            {product?.img ? (
                              <Image
                                style={waiterStyles.orderedImage}
                                source={{
                                  uri: `${product.img}`,
                                }}
                              />
                            ) : (
                              <View style={defaultStyles.rowCenteredFlex}>
                                <Text>Image</Text>
                              </View>
                            )}
                          </View>
                          <View style={defaultStyles.rowCenteredFlex}>
                            <Text
                              style={[
                                defaultStyles.fs18,
                                defaultStyles.bold,
                                { textAlign: "center" },
                              ]}
                            >
                              {product?.name || "NA"}
                            </Text>
                          </View>
                          <View
                            style={[
                              defaultStyles.rowCenteredFlex,
                              defaultStyles.mrgT8,
                            ]}
                          >
                            <Text>{item?.qty || "NA"}</Text>
                          </View>

                          <View
                            style={[
                              defaultStyles.rowSpacingAroundFlex,
                              defaultStyles.mrgV8,
                            ]}
                          >
                            <Pressable
                              onPress={() =>
                                changeItemsStatus(
                                  order._id,
                                  item._id,
                                  "Completed"
                                )
                              }
                              style={[
                                defaultStyles.padH15,
                                defaultStyles.padV3,
                                { backgroundColor: "#f0f" },
                              ]}
                            >
                              <FontAwesome6
                                name="check"
                                size={24}
                                color="black"
                              />
                            </Pressable>
                            <Pressable
                              onPress={() => deleteAnItem(order._id, item._id)}
                              style={[
                                defaultStyles.padH15,
                                defaultStyles.padV3,
                                { backgroundColor: "#f0f" },
                              ]}
                            >
                              <MaterialCommunityIcons
                                name="delete-restore"
                                size={24}
                                color="black"
                              />
                            </Pressable>
                          </View>
                        </View>
                      );
                    })}
                  </View>
                </ScrollView>
                {/* status */}
                <View></View>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    orderData: state.orders.orderData,
    productData: state.products.productData,
    employeeData: state.employees.employeeData,
    isLoading: state.loadingErrors.isLoading,
    isError: state.loadingErrors.isError,
  };
};

const mapDispatchToProps = {
  fetchOrderData,
  updateOrderStatus,
  updateOrderItemStatus,
  fetchProductData,
  fetchEmployeeData,
  deleteItem,
};
export default connect(mapStateToProps, mapDispatchToProps)(MyOrders);