import { View, Text, ScrollView, Image, Picker, Pressable } from "react-native";
import React, { useContext, useEffect } from "react";
import waiterStyles from "../../styles/waiterStyles";
import defaultStyles from "../../../defaultStyles";
import { connect } from "react-redux";
import {
  fetchOrderData,
  updateOrderItemStatus,
  updateOrderStatus,
} from "../../../redux/actions/orderActions";
import { fetchProductData } from "../../../redux/actions/productAction";
import { fetchTableData } from "../../../redux/actions/tableActions";
import { fetchEmployeeData } from "../../../redux/actions/employeeActions";

import { useNavigation } from "@react-navigation/native";

import { useAppContext } from "../../../context/States";
import { lightGreen } from "../../../constants/stylesConstants";

import SocketContext from "../../../context/socketContext";
import {
  emitSocket,
  changeViaSocket,
} from "../../../socketConfig/socketFunctions";

import Loader from "../../Loader";
import ErrorPage from "../../ErrorPage";

const KitchenOrders = ({
  fetchOrderData,
  updateOrderItemStatus,
  updateOrderStatus,
  orderData,
  fetchProductData,
  productData,
  fetchTableData,
  tableData,
  fetchEmployeeData,
  employeeData,
  isLoading,
  isError,
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
  }, [
    fetchOrderData,
    fetchProductData,
    fetchTableData,
    fetchEmployeeData,
    changeItemsStatus,
  ]);

  const handleOrderChanged = () => {
    fetchOrderData(); // Wait for the data to be fetched
    console.log("Floor data fetched successfully");
  };
  const handleProductChanged = () => {
    fetchOrderData(); // Wait for the data to be fetched
    console.log("Floor data fetched successfully");
  };
  const handleTableChanged = () => {
    fetchOrderData(); // Wait for the data to be fetched
    console.log("Floor data fetched successfully");
  };
  const handleEmployeeChanged = () => {
    fetchOrderData(); // Wait for the data to be fetched
    console.log("Floor data fetched successfully");
  };
  useEffect(() => {
    changeViaSocket(socket, "employeeChanged", handleEmployeeChanged);
    changeViaSocket(socket, "orderChanged", handleOrderChanged);
    changeViaSocket(socket, "productChanged", handleProductChanged);
    changeViaSocket(socket, "tableChanged", handleTableChanged);
  }, [socket]);

  // function to display Orders for the current employee
  const displayOrders = () => {
    // Filter orders based on the logged-in employee's ID
    return orderData.filter((order) => order.status != "Completed");
  };

  const changeItemsStatus = async (orderId, itemId, newStatus) => {
    try {
      await updateOrderItemStatus(orderId, itemId, newStatus);
      emitSocket(socket, "orderChanged");
    } catch (err) {
      console.error(err);
    }
  };

  const changeOrderStatus = async (orderId, status) => {
    try {
      console.log(`in try`);
      await updateOrderStatus(orderId, status);
      console.log(`after update`);
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
  return (
    <View style={waiterStyles.orders}>
      {/* all orders */}
      <ScrollView>
        {displayOrders().map((order) => (
          <View key={order._id} style={waiterStyles.singleOrder}>
            {/* single order */}
            <View>
              <View style={defaultStyles.rowSpacingFlex}>
                <View style={[defaultStyles.rowFlex]}>
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
                <View style={[defaultStyles.mrgH15, defaultStyles.rowFlex]}>
                  <Pressable
                    onPress={() => {
                      changeOrderStatus(order._id, "Preparing");
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
                      Preparing
                    </Text>
                  </Pressable>
                  <Pressable
                    onPress={() => {
                      changeOrderStatus(order._id, "Ready");
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
                      Ready
                    </Text>
                  </Pressable>
                  <Pressable
                    onPress={() => {
                      changeOrderStatus(order._id, "Delivered");
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
                      Delivered
                    </Text>
                  </Pressable>
                </View>
              </View>
              <ScrollView showsHorizontalScrollIndicator={false}>
                {/* single Item */}
                <View style={waiterStyles.allItems}>
                  {order.orderItems
                    .filter((item) => item.itemStatus !== "Completed")
                    .map((item) => {
                      const product = productData.find(
                        (p) => p._id === item.item
                      );

                      return (
                        <View key={item.item} style={waiterStyles.singleItem}>
                          <View
                            style={[
                              defaultStyles.rowSpacingFlex,
                              defaultStyles.mrg6,
                            ]}
                          >
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
                              defaultStyles.rowCenteredFlex,
                              defaultStyles.mrgV8,
                            ]}
                          >
                            <Picker
                              style={{ backgroundColor: lightGreen }}
                              selectedValue={item.itemStatus}
                              onValueChange={(newStatus) => {
                                changeItemsStatus(
                                  order._id,
                                  item._id,
                                  newStatus
                                );
                              }}
                            >
                              {item.itemStatus === "Pending" && (
                                <>
                                  <Picker.Item
                                    label="Pending"
                                    value="Pending"
                                  />
                                  <Picker.Item
                                    label="Preparing"
                                    value="Preparing"
                                  />
                                  <Picker.Item label="Ready" value="Ready" />
                                  <Picker.Item
                                    label="Delivered"
                                    value="Delivered"
                                  />
                                </>
                              )}
                              {item.itemStatus === "Preparing" && (
                                <>
                                  <Picker.Item
                                    label="Preparing"
                                    value="Preparing"
                                  />
                                  <Picker.Item label="Ready" value="Ready" />
                                  <Picker.Item
                                    label="Delivered"
                                    value="Delivered"
                                  />
                                </>
                              )}
                              {item.itemStatus === "Ready" && (
                                <>
                                  <Picker.Item label="Ready" value="Ready" />
                                  <Picker.Item
                                    label="Delivered"
                                    value="Delivered"
                                  />
                                </>
                              )}
                              {item.itemStatus === "Delivered" && (
                                <>
                                  <Picker.Item
                                    label="Delivered"
                                    value="Delivered"
                                  />
                                </>
                              )}
                            </Picker>
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
        ))}
      </ScrollView>
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    orderData: state.orders.orderData,
    productData: state.products.productData,
    tableData: state.tables.tableData,
    employeeData: state.employees.employeeData,
    isLoading: state.loadingErrors.isLoading,
    isError: state.loadingErrors.isError,
  };
};

const mapDispatchToProps = {
  fetchOrderData,
  updateOrderItemStatus,
  updateOrderStatus,
  updateOrderStatus,
  fetchProductData,
  fetchTableData,
  fetchEmployeeData,
};
export default connect(mapStateToProps, mapDispatchToProps)(KitchenOrders);

// Jennifer Aniston
// Little Women
// Brooklyn
// Abbie Cornish
