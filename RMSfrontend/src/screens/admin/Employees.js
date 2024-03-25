import {
  View,
  Text,
  Pressable,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import adminStyles from "../styles/adminStyles";
import { useNavigation } from "@react-navigation/native";
import { Table, Row } from "react-native-table-component";
import { connect } from "react-redux";
import {
  fetchEmployeeData,
  deleteEmployee,
} from "../../redux/actions/employeeActions";

const Employees = ({ fetchEmployeeData, employeeData, deleteEmployee }) => {
  useEffect(() => {
    fetchEmployeeData();
  }, [fetchEmployeeData]);

  const navigation = useNavigation();

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
        uri: `http://localhost:8080/${employee.photo.replace(/\\/g, "/")}`,
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
        <Text>delete</Text>
      </Pressable>
      <Pressable
        onPress={() => {
          goToUpdate(employee._id);
        }}
      >
        <Text>edit</Text>
      </Pressable>
    </View>,
  ]);

  const widthArr = [60, 80, 150, 60, 180, 120, 80, 80];

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
  };
};

const mapDispatchToProps = {
  fetchEmployeeData,
  deleteEmployee,
};
export default connect(mapStateToProps, mapDispatchToProps)(Employees);
