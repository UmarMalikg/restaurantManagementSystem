import {
  View,
  Text,
  Pressable,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useEffect, useState, useContext } from "react";
import adminStyles from "../styles/adminStyles";
import { useNavigation } from "@react-navigation/native";
import { Table, Row } from "react-native-table-component";
import { connect } from "react-redux";
import {
  fetchEmployeeData,
  deleteEmployee,
} from "../../redux/actions/employeeActions";

import SocketContext from "../../context/socketContext";
import { changeViaSocket } from "../../socketConfig/socketFunctions";

import Loader from "../Loader";
import ErrorPage from "../ErrorPage";

import AdminDeleteIcon from "../common/AdminDeleteIcon";
import AdminEditIcon from "../common/AdminEditIcon";

const Employees = ({
  fetchEmployeeData,
  employeeData,
  deleteEmployee,
  isLoading,
  isError,
}) => {
  useEffect(() => {
    fetchEmployeeData();
  }, [fetchEmployeeData]);

  const handleEmployeeChanged = () => {
    fetchEmployeeData(); // Wait for the data to be fetched
    console.log("Floor data fetched successfully");
  };
  useEffect(() => {
    changeViaSocket(socket, "employeeChanged", handleEmployeeChanged);
  }, [socket]);

  const navigation = useNavigation();
  const socket = useContext(SocketContext);

  const [searchText, setSearchText] = useState("");
  const filteredEmployeeData = employeeData.filter((employee) =>
    employee.userName.toLowerCase().includes(searchText.toLowerCase())
  );

  const goToUpdate = (employeeId) => {
    navigation.navigate("Update Employee", { employeeId });
  };

  let serialNo = 1;

  const tableHead = [
    "Sr#No",
    "Image",
    "Name",
    "Gender",
    "Email",
    "Phone",
    "Salary",
    "Actions",
  ];
  const tableData = filteredEmployeeData.map((employee) => [
    serialNo++,
    <Image
      source={{
        uri: `${employee.photo}`,
      }}
      style={{ width: 50, height: 50, borderRadius: 50 }}
    />,
    `${employee.personalInfo.firstName} ${employee.personalInfo.lastName}`,
    employee.personalInfo.gender,
    employee.personalInfo.email,
    employee.personalInfo.phone,
    employee.salary,
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
      }}
    >
      <Pressable onPress={() => deleteEmployee(employee._id)}>
        <AdminDeleteIcon />
      </Pressable>
      <Pressable
        onPress={() => {
          goToUpdate(employee._id);
        }}
      >
        <AdminEditIcon />
      </Pressable>
    </View>,
  ]);

  const widthArr = [60, 90, 180, 90, 230, 160, 100, 120];

  const rows = tableData.map((rowData, index) => (
    <Row
      key={index}
      data={rowData}
      widthArr={widthArr}
      textStyle={adminStyles.tableDataText}
      style={index % 2 === 0 ? adminStyles.evenRow : adminStyles.oddRow}
    />
  ));

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <ErrorPage />;
  }

  return (
    <View style={adminStyles.theScreen}>
      <View style={adminStyles.dataViewerHeader}>
        <View>
          <Text style={adminStyles.dataTitle}>All Employees</Text>
        </View>
        <Pressable
          onPress={() => navigation.navigate("Add Employee")}
          style={adminStyles.goToModelButton}
        >
          <Text style={adminStyles.goToModelButtonText}>Add Employees</Text>
        </Pressable>
      </View>
      <View>
        <TextInput
          style={adminStyles.dataSearcher}
          placeholder="Search..."
          onChangeText={(text) => setSearchText(text)}
        ></TextInput>
      </View>
      <ScrollView>
        <View style={adminStyles.tablePosition}>
          <Table
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Row
              widthArr={widthArr}
              data={tableHead}
              style={adminStyles.tableHead}
              textStyle={adminStyles.tableHeadText}
            />
            {rows}
          </Table>
        </View>
      </ScrollView>
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
  deleteEmployee,
};
export default connect(mapStateToProps, mapDispatchToProps)(Employees);
