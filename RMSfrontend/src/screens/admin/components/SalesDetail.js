import { View, Text } from "react-native";
import React, { useEffect, useContext } from "react";
import adminStyles from "../../styles/adminStyles";
import { connect } from "react-redux";
import { Chart } from "react-google-charts";

import { fetchOrderData } from "../../../redux/actions/orderActions";
import SocketContext from "../../../context/socketContext";
import { changeViaSocket } from "../../../socketConfig/socketFunctions";

import Loader from "../../Loader";
import ErrorPage from "../../ErrorPage";

const SalesDetail = ({ fetchOrderData, orderData, isLoading, isError }) => {
  const socket = useContext(SocketContext);
  useEffect(() => {
    fetchOrderData();
  }, [fetchOrderData]);

  const handleOrderChange = () => {
    fetchOrderData(); // Wait for the data to be fetched
    console.log("Order data fetched successfully");
  };
  useEffect(() => {
    changeViaSocket(socket, "orderChanged", handleOrderChange);
  }, [socket]);

  const pending =
    orderData &&
    orderData.filter(
      (o) => o && o.status && o.status === "Pending" && !o.isPaid
    ).length;
  const preparing =
    orderData &&
    orderData.filter(
      (o) => o && o.status && o.status === "Preparing" && !o.isPaid
    ).length;
  const ready =
    orderData &&
    orderData.filter((o) => o && o.status && o.status === "Ready" && !o.isPaid)
      .length;
  const delivered =
    orderData &&
    orderData.filter(
      (o) => (o.status === "Delivered" || o.status === "Completed") && !o.isPaid
    ).length;
  const paid = orderData && orderData.filter((o) => o.isPaid).length;
  console.log(
    "pending",
    pending,
    "preparing",
    preparing,
    "ready",
    ready,
    "delivered",
    delivered,
    "paid",
    paid
  );
  const data = [
    ["Ingredient", "Quantity"],
    ["Pending", pending],
    ["Preparing", preparing],
    ["Ready", ready],
    ["Delivered", delivered],
    ["Paid", paid],
  ];
  const options = {
    title: "Order Status",
    pieHole: 0.4, // Set to 0 for a regular pie chart
    colors: ["#FFA500", "#FFA07F", "#ADD8E6", "#90EE90", "#BA55D3"],
  };

  return (
    <View style={adminStyles.chartBoxes}>
      <Chart
        chartType="PieChart"
        data={data}
        options={options}
        width="100%"
        height="290px"
      />
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    orderData: state.orders.orderData,
    isLoading: state.loadingErrors.isLoading,
    isError: state.loadingErrors.isError,
  };
};

const mapDispatchToProps = {
  fetchOrderData,
};

export default connect(mapStateToProps, mapDispatchToProps)(SalesDetail);
