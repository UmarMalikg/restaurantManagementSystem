import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  Picker,
  Image,
} from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { connect } from "react-redux";
import adminStyles from "../styles/adminStyles";
import cachierStyles from "../styles/cachierStyles";

import { useNavigation } from "@react-navigation/native";

import { fetchOrderData } from "../../redux/actions/orderActions";
import { fetchProductData } from "../../redux/actions/productAction";
import { fetchTableData } from "../../redux/actions/tableActions";
import { fetchEmployeeData } from "../../redux/actions/employeeActions";

import SocketContext from "../../context/socketContext";
import { changeViaSocket } from "../../socketConfig/socketFunctions";

import Loader from "../Loader";
import ErrorPage from "../ErrorPage";

const CachierOrders = ({
  fetchOrderData,
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
  // getting all the orders Data
  useEffect(() => {
    fetchOrderData();
    fetchProductData();
    fetchTableData();
    fetchEmployeeData();
  }, [fetchOrderData, fetchProductData, fetchTableData, fetchEmployeeData]);
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

  const [page, setPage] = useState(1); // Current page number
  const [itemsPerPage, setItemsPerPage] = useState(20); // Number of items per page
  const [searchText, setSearchText] = useState(""); // Search text
  const [orderTypeFilter, setOrderTypeFilter] = useState(null); // Selected order type filter

  // Calculate the start and end index for pagination
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Slice the orderData array based on pagination
  const displayedOrders = orderData
    .filter((order) => {
      // Filter by order type if a filter is selected
      if (orderTypeFilter) {
        return order.orderType === orderTypeFilter;
      }
      return true;
    })
    .filter((order) => {
      // Filter by search text if available
      return order.orderItems.some((item) =>
        item.item.includes(searchText.toLowerCase())
      );
    })
    .slice(startIndex, endIndex);

  const getReciept = (orderId) => {
    navigation.navigate("PrintSlip", { orderId });
  };

  // Handle next and previous page navigation
  const nextPage = () => {
    setPage(page + 1);
  };

  const prevPage = () => {
    setPage(page - 1);
  };

  // logic for searching the orders
  // const [searchText, setSearchText] = useState("");
  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <ErrorPage />;
  }
  return (
    <View style={cachierStyles.screen}>
      <View>
        <View>
          <TextInput
            style={adminStyles.dataSearcher}
            placeholder="search the order with table No, id..."
            value={searchText}
            onChangeText={(text) => setSearchText(text)}
          />
        </View>
        <View style={adminStyles.orderFilter}>
          <View style={adminStyles.orderTypeFilter}>
            <Pressable
              style={[
                adminStyles.filterButtons,
                orderTypeFilter === null && adminStyles.activeFilterButton,
              ]}
              onPress={() => setOrderTypeFilter(null)}
            >
              <Text>All</Text>
            </Pressable>
            <Pressable
              style={[
                adminStyles.filterButtons,
                orderTypeFilter === "Delivery" &&
                  adminStyles.activeFilterButton,
              ]}
              onPress={() => setOrderTypeFilter("Delivery")}
            >
              <Text>Delivery</Text>
            </Pressable>
            <Pressable
              style={[
                adminStyles.filterButtons,
                orderTypeFilter === "Walk-In" && adminStyles.activeFilterButton,
              ]}
              onPress={() => setOrderTypeFilter("Walk-In")}
            >
              <Text>Walk In</Text>
            </Pressable>
            <Pressable
              style={[
                adminStyles.filterButtons,
                orderTypeFilter === "Dine-In" && adminStyles.activeFilterButton,
              ]}
              onPress={() => setOrderTypeFilter("Dine-In")}
            >
              <Text>Dine In</Text>
            </Pressable>
          </View>
          <View>
            <Picker
              selectedValue={itemsPerPage}
              onValueChange={(value) => setItemsPerPage(value)}
            >
              <Picker.Item label={10} value={10} />
              <Picker.Item label={20} value={20} />
              <Picker.Item label={30} value={30} />
              <Picker.Item label={30} value={30} />
            </Picker>
          </View>
        </View>
      </View>
      <ScrollView>
        <View style={adminStyles.allOrders}>
          {displayedOrders?.map((order) => {
            const table = tableData.find((t) => t._id === order.tableNo);
            const employee = employeeData.find(
              (e) => e._id === order.orderTaker
            );
            return (
              <View style={adminStyles.singleOrder}>
                <View style={adminStyles.orderHeader}>
                  <View
                    style={[
                      adminStyles.orderTableNo,
                      adminStyles.rowCentered,
                      { flex: 1 },
                    ]}
                  >
                    <Text style={adminStyles.orderHeaderText}>
                      {order.orderType === "Dine-In"
                        ? "Table No"
                        : order.orderType === "Delivery"
                        ? "Delivery Address"
                        : "Customer Name"}
                    </Text>
                  </View>
                  <View
                    style={[
                      adminStyles.orderTakerName,
                      adminStyles.rowCentered,
                      { flex: 2 },
                    ]}
                  >
                    <Text style={adminStyles.orderHeaderText}>
                      Employee Name
                    </Text>
                  </View>
                  <View
                    style={[
                      adminStyles.orderMenuDetails,
                      adminStyles.rowCentered,
                      { flex: 1 },
                    ]}
                  >
                    <Text style={adminStyles.orderHeaderText}>Image</Text>
                  </View>
                  <View
                    style={[
                      adminStyles.orderMenuDetails,
                      adminStyles.rowCentered,
                      { flex: 2 },
                    ]}
                  >
                    <Text style={adminStyles.orderHeaderText}>
                      Product Name
                    </Text>
                  </View>
                  <View
                    style={[
                      adminStyles.orderMenuDetails,
                      adminStyles.rowCentered,
                      { flex: 1 },
                    ]}
                  >
                    <Text style={adminStyles.orderHeaderText}>Quantity</Text>
                  </View>
                  <View
                    style={[
                      adminStyles.orderMenuDetails,
                      adminStyles.rowCentered,
                      { flex: 1 },
                    ]}
                  >
                    <Text style={adminStyles.orderHeaderText}>Price</Text>
                  </View>
                  <View
                    style={[
                      adminStyles.orderMenuDetails,
                      adminStyles.rowCentered,
                      { flex: 1 },
                    ]}
                  >
                    <Text style={adminStyles.orderHeaderText}>Total</Text>
                  </View>
                  <View
                    style={[
                      adminStyles.orderTypeStyle,
                      adminStyles.rowCentered,
                      { flex: 1 },
                    ]}
                  >
                    <Text style={adminStyles.orderHeaderText}>Type</Text>
                  </View>
                  <View
                    style={[
                      adminStyles.orderTotalAndRecieptAction,
                      adminStyles.rowCentered,
                      { flex: 3 },
                    ]}
                  >
                    <Text style={adminStyles.orderHeaderText}>TotalField</Text>
                  </View>
                </View>
                <View style={adminStyles.orderData}>
                  <View
                    style={[
                      adminStyles.orderTableNo,
                      adminStyles.rowCentered,
                      { flex: 1 },
                    ]}
                  >
                    <Text>
                      {order.orderType === "Dine-In"
                        ? `${table?.name || "NA"}`
                        : order.orderType === "Delivery"
                        ? "Delivery Address"
                        : "Customer Name"}
                    </Text>
                  </View>
                  <View
                    style={[
                      adminStyles.orderTakerName,
                      adminStyles.rowCentered,
                      { flex: 2 },
                    ]}
                  >
                    <Text>
                      {`${employee?.personalInfo.firstName} ${employee?.personalInfo.lastName}` ||
                        "NA"}
                    </Text>
                  </View>

                  <View style={[adminStyles.orderMenuDetails, { flex: 6 }]}>
                    {order.orderItems.map((orderItem) => {
                      const product = productData.find(
                        (p) => p._id === orderItem.item
                      );

                      return (
                        <View style={adminStyles.orderSingleMenuStyle}>
                          <View style={[adminStyles.rowCentered, { flex: 1 }]}>
                            {product?.img ? (
                              <Image
                                style={{
                                  height: 50,
                                  width: 50,
                                  borderRadius: 10,
                                }}
                                source={{
                                  uri: `${product.img}`,
                                }}
                              />
                            ) : (
                              <View>
                                <Text>Image</Text>
                              </View>
                            )}
                          </View>
                          <View style={[adminStyles.rowCentered, { flex: 2 }]}>
                            <Text>{product?.name || "NA"}</Text>
                          </View>
                          <View style={[adminStyles.rowCentered, { flex: 1 }]}>
                            <Text>{orderItem?.qty || "NA"}</Text>
                          </View>
                          <View style={[adminStyles.rowCentered, { flex: 1 }]}>
                            <Text>{product?.price || "NA"}</Text>
                          </View>
                          <View style={[adminStyles.rowCentered, { flex: 1 }]}>
                            <Text>
                              {product?.price * orderItem?.qty || "NA"}
                            </Text>
                          </View>
                        </View>
                      );
                    })}
                  </View>

                  <View style={[adminStyles.orderTypeStyle, { flex: 1 }]}>
                    <Text>{order.orderType}</Text>
                  </View>
                  <View
                    style={[
                      adminStyles.orderTotalAndRecieptAction,
                      { flex: 3 },
                    ]}
                  >
                    <View style={adminStyles.orderTotalPriceStyling}>
                      <View>
                        <Text style={adminStyles.orderTotalPriceTitle}>
                          Tax Price
                        </Text>
                      </View>
                      <View>
                        <Text style={adminStyles.orderTotalPriceValue}>
                          Rs. {order.taxPrice}
                        </Text>
                      </View>
                    </View>
                    <View style={adminStyles.orderTotalPriceStyling}>
                      <View>
                        <Text style={adminStyles.orderTotalPriceTitle}>
                          Discount
                        </Text>
                      </View>
                      <View>
                        <Text style={adminStyles.orderTotalPriceValue}>
                          Rs. {order.discount}
                        </Text>
                      </View>
                    </View>
                    <View style={adminStyles.orderTotalPriceStyling}>
                      <View>
                        <Text style={adminStyles.orderTotalPriceTitle}>
                          Delivery charges
                        </Text>
                      </View>
                      <View>
                        <Text style={adminStyles.orderTotalPriceValue}>
                          Rs.{order.deliveryCharges}
                        </Text>
                      </View>
                    </View>
                    <View style={adminStyles.orderTotalPriceStyling}>
                      <View>
                        <Text style={adminStyles.orderTotalPriceTitle}>
                          Total Price
                        </Text>
                      </View>
                      <View>
                        <Text style={adminStyles.orderTotalPriceValue}>
                          Rs. {order.totalPrice}
                        </Text>
                      </View>
                    </View>
                    <Pressable
                      onPress={() => {
                        getReciept(order._id);
                      }}
                    >
                      <Text>Print</Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
        <View style={adminStyles.pagination}>
          <Pressable
            style={adminStyles.paginationButtons}
            onPress={prevPage}
            disabled={page === 1}
          >
            <Text>Previous</Text>
          </Pressable>
          <Text>{`Page ${page}`}</Text>
          <Pressable
            style={adminStyles.paginationButtons}
            onPress={nextPage}
            disabled={endIndex >= orderData.length}
          >
            <Text>Next</Text>
          </Pressable>
        </View>
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
  fetchProductData,
  fetchTableData,
  fetchEmployeeData,
};
export default connect(mapStateToProps, mapDispatchToProps)(CachierOrders);
