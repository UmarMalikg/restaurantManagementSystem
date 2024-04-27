import { View, Text, Pressable, ScrollView, Image } from "react-native";
import React, { useEffect, useState, useRef, useContext } from "react";
import cachierStyles from "../styles/cachierStyles";
import defaultStyles from "../../defaultStyles";
import { connect } from "react-redux";
import {
  getOrderById,
  updateDiscount,
  updatedeliveryCharges,
} from "../../redux/actions/orderActions";
import { fetchProductData } from "../../redux/actions/productAction";
import { fetchTableData } from "../../redux/actions/tableActions";
import { fetchFloorData } from "../../redux/actions/floorActions";
import { isWeb } from "../../constants/stylesConstants";
import ViewShot from "react-native-view-shot";
import SocketContext from "../../context/socketContext";
import {
  emitSocket,
  changeViaSocket,
} from "../../socketConfig/socketFunctions";

import * as Print from "expo-print";

import Loader from "../Loader";
import ErrorPage from "../ErrorPage";
import { TextInput } from "react-native-paper";
import QRCode from "react-native-qrcode-svg";

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
  updateDiscount,
  updatedeliveryCharges,
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
  const socket = useContext(SocketContext);

  const handlePrint = async () => {
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    if (!isFBR && FBRInvoice === "") {
      alert("Please generate a FBR invoice");
      return;
    }
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

  const [isFBR, setIsFBR] = useState(false);
  const [FBRInvoice, setFBRInvoice] = useState("");

  const genrateRandom18digit = () => {
    let result = "";
    for (let i = 0; i < 18; i++) {
      result += Math.floor(Math.random() * 10); // Generates a random digit from 0 to 9
    }
    return result;
  };

  const generateFBRInvoice = () => {
    if (!isFBR) {
      const randomInvoice = genrateRandom18digit();
      setFBRInvoice(randomInvoice);
      setIsFBR(true);
    } else {
      alert("Invoice already generated");
      return;
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

  const handleOrderChanged = () => {
    getOrderById(orderId); // Wait for the data to be fetched
    console.log("Floor data fetched successfully");
  };
  useEffect(() => {
    changeViaSocket(socket, "orderChanged", handleOrderChanged);
  }, [socket]);

  useEffect(() => {
    if (selectedOrder !== null) {
      console.log("not noll", selectedOrder);
    }
  }, [selectedOrder]);

  console.log("discount", selectedOrder !== null && selectedOrder.discount);

  const [discount, setDiscount] = useState(
    selectedOrder !== null ? selectedOrder.discount : 0
  );
  const [addDeliveryCharges, setAddDeliveryCharges] = useState(
    selectedOrder !== null ? selectedOrder.deliveryCharges : 0
  );

  const makeChanges = async () => {
    try {
      // Call the updateDiscount action to update the discount for the order
      await updateDiscount(orderId, discount);
      await updatedeliveryCharges(orderId, addDeliveryCharges);
      emitSocket(socket, "orderChanged");
      // Optionally, you can navigate to another screen or perform any other action upon successful update
    } catch (err) {
      console.error("Error updating discount:", err);
      // Handle errors, such as displaying an error message to the user
    }
  };

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
              backgroundColor: "#e1e1e1",
              borderColor: "#f00",
              padding: 20,
            }} /*print this view and its child by capturing only the info from this view*/
          >
            <View>
              <View style={defaultStyles.rowCenteredFlex}>
                {/* <View>
                  <Text>Logo</Text>
                </View> */}
                <View>
                  <Image
                    source={require("../../../assets/images/blogo.png")}
                    style={{ height: 70, width: 150 }}
                  />
                </View>
                {/* <View>
                  <Text>QR Code</Text>
                </View> */}
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
                    {selectedOrder && selectedOrder.orderNo}
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
                    {selectedOrder.orderType === "Dine-In"
                      ? tableData.find((t) => t._id === selectedOrder.tableNo)
                          ?.name
                        ? `${
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
                        : "NA"
                      : selectedOrder.orderType === "Delivery"
                      ? selectedOrder.deliveryAddress || "NA"
                      : selectedOrder.customerName || "NA"}
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
                const product =
                  productData && productData.find((p) => p._id === item.item); // Find corresponding product

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
              {selectedOrder && selectedOrder.orderType === "Delivery" && (
                <View
                  style={[
                    defaultStyles.rowSpacingFlex,
                    cachierStyles.singleLine,
                  ]}
                >
                  <View style={defaultStyles.mrgH20}>
                    <Text style={[defaultStyles.fWB, defaultStyles.fs15]}>
                      delivery Charges
                    </Text>
                  </View>
                  <View style={defaultStyles.mrgH20}>
                    <Text>{selectedOrder.deliveryCharges}</Text>
                  </View>
                </View>
              )}

              <View
                style={[defaultStyles.rowSpacingFlex, cachierStyles.singleLine]}
              >
                <View style={defaultStyles.mrgH20}>
                  <Text style={[defaultStyles.fWB, defaultStyles.fs15]}>
                    SUBTOTAL
                  </Text>
                </View>
                <View style={defaultStyles.mrgH20}>
                  <Text>{selectedOrder.subTotal}</Text>
                </View>
              </View>
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
                  <Text>
                    {selectedOrder.discount}
                    {" %"}
                  </Text>
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
            </View>
            {/* <View style={cachierStyles.printOrderDetail}>
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
            </View> */}
            {isFBR && (
              <View>
                <View
                  style={[defaultStyles.colCenteredFlex, defaultStyles.mrgT10]}
                >
                  <View>
                    <Text style={[defaultStyles.fWB, defaultStyles.mrgR10]}>
                      FBR Invoice #
                    </Text>
                  </View>
                  <View>
                    <Text>{FBRInvoice && FBRInvoice}</Text>
                  </View>
                </View>
                <View
                  style={[
                    defaultStyles.rowSpacingAroundFlex,
                    defaultStyles.mrgT10,
                  ]}
                >
                  <View>
                    <Image
                      source={require("../../../assets/images/fbrlogo.png")}
                      style={{ height: 100, width: 100 }}
                    />
                  </View>

                  <View>
                    <QRCode value={FBRInvoice && `${FBRInvoice}`} size={100} />
                  </View>
                </View>
              </View>
            )}
          </View>
        </ScrollView>
      </View>
      <View>
        <View
          style={[
            {
              position: "absolute",
              top: 100,
              left: 200,
              height: "80%",
              width: "40%",
            },
          ]}
        >
          <View style={[defaultStyles.mrg10]}>
            <Text>Add Discount</Text>
            <TextInput
              style={[{ borderRadius: 10, backgroundColor: "#fff" }]}
              placeholder="Add Discount in %age"
              value={discount === 0 ? "" : discount.toString()} // Bind the discount state to the TextInput value
              onChangeText={(text) => {
                const parsedDiscount = parseFloat(text);
                if (
                  !isNaN(parsedDiscount) &&
                  parsedDiscount >= 0 &&
                  parsedDiscount <= 100
                ) {
                  // If the input is a valid number between 0 and 100, update the discount state
                  setDiscount(parsedDiscount);
                } else if (text === "") {
                  // If the input is empty, set the discount to 0
                  setDiscount(0);
                }
              }}
            />
          </View>
          {selectedOrder && selectedOrder.orderType === "Delivery" && (
            <View style={[defaultStyles.mrg10]}>
              <Text>Add Delivery Charges</Text>
              <TextInput
                style={[{ borderRadius: 10, backgroundColor: "#fff" }]}
                placeholder="Add delivery Charges"
                value={
                  addDeliveryCharges === 0 ? "" : addDeliveryCharges.toString()
                }
                onChangeText={(text) => {
                  const parsedDeliveryCharges = parseFloat(text);
                  if (
                    !isNaN(parsedDeliveryCharges) &&
                    parsedDeliveryCharges >= 0 &&
                    parsedDeliveryCharges <= 100
                  ) {
                    // If the input is a valid number between 0 and 100, update the discount state
                    setAddDeliveryCharges(parsedDeliveryCharges);
                  } else if (text === "") {
                    // If the input is empty, set the discount to 0
                    setAddDeliveryCharges(0);
                  }
                }}
              />
            </View>
          )}

          <View>
            <Pressable
              onPress={makeChanges}
              style={[
                defaultStyles.padH12,
                defaultStyles.padV6,
                defaultStyles.mrg10,
                { backgroundColor: "#2196F3", borderRadius: 5 },
              ]}
            >
              <Text
                style={[
                  defaultStyles.fWB,
                  defaultStyles.fs16,
                  { textAlign: "center", color: "#fff" },
                ]}
              >
                Save Changes
              </Text>
            </Pressable>
            <Pressable
              onPress={generateFBRInvoice}
              style={[
                defaultStyles.padH12,
                defaultStyles.padV6,
                defaultStyles.mrg10,
                { backgroundColor: "#FF9800", borderRadius: 5 },
              ]}
            >
              <Text
                style={[
                  defaultStyles.fWB,
                  defaultStyles.fs16,
                  { textAlign: "center", color: "#fff" },
                ]}
              >
                Generate FBR Invoice
              </Text>
            </Pressable>
            <Pressable
              style={[
                defaultStyles.padH12,
                defaultStyles.padV6,
                defaultStyles.mrg10,
                { backgroundColor: `#4CAF50`, borderRadius: 5 },
              ]}
              onPress={handlePrint}
            >
              <Text
                style={[
                  defaultStyles.fWB,
                  defaultStyles.fs16,
                  { color: "#fff", textAlign: "center" },
                ]}
              >
                Print
              </Text>
            </Pressable>
          </View>
        </View>
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
  updateDiscount,
  fetchProductData,
  fetchTableData,
  fetchFloorData,
  updatedeliveryCharges,
};
export default connect(mapStateToProps, mapDispatchToProps)(PrintSlip);
