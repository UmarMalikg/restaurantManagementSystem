import { View, Text, ScrollView, Image, Pressable } from "react-native";
import React, { useEffect, useContext } from "react";
import waiterStyles from "../styles/waiterStyles";
import defaultStyles from "../../defaultStyles";

import { connect } from "react-redux";

import {
  fetchOrderData,
  updateOrderItemStatus,
  updateOrderStatus,
} from "../../redux/actions/orderActions";
import { fetchProductData } from "../../redux/actions/productAction";
import { fetchTableData } from "../../redux/actions/tableActions";
import { fetchEmployeeData } from "../../redux/actions/employeeActions";

import { useNavigation } from "@react-navigation/native";

import SocketContext from "../../context/socketContext";

import { useAppContext } from "../../context/States";

import {
  emitSocket,
  changeViaSocket,
} from "../../socketConfig/socketFunctions";

const Orders = ({
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

  return (
    <View style={waiterStyles.orders}>
      {/* all orders */}
      <ScrollView>
        {displayOrders().map((order) => {
          const table = tableData.find((t) => t._id === order.tableNo);
          return (
            <View
              key={order._id}
              style={{ backgroundColor: "#ff0", marginVertical: 10 }}
            >
              {/* single order */}
              <View>
                <View>
                  <Text>{order.status}</Text>
                </View>
                <View>
                  <Text>{table.name}</Text>
                </View>
                <View>
                  <Text>{order.status}</Text>
                </View>
                <View>
                  <Pressable
                    onPress={() => {
                      changeOrderStatus(order._id);
                    }}
                  >
                    <Text>Completed</Text>
                  </Pressable>
                </View>
                <ScrollView showsHorizontalScrollIndicator={false}>
                  {/* single Item */}
                  <View style={waiterStyles.allItems}>
                    {order.orderItems.map((item) => {
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
                            <View>
                              <Text>Time</Text>
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
                            <Pressable
                              onPress={() =>
                                changeItemsStatus(
                                  order._id,
                                  item._id,
                                  "Completed"
                                )
                              }
                            >
                              <Text>Completed</Text>
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
    tableData: state.tables.tableData,
    employeeData: state.employees.employeeData,
  };
};

const mapDispatchToProps = {
  fetchOrderData,
  updateOrderStatus,
  updateOrderItemStatus,
  fetchProductData,
  fetchTableData,
  fetchEmployeeData,
};
export default connect(mapStateToProps, mapDispatchToProps)(Orders);
