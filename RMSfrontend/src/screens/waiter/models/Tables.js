import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import waiterStyles from "../styles/style";
import { useNavigation } from "@react-navigation/native";
import { SearchBar } from "react-native-elements";

import { connect } from "react-redux";
import { fetchTableData } from "../../../redux/actions/tableActions";

import { useAppContext } from "../../../context/States";

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
    navigation.navigate("Home");
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
};

export default connect(mapStateToProps, mapDispatchToProps)(Tables);
