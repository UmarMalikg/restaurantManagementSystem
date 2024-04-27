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
  deleteOrder,
  getOrderById,
} from "../../redux/actions/orderActions";
import { fetchProductData } from "../../redux/actions/productAction";
import { fetchTableData } from "../../redux/actions/tableActions";
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

const Orders = ({
  fetchOrderData,
  updateOrderItemStatus,
  updateOrderStatus,
  deleteOrder,
  getOrderById,
  orderData,
  selectedOrder,
  fetchProductData,
  productData,
  fetchTableData,
  tableData,
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
    fetchTableData();
    fetchEmployeeData();
  }, [fetchOrderData, fetchProductData, fetchTableData, fetchEmployeeData]);

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
    return (
      orderData &&
      orderData.filter(
        (order) => order.orderTaker === employee._id && !order.isPaid
      )
    );
  };

  const changeOrderStatus = async (orderId) => {
    try {
      await updateOrderStatus(orderId, "Completed");
      emitSocket(socket, "orderChanged");
    } catch (err) {
      console.error(err);
    }
  };

  const deleteAnOrder = async (orderId) => {
    try {
      await getOrderById(orderId);
      if (selectedOrder) {
        const pending = selectedOrder.orderItems.every(
          (item) => item.itemStatus === "Pending"
        );

        if (pending) {
          await deleteOrder(orderId);
          emitSocket(socket, "orderChanged");
          return;
        } else {
          alert("The order has been processed and cannot be deleted.");
          return;
        }
      } else {
        alert("Order not found.");
        return;
      }
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

  if (displayOrders() && displayOrders().length === 0) {
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
        {displayOrders() &&
          displayOrders().map((order) => {
            const table =
              tableData && tableData.find((t) => t._id === order.tableNo);
            return (
              <View key={order._id} style={waiterStyles.singleOrder}>
                {/* single order */}
                <View>
                  <View style={defaultStyles.rowSpacingFlex}>
                    <View style={[defaultStyles.rowFlex]}>
                      <View
                        style={[defaultStyles.rowFlex, defaultStyles.mrgH15]}
                      >
                        <View>
                          <Text style={[defaultStyles.fWB, defaultStyles.fs22]}>
                            Table No:{" "}
                          </Text>
                        </View>
                        <View>
                          <Text style={[defaultStyles.fs22]}>
                            {table.name || ""}
                          </Text>
                        </View>
                      </View>
                      <View
                        style={[defaultStyles.rowFlex, defaultStyles.mrgH15]}
                      >
                        <View>
                          <Text style={[defaultStyles.fWB, defaultStyles.fs22]}>
                            Order Status:{" "}
                          </Text>
                        </View>
                        <View>
                          <Text style={[defaultStyles.fs22]}>
                            {order.status}
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View
                      style={[
                        defaultStyles.mrgH15,
                        defaultStyles.rowCenteredFlex,
                      ]}
                    >
                      <Pressable
                        onPress={() => {
                          changeOrderStatus(order._id);
                        }}
                        style={[
                          {
                            padding: 10,
                            borderRadius: 4,
                            backgroundColor: "#3ea381",
                          },
                          defaultStyles.mrgH20,
                        ]}
                      >
                        <Text style={[defaultStyles.fWB, { color: "#fff" }]}>
                          Completed
                        </Text>
                      </Pressable>
                      <Pressable
                        onPress={() => {
                          deleteAnOrder(order._id);
                        }}
                        style={[
                          {
                            padding: 10,
                            borderRadius: 4,
                            backgroundColor: "#fb6068",
                          },
                          defaultStyles.mrgH20,
                        ]}
                      >
                        <Text style={[defaultStyles.fWB, { color: "#fff" }]}>
                          Delete
                        </Text>
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
                                  { backgroundColor: "#48629c" },
                                ]}
                              >
                                <FontAwesome6
                                  name="check"
                                  size={24}
                                  color="#fff"
                                />
                              </Pressable>
                              <Pressable
                                onPress={() =>
                                  deleteAnItem(order._id, item._id)
                                }
                                style={[
                                  defaultStyles.padH15,
                                  defaultStyles.padV3,
                                  { backgroundColor: "#fb6068" },
                                ]}
                              >
                                <MaterialCommunityIcons
                                  name="delete-restore"
                                  size={24}
                                  color="#fff"
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
    selectedOrder: state.orders.selectedOrder,
    tableData: state.tables.tableData,
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
  fetchTableData,
  fetchEmployeeData,
  deleteItem,
  deleteOrder,
  getOrderById,
};
export default connect(mapStateToProps, mapDispatchToProps)(Orders);
