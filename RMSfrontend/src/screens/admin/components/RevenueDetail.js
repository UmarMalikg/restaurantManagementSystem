import { View } from "react-native";
import React, { useEffect, useContext } from "react";
import adminStyles from "../../styles/adminStyles";
import { connect } from "react-redux";
import { Chart } from "react-google-charts";

import { fetchEmployeeData } from "../../../redux/actions/employeeActions";

import SocketContext from "../../../context/socketContext";
import { changeViaSocket } from "../../../socketConfig/socketFunctions";
import Loader from "../../Loader";
import ErrorPage from "../../ErrorPage";

const RevenueDetail = ({
  fetchEmployeeData,
  employeeData,
  isLoading,
  isError,
}) => {
  const socket = useContext(SocketContext);
  useEffect(() => {
    fetchEmployeeData();
  }, [fetchEmployeeData]);

  const handleEmplyeeChange = () => {
    fetchEmployeeData(); // Wait for the data to be fetched
    console.log("Employee data fetched successfully");
  };
  useEffect(() => {
    changeViaSocket(socket, "employeeChanged", handleEmplyeeChange);
  }, [socket]);

  const admin = employeeData && employeeData.filter((e) => e.isAdmin).length;
  const waiter = employeeData && employeeData.filter((e) => e.isWaiter).length;
  const Kitchen =
    employeeData && employeeData.filter((e) => e && e.isKitchenManager).length;
  const cachier =
    employeeData && employeeData.filter((e) => e && e.isCachier).length;
  const receptionist =
    employeeData && employeeData.filter((e) => e && e.isReceptionist).length;

  const data = [
    ["Ingredient", "Quantity"],
    ["Admins", admin],
    ["Kitchen Staff", Kitchen],
    ["Waiter", waiter],
    ["Cachiers", cachier],
    ["Receptionist", receptionist],
  ];
  const options = {
    title: "Employee Record",
    pieHole: 0.4, // Set to 0 for a regular pie chart
    colors: ["#00008B", "#8B0000", "#006400", "#FFA500", "#4B0082"],
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
    employeeData: state.employees.employeeData,
    isLoading: state.loadingErrors.isLoading,
    isError: state.loadingErrors.isError,
  };
};

const mapDispatchToProps = {
  fetchEmployeeData,
};

export default connect(mapStateToProps, mapDispatchToProps)(RevenueDetail);
