import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import adminStyles from "./styles/style";
import { useNavigation } from "@react-navigation/native";
import { Table, Row } from "react-native-table-component";
import { connect } from "react-redux";
import { fetchEmployeeData } from "../../redux/actions/employeeActions";
import { fetchEmployeePositionData } from "../../redux/actions/employeePositionActions";

const Employees = ({
  fetchEmployeeData,
  employeeData,
  fetchEmployeePositionData,
  employeePositionData,
}) => {
  useEffect(() => {
    fetchEmployeeData();
    fetchEmployeePositionData();
  }, [fetchEmployeeData, fetchEmployeePositionData]);

  const navigation = useNavigation();

  const [searchText, setSearchText] = useState("");
  const filteredEmployeeData = employeeData.filter((employee) =>
    employee.userName.toLowerCase().includes(searchText.toLowerCase())
  );

  let serialNo = 1;

  const tableHead = [
    "Sr#No",
    "Image",
    "Name",
    "User Name",
    "dOB",
    "Gender",
    "Email",
    "Phone",
    "Salary",
    "Position",
  ];
  const tableData = filteredEmployeeData.map((employee) => [
    serialNo++,
    <Image
      source={{
        uri: `http://localhost:8080/${employee.photo.replace(/\\/g, "/")}`,
      }}
      style={{ width: 50, height: 50, borderRadius: 50 }}
    />,
    employee.personalInfo.firstName + employee.personalInfo.lastName,
    employee.userName,
    employee.personalInfo.dateOfBirth,
    employee.personalInfo.gender,
    employee.personalInfo.email,
    employee.personalInfo.phone,
    employee.salary,
    employeePositionData.find((position) => position._id === employee.position)
      ?.name || "N/A",
  ]);

  const widthArr = [80, 80, 80, 80, 81, 80, 80, 80, 80, 80, 80];

  const rows = tableData.map((rowData, index) => (
    <Row
      key={index}
      data={rowData}
      widthArr={widthArr}
      textStyle={adminStyles.tableDataText}
      style={index % 2 === 0 ? adminStyles.evenRow : adminStyles.oddRow}
    />
  ));
  return (
    <View style={adminStyles.theScreen}>
      <View style={adminStyles.dataViewerHeader}>
        <View>
          <Text style={adminStyles.dataTitle}>All Employees</Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate("Add Employee")}
          style={adminStyles.goToModelButton}
        >
          <Text style={adminStyles.goToModelButtonText}>Add Employees</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TextInput
          style={adminStyles.dataSearcher}
          placeholder="Search..."
          onChangeText={(text) => setSearchText(text)}
        ></TextInput>
      </View>
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
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    employeeData: state.employees.employeeData,
    employeePositionData: state.employeePositions.employeePositionData,
  };
};

const mapDispatchToProps = {
  fetchEmployeeData,
  fetchEmployeePositionData,
};
export default connect(mapStateToProps, mapDispatchToProps)(Employees);
