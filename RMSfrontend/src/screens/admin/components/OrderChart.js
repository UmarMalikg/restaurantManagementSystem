import { View, Text } from "react-native";
import React, { useEffect } from "react";
import adminStyles from "../../styles/adminStyles";
import { connect } from "react-redux";
import { Chart } from "react-google-charts";

import { fetchOrderData } from "../../../redux/actions/orderActions";

const OrderChart = ({ fetchOrderData, orderData }) => {
  useEffect(() => {
    fetchOrderData();
  }, [fetchOrderData]);

  const dineIn =
    orderData && orderData.filter((o) => o.orderType === "Dine-In").length;
  const delivery =
    orderData && orderData.filter((o) => o.orderType === "Delivery").length;
  const takeAway =
    orderData && orderData.filter((o) => o.orderType === "Take-Away").length;

  console.log(dineIn, takeAway, delivery);

  const data = [
    ["Ingredient", "Quantity"],
    ["Dine-In", dineIn],
    ["Delivery", delivery],
    ["Take-Away", takeAway],
  ];
  const options = {
    title: "Order Types",
    pieHole: 0.4, // Set to 0 for a regular pie chart
    colors: ["#FFD700", "#FF6347", "#87CEEB"],
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

export default connect(mapStateToProps, mapDispatchToProps)(OrderChart);
