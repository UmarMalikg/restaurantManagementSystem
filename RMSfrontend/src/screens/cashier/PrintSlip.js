import { View, Text, Pressable, ScrollView } from "react-native";
import React, { useEffect, useRef } from "react";
import cachierStyles from "../styles/cachierStyles";
import defaultStyles from "../../defaultStyles";
import { connect } from "react-redux";
import { getOrderById } from "../../redux/actions/orderActions";
import { fetchProductData } from "../../redux/actions/productAction";
import { fetchTableData } from "../../redux/actions/tableActions";
import { fetchFloorData } from "../../redux/actions/floorActions";
import { isWeb } from "../../constants/stylesConstants";
import ViewShot from "react-native-view-shot";

import * as Print from "expo-print";

import Loader from "../Loader";
import ErrorPage from "../ErrorPage";

let today = new Date();
let date =
  today.getFullYear() +
  "-" +
  String(today.getMonth() + 1).padStart(2, "0") +
  "-" +
  String(today.getDate()).padStart(2, "0");

const PrintSlip = ({
  route,
  getOrderById,
  selectedOrder,
  fetchProductData,
  productData,
  fetchTableData,
  fetchFloorData,
  floorData,
  tableData,
  isLoading,
  isError,
}) => {
  const { orderId } = route.params;
  const printRef = useRef(null);

  const handlePrint = async () => {
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    try {
      if (!isWeb) {
        await Print.printAsync({
          html: (
            <div>
              <h1>Print only this</h1>
            </div>
          ),
        });
      } else {
        const specificContent = document.getElementById("printContent");
        window.print(specificContent);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getOrderById(orderId);
    fetchProductData();
    fetchTableData();
    fetchFloorData();
  }, [
    getOrderById,
    orderId,
    fetchProductData,
    fetchProductData,
    fetchFloorData,
  ]);

  useEffect(() => {
    if (selectedOrder !== null) {
      console.log("not noll", selectedOrder);
    }
  }, [selectedOrder]);

  if (selectedOrder !== null) {
    console.log(selectedOrder.totalPrice);
  }
  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <ErrorPage />;
  }

  return selectedOrder !== null ? (
    <>
      <View style={[cachierStyles.print]}>
        <ScrollView>
          <View
            id="printContent"
            style={{
              borderWidth: 2,
              borderColor: "#f00",
            }} /*print this view and its child by capturing only the info from this view*/
          >
            <View>
              <View style={defaultStyles.rowSpacingFlex}>
                <View>
                  <Text>Logo</Text>
                </View>
                <View>
                  <Text>RES Detail</Text>
                </View>
                <View>
                  <Text>QR Code</Text>
                </View>
              </View>
            </View>
            <View>
              <Text>Order Details</Text>
            </View>
            <View style={cachierStyles.printOrderDetail}>
              {/* SINGLE LINE */}
              <View
                style={[defaultStyles.rowSpacingFlex, cachierStyles.singleLine]}
              >
                <View style={defaultStyles.mrgH20}>
                  <Text style={[defaultStyles.fWB, defaultStyles.fs15]}>
                    Order Number
                  </Text>
                </View>
                <View style={defaultStyles.mrgH20}>
                  <Text style={[defaultStyles.fWB, defaultStyles.fs15]}>
                    on
                  </Text>
                </View>
              </View>
              {/* Others will be here */}
              <View
                style={[defaultStyles.rowSpacingFlex, cachierStyles.singleLine]}
              >
                <View style={defaultStyles.mrgH20}>
                  <Text style={[defaultStyles.fWB, defaultStyles.fs15]}>
                    Date
                  </Text>
                </View>
                <View style={defaultStyles.mrgH20}>
                  <Text>{date}</Text>
                </View>
              </View>

              <View
                style={[defaultStyles.rowSpacingFlex, cachierStyles.singleLine]}
              >
                <View style={defaultStyles.mrgH20}>
                  <Text style={[defaultStyles.fWB, defaultStyles.fs15]}>
                    {selectedOrder.orderType === `Dine-In`
                      ? `Table No`
                      : selectedOrder.orderType === `Take-Away`
                      ? `Customer Name`
                      : `Delivery Address`}
                  </Text>
                </View>
                <View style={defaultStyles.mrgH20}>
                  <Text>
                    {selectedOrder.orderType === `Dine-In`
                      ? tableData.find((t) => t._id === selectedOrder.tableNo)
                          ?.name
                        ? ` ${
                            tableData.find(
                              (t) => t._id === selectedOrder.tableNo
                            )?.name
                          } of ${
                            floorData.find(
                              (f) =>
                                f._id ===
                                tableData.find(
                                  (t) => t._id === selectedOrder.tableNo
                                )?.floor
                            )?.name
                          }`
                        : null
                      : null}
                  </Text>
                </View>
              </View>
              <View
                style={[defaultStyles.rowSpacingFlex, cachierStyles.singleLine]}
              >
                <View style={defaultStyles.mrgH20}>
                  <Text style={[defaultStyles.fWB, defaultStyles.fs15]}>
                    Total
                  </Text>
                </View>
                <View style={defaultStyles.mrgH20}>
                  <Text>{selectedOrder.totalPrice}</Text>
                </View>
              </View>

              {/* <View style={[defaultStyles.rowSpacingFlex, cachierStyles.singleLine]}>
          <View style={defaultStyles.mrgH20}>
            <Text style={[defaultStyles.fWB, defaultStyles.fs15]}>
              PAYMENT METHOD
            </Text>
          </View>
          <View style={defaultStyles.mrgH20}>
            <Text>TOTAL</Text>
          </View>
        </View> */}

              <View
                style={[defaultStyles.rowSpacingFlex, cachierStyles.singleLine]}
              >
                <View style={defaultStyles.mrgH20}>
                  <Text style={[defaultStyles.fWB, defaultStyles.fs15]}>
                    Time Ordered
                  </Text>
                </View>
                <View style={defaultStyles.mrgH20}>
                  <Text>{selectedOrder.updatedAt.substring(0, 10)}</Text>
                </View>
              </View>
            </View>
            {/* restaturant detail view */}

            {/* order detail view */}
            <View>
              <Text>Order Information</Text>
            </View>
            <View style={cachierStyles.printOrderDetail}>
              {/* SINGLE LINE */}
              <View
                style={[defaultStyles.rowSpacingFlex, cachierStyles.singleLine]}
              >
                <View style={defaultStyles.mrgH20}>
                  <Text style={[defaultStyles.fWB, defaultStyles.fs15]}>
                    PRODUCTS
                  </Text>
                </View>
                <View style={defaultStyles.mrgH20}>
                  <Text style={[defaultStyles.fWB, defaultStyles.fs15]}>
                    TOTAL
                  </Text>
                </View>
              </View>

              {/* Render order items */}
              {selectedOrder.orderItems.map((item) => {
                const product = productData.find((p) => p._id === item.item); // Find corresponding product

                return (
                  <View
                    key={item._id}
                    style={[
                      defaultStyles.rowSpacingFlex,
                      cachierStyles.singleLine,
                    ]}
                  >
                    <View style={defaultStyles.mrgH20}>
                      <Text>
                        {product.name} X {item.qty}
                      </Text>
                    </View>
                    <View style={defaultStyles.mrgH20}>
                      <Text>{product.price * item.qty}</Text>{" "}
                      {/* Calculate total price */}
                    </View>
                  </View>
                );
              })}
              {/* End of order items */}
              <View
                style={[defaultStyles.rowSpacingFlex, cachierStyles.singleLine]}
              >
                <View style={defaultStyles.mrgH20}>
                  <Text style={[defaultStyles.fWB, defaultStyles.fs15]}>
                    TAX
                  </Text>
                </View>
                <View style={defaultStyles.mrgH20}>
                  <Text>{selectedOrder.taxPrice}</Text>
                </View>
              </View>
              <View
                style={[defaultStyles.rowSpacingFlex, cachierStyles.singleLine]}
              >
                <View style={defaultStyles.mrgH20}>
                  <Text style={[defaultStyles.fWB, defaultStyles.fs15]}>
                    DISCOUNT
                  </Text>
                </View>
                <View style={defaultStyles.mrgH20}>
                  <Text>{selectedOrder.discount}</Text>
                </View>
              </View>
              <View
                style={[defaultStyles.rowSpacingFlex, cachierStyles.singleLine]}
              >
                <View style={defaultStyles.mrgH20}>
                  <Text style={[defaultStyles.fWB, defaultStyles.fs15]}>
                    TOTAL
                  </Text>
                </View>
                <View style={defaultStyles.mrgH20}>
                  <Text>{selectedOrder.totalPrice}</Text>
                </View>
              </View>
              <View
                style={[defaultStyles.rowSpacingFlex, cachierStyles.singleLine]}
              >
                <View style={defaultStyles.mrgH20}>
                  <Text style={[defaultStyles.fWB, defaultStyles.fs15]}>
                    SUBTOTAL
                  </Text>
                </View>
                <View style={defaultStyles.mrgH20}>
                  <Text>TOTAL</Text>
                </View>
              </View>
            </View>
            <View style={cachierStyles.printOrderDetail}>
              {selectedOrder.orderType === "Delivery" ? (
                <>
                  <View>
                    <Text>Order Details</Text>
                  </View>
                  <View style={cachierStyles.printOrderDetail}>
                    <View
                      style={[
                        defaultStyles.rowSpacingFlex,
                        cachierStyles.singleLine,
                      ]}
                    >
                      <View style={defaultStyles.mrgH20}>
                        <Text style={[defaultStyles.fWB, defaultStyles.fs15]}>
                          Name
                        </Text>
                      </View>
                      <View style={defaultStyles.mrgH20}>
                        <Text>TOTAL</Text>
                      </View>
                    </View>
                    <View
                      style={[
                        defaultStyles.rowSpacingFlex,
                        cachierStyles.singleLine,
                      ]}
                    >
                      <View style={defaultStyles.mrgH20}>
                        <Text style={[defaultStyles.fWB, defaultStyles.fs15]}>
                          Telephone
                        </Text>
                      </View>
                      <View style={defaultStyles.mrgH20}>
                        <Text>TOTAL</Text>
                      </View>
                    </View>
                    <View
                      style={[
                        defaultStyles.rowSpacingFlex,
                        cachierStyles.singleLine,
                      ]}
                    >
                      <View style={defaultStyles.mrgH20}>
                        <Text style={[defaultStyles.fWB, defaultStyles.fs15]}>
                          Email
                        </Text>
                      </View>
                      <View style={defaultStyles.mrgH20}>
                        <Text>TOTAL</Text>
                      </View>
                    </View>
                    <View
                      style={[
                        defaultStyles.rowSpacingFlex,
                        cachierStyles.singleLine,
                      ]}
                    >
                      <View style={defaultStyles.mrgH20}>
                        <Text style={[defaultStyles.fWB, defaultStyles.fs15]}>
                          Shipping method
                        </Text>
                      </View>
                      <View style={defaultStyles.mrgH20}>
                        <Text>TOTAL</Text>
                      </View>
                    </View>
                  </View>
                </>
              ) : null}
            </View>
          </View>

          <View style={defaultStyles.rowCenteredFlex}>
            <Pressable
              style={[
                defaultStyles.mrg15,
                defaultStyles.padH16,
                defaultStyles.padV8,
                { backgroundColor: `#f0f`, borderRadius: 5 },
              ]}
              onPress={handlePrint}
            >
              <Text style={[defaultStyles.fWB, defaultStyles.fs16]}>Print</Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>
    </>
  ) : (
    <View>
      <Text>Unexpected Error</Text>
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    selectedOrder: state.orders.selectedOrder,
    productData: state.products.productData,
    tableData: state.tables.tableData,
    floorData: state.floors.floorData,
    isLoading: state.loadingErrors.isLoading,
    isError: state.loadingErrors.isError,
  };
};

const mapDispatchToProps = {
  getOrderById,
  fetchProductData,
  fetchTableData,
  fetchFloorData,
};
export default connect(mapStateToProps, mapDispatchToProps)(PrintSlip);
