import { View, Text, ScrollView, Image, Picker } from "react-native";
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
    console.log("Order data fetched successfully");
  };
  useEffect(() => {
    changeViaSocket(socket, "orderChanged", handleOrderChanged);
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

  return (
    <View style={waiterStyles.orders}>
      {/* all orders */}
      <ScrollView>
        {displayOrders().map((order) => (
          <View key={order._id}>
            {/* single order */}
            <View>
              <View>
                <Text>{order.status}</Text>
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
