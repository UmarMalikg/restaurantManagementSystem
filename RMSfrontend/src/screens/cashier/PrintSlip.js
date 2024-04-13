import { View, Text } from "react-native";
import React, { useEffect } from "react";
import cachierStyles from "../styles/cachierStyles";
import defaultStyles from "../../defaultStyles";
import { connect } from "react-redux";
import { getOrderById } from "../../redux/actions/orderActions";
import { fetchProductData } from "../../redux/actions/productAction";
import { fetchTableData } from "../../redux/actions/tableActions";

import Loader from "../Loader";
import ErrorPage from "../ErrorPage";

const PrintSlip = ({
  route,
  getOrderById,
  selectedOrder,
  fetchProductData,
  productData,
  fetchTableData,
  tableData,
  isLoading,
  isError,
}) => {
  const { orderId } = route.params;

  useEffect(() => {
    getOrderById(orderId);
    fetchProductData();
    fetchTableData();
  }, [getOrderById, orderId, fetchProductData, fetchProductData]);

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
    <View style={cachierStyles.print}>
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
        <View style={[defaultStyles.rowSpacingFlex, cachierStyles.singleLine]}>
          <View style={defaultStyles.mrgH20}>
            <Text style={[defaultStyles.fWB, defaultStyles.fs15]}>
              Order Number
            </Text>
          </View>
          <View style={defaultStyles.mrgH20}>
            <Text style={[defaultStyles.fWB, defaultStyles.fs15]}>on</Text>
          </View>
        </View>
        {/* Others will be here */}
        <View style={[defaultStyles.rowSpacingFlex, cachierStyles.singleLine]}>
          <View style={defaultStyles.mrgH20}>
            <Text style={[defaultStyles.fWB, defaultStyles.fs15]}>Date</Text>
          </View>
          <View style={defaultStyles.mrgH20}>
            <Text>{Date.now()}</Text>
          </View>
        </View>

        <View style={[defaultStyles.rowSpacingFlex, cachierStyles.singleLine]}>
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
                ? tableData.find((t) => t._id === selectedOrder.tableNo)?.name
                : null}
            </Text>
          </View>
        </View>
        <View style={[defaultStyles.rowSpacingFlex, cachierStyles.singleLine]}>
          <View style={defaultStyles.mrgH20}>
            <Text style={[defaultStyles.fWB, defaultStyles.fs15]}>Total</Text>
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

        <View style={[defaultStyles.rowSpacingFlex, cachierStyles.singleLine]}>
          <View style={defaultStyles.mrgH20}>
            <Text style={[defaultStyles.fWB, defaultStyles.fs15]}>
              Time Ordered
            </Text>
          </View>
          <View style={defaultStyles.mrgH20}>
            <Text>{selectedOrder.updatedAt}</Text>
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
        <View style={[defaultStyles.rowSpacingFlex, cachierStyles.singleLine]}>
          <View style={defaultStyles.mrgH20}>
            <Text style={[defaultStyles.fWB, defaultStyles.fs15]}>
              PRODUCTS
            </Text>
          </View>
          <View style={defaultStyles.mrgH20}>
            <Text style={[defaultStyles.fWB, defaultStyles.fs15]}>TOTAL</Text>
          </View>
        </View>

        {/* Render order items */}
        {selectedOrder.orderItems.map((item) => {
          const product = productData.find((p) => p._id === item.item); // Find corresponding product

          return (
            <View
              key={item._id}
              style={[defaultStyles.rowSpacingFlex, cachierStyles.singleLine]}
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
        <View style={[defaultStyles.rowSpacingFlex, cachierStyles.singleLine]}>
          <View style={defaultStyles.mrgH20}>
            <Text style={[defaultStyles.fWB, defaultStyles.fs15]}>
              SUBTOTAL
            </Text>
          </View>
          <View style={defaultStyles.mrgH20}>
            <Text>TOTAL</Text>
          </View>
        </View>
        <View style={[defaultStyles.rowSpacingFlex, cachierStyles.singleLine]}>
          <View style={defaultStyles.mrgH20}>
            <Text style={[defaultStyles.fWB, defaultStyles.fs15]}>TAX</Text>
          </View>
          <View style={defaultStyles.mrgH20}>
            <Text>{selectedOrder.taxPrice}</Text>
          </View>
        </View>
        <View style={[defaultStyles.rowSpacingFlex, cachierStyles.singleLine]}>
          <View style={defaultStyles.mrgH20}>
            <Text style={[defaultStyles.fWB, defaultStyles.fs15]}>
              PAYMENT METHOD
            </Text>
          </View>
          <View style={defaultStyles.mrgH20}>
            <Text>TOTAL</Text>
          </View>
        </View>
        <View style={[defaultStyles.rowSpacingFlex, cachierStyles.singleLine]}>
          <View style={defaultStyles.mrgH20}>
            <Text style={[defaultStyles.fWB, defaultStyles.fs15]}>TOTAL</Text>
          </View>
          <View style={defaultStyles.mrgH20}>
            <Text>{selectedOrder.totalPrice}</Text>
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
                style={[defaultStyles.rowSpacingFlex, cachierStyles.singleLine]}
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
                style={[defaultStyles.rowSpacingFlex, cachierStyles.singleLine]}
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
                style={[defaultStyles.rowSpacingFlex, cachierStyles.singleLine]}
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
                style={[defaultStyles.rowSpacingFlex, cachierStyles.singleLine]}
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
    isLoading: state.loadingErrors.isLoading,
    isError: state.loadingErrors.isError,
  };
};

const mapDispatchToProps = {
  getOrderById,
  fetchProductData,
  fetchTableData,
};
export default connect(mapStateToProps, mapDispatchToProps)(PrintSlip);
