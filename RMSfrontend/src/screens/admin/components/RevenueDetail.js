import { View } from "react-native";
import React, { useEffect } from "react";
import adminStyles from "../../styles/adminStyles";
import { connect } from "react-redux";
import { Chart } from "react-google-charts";

import { fetchEmployeeData } from "../../../redux/actions/employeeActions";

const RevenueDetail = ({ fetchEmployeeData, employeeData }) => {
  useEffect(() => {
    fetchEmployeeData();
  }, [fetchEmployeeData]);

  const admin = employeeData && employeeData.filter((e) => e.isAdmin).length;
  const waiter = employeeData && employeeData.filter((e) => e.isWaiter).length;
  const Kitchen =
    employeeData && employeeData.filter((e) => e.isKitchenManager).length;
  const cachier =
    employeeData && employeeData.filter((e) => e.isCachier).length;
  const receptionist =
    employeeData && employeeData.filter((e) => e.isReceptionist).length;

  const data = [
    ["Ingredient", "Quantity"],
    ["Admins", admin],
    ["Kitchen Staff", Kitchen],
    ["Waiter", waiter],
    ["Cachiers", cachier],
    ["Receptionist", receptionist],
  ];
  const options = {
    title: "Order Types",
    pieHole: 0.4, // Set to 0 for a regular pie chart
    colors: ["#FFD700", "#FF6347", "#87CEEB", "#FFDAAA", "#000F47"],
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
  };
};

const mapDispatchToProps = {
  fetchEmployeeData,
};

export default connect(mapStateToProps, mapDispatchToProps)(RevenueDetail);
