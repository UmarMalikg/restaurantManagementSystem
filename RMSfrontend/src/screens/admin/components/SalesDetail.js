import { View, Text } from "react-native";
import React, { useEffect } from "react";
import adminStyles from "../../styles/adminStyles";
import { connect } from "react-redux";
import { Chart } from "react-google-charts";

import { fetchOrderData } from "../../../redux/actions/orderActions";

const SalesDetail = ({ fetchOrderData, orderData }) => {
  useEffect(() => {
    fetchOrderData();
  }, [fetchOrderData]);

  const pending =
    orderData &&
    orderData.filter((o) => o.status === "Pending" && !o.isPaid).length;
  const preparing =
    orderData &&
    orderData.filter((o) => o.status === "Preparing" && !o.isPaid).length;
  const ready =
    orderData &&
    orderData.filter((o) => o.status === "Ready" && !o.isPaid).length;
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
    colors: ["#FFD700", "#FF6347", "#87CEEB", "#FFA07F", "#FF00F0"],
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
  };
};

const mapDispatchToProps = {
  fetchOrderData,
};

export default connect(mapStateToProps, mapDispatchToProps)(SalesDetail);
