import { View, Text, ScrollView, Image, Picker } from "react-native";
import React, { useEffect } from "react";
import waiterStyles from "../../waiter/styles/style";
import defaultStyles from "../../../defaultStyles";

import { connect } from "react-redux";

import {
  fetchOrderData,
  updateOrderItemStatus,
} from "../../../redux/actions/orderActions";
import { fetchProductData } from "../../../redux/actions/productAction";
import { fetchTableData } from "../../../redux/actions/tableActions";
import { fetchEmployeeData } from "../../../redux/actions/employeeActions";

import { useNavigation } from "@react-navigation/native";

import { useAppContext } from "../../../context/States";

const KitchenOrders = ({
  fetchOrderData,
  updateOrderItemStatus,
  orderData,
  fetchProductData,
  productData,
  fetchTableData,
  tableData,
  fetchEmployeeData,
  employeeData,
}) => {
  const navigation = useNavigation();

  const { employee } = useAppContext();
  // getting all the orders Data
  useEffect(() => {
    fetchOrderData();
    fetchProductData();
    fetchTableData();
    fetchEmployeeData();
  }, [fetchOrderData, fetchProductData, fetchTableData, fetchEmployeeData]);

  // function to display Orders for the current employee
  const displayOrders = () => {
    // Filter orders based on the logged-in employee's ID
    return orderData.filter((order) => order.status != "Completed");
  };

  const changeItemsStatus = (orderId, itemId, newStatus) => {
    return updateOrderItemStatus(orderId, itemId, newStatus);
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
                                  uri: `http://localhost:8080/${product.img.replace(
                                    /\\/g,
                                    "/"
                                  )}`,
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
                              style={[defaultStyles.fs18, defaultStyles.bold]}
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
  fetchProductData,
  fetchTableData,
  fetchEmployeeData,
};
export default connect(mapStateToProps, mapDispatchToProps)(KitchenOrders);
