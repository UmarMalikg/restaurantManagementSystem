import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Pressable, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SearchBar } from "react-native-elements";

import { connect } from "react-redux";
import { fetchTableData } from "../../redux/actions/tableActions";
let isWeb = Platform.OS === "web";

// setSelectedTable

const Tables = ({ tableData, fetchTableData }) => {
  const [search, setSearch] = useState("");

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

  return (
    <View>
      <View>
        <View></View>

        <View style={{ marginTop: 45 }}>
          <SearchBar
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
                  gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr 1fr",
                  padding: 20,
                }),
              }}
            >
              {filteredData.map((table) => (
                <Pressable
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
