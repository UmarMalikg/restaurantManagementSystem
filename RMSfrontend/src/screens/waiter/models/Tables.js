import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Pressable, Platform } from "react-native";
import waiterStyles from "../../styles/waiterStyles";
import { useNavigation } from "@react-navigation/native";
import { SearchBar } from "react-native-elements";

import { connect } from "react-redux";
import { fetchTableData } from "../../../redux/actions/tableActions";

import { useAppContext } from "../../../context/States";
import defaultStyles from "../../../defaultStyles";
let isWeb = Platform.OS === "web";

// setSelectedTable

const Tables = ({ tableData, fetchTableData }) => {
  const [search, setSearch] = useState("");

  const { updateSelectedTable } = useAppContext();

  useEffect(() => {
    fetchTableData();
  }, [fetchTableData]);

  const navigation = useNavigation();

  const filteredData = search
    ? tableData.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      )
    : tableData;

  const updateSearch = (text) => {
    setSearch(text);
  };

  const selectTable = (tableID) => {
    updateSelectedTable(tableID);
    navigation.navigate("WaiterHome");
  };

  return (
    <View style={waiterStyles.tables}>
      <View style={waiterStyles.tableBox}>
        <View style={waiterStyles.cancelButtonPosition}>
          <Pressable
            onPress={() => navigation.navigate("WaiterHome")}
            style={waiterStyles.cancelButton}
          >
            <Text style={[{ fontSize: 19, color: "#f00" }, defaultStyles.fWB]}>
              X
            </Text>
          </Pressable>
        </View>
        <View style={{ position: "absolute", left: 10, top: 10 }}>
          <Text style={{ fontWeight: "bold", fontSize: 28 }}>Select Table</Text>
        </View>
        <View style={{ marginTop: 45 }}>
          <SearchBar
            containerStyle={waiterStyles.sideSearchEngine}
            inputContainerStyle={waiterStyles.sideSearchInputEngine}
            inputStyle={{ fontSize: 16 }}
            placeholder="Search..."
            onChangeText={updateSearch}
            value={search}
          />
          <ScrollView>
            <View
              style={{
                ...(isWeb && {
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
                  padding: 20,
                }),
              }}
            >
              {tableData &&
                filteredData.map((table) => (
                  <Pressable
                    style={[
                      waiterStyles.sideBarTables,
                      table.isReserved && { backgroundColor: "red" },
                    ]}
                    key={table._id}
                    onPress={() => selectTable(table._id)}
                  >
                    <Text key={table._id}>{table.name}</Text>
                  </Pressable>
                ))}
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    tableData: state.tables.tableData,
  };
};

const mapDispatchToProps = {
  fetchTableData,
};

export default connect(mapStateToProps, mapDispatchToProps)(Tables);
