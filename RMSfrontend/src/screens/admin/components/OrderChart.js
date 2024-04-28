import { View } from "react-native";
import React, { useEffect, useContext } from "react";
import adminStyles from "../../styles/adminStyles";
import { connect } from "react-redux";
import { Chart } from "react-google-charts";

import { fetchOrderData } from "../../../redux/actions/orderActions";

import SocketContext from "../../../context/socketContext";
import { changeViaSocket } from "../../../socketConfig/socketFunctions";
import Loader from "../../Loader";
import ErrorPage from "../../ErrorPage";

const OrderChart = ({ fetchOrderData, orderData, isLoading, isError }) => {
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
  const dineIn =
    orderData &&
    orderData.filter((o) => o && o.orderType && o.orderType === "Dine-In")
      .length;
  const delivery =
    orderData &&
    orderData.filter((o) => o && o.orderType && o.orderType === "Delivery")
      .length;
  const takeAway =
    orderData &&
    orderData.filter((o) => o && o.orderType && o.orderType === "Take-Away")
      .length;

  const data = [
    ["Ingredient", "Quantity"],
    ["Dine-In", dineIn],
    ["Delivery", delivery],
    ["Take-Away", takeAway],
  ];
  const options = {
    title: "Order Types",
    pieHole: 0.4, // Set to 0 for a regular pie chart
    colors: ["#008080", "#000080", "#FF8C00"],
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

export default connect(mapStateToProps, mapDispatchToProps)(OrderChart);
