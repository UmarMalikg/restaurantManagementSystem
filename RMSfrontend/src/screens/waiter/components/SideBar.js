import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import waiterStyles from "../styles/style";
import { SearchBar } from "react-native-elements";

import { connect } from "react-redux";
import {
  fetchTableData,
  makeTableReserved,
} from "../../../redux/actions/tableActions";

const SideBar = ({ tableData, fetchTableData, makeTableReserved }) => {
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchTableData();
  }, [fetchTableData]);

  const filteredData = search
    ? tableData.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      )
    : tableData;

  const updateSearch = (text) => {
    setSearch(text);
  };

  return (
    <View style={waiterStyles.sideBar}>
      <SearchBar
        containerStyle={waiterStyles.sideSearchEngine}
        inputContainerStyle={waiterStyles.sideSearchInputEngine}
        inputStyle={{ fontSize: 16 }}
        placeholder="Search..."
        onChangeText={updateSearch}
        value={search}
      />
      <ScrollView>
        {filteredData.map((table) => (
          <TouchableOpacity
            style={[
              waiterStyles.sideBarTables,
              table.isReserved && { backgroundColor: "red" },
            ]}
            key={table._id}
            onPress={() => {
              makeTableReserved(table._id);
            }}
          >
            <Text key={table._id}>{table.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
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
  makeTableReserved,
};

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
