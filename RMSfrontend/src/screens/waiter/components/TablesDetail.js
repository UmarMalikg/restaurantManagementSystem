import React, { useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import waiterStyles from "../styles/style";

import { connect } from "react-redux";
import {
  fetchTableData,
  makeTableAvailable,
} from "../../../redux/actions/tableActions";

const TablesDetail = ({
  fetchTableData,
  reservedTables,
  makeTableAvailable,
}) => {
  useEffect(() => {
    fetchTableData();
  }, [fetchTableData]);

  return (
    <View style={waiterStyles.tablesDetail}>
      <ScrollView>
        {reservedTables.map((table, index) => (
          <Text
            key={index}
            style={waiterStyles.borderDetailText}
            onPress={() => {
              makeTableAvailable(table._id);
            }}
          >
            {table.name}
          </Text>
        ))}
      </ScrollView>
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    reservedTables: state.tables.reservedTables,
  };
};

const mapDispatchToProps = {
  fetchTableData,
  makeTableAvailable,
};

export default connect(mapStateToProps, mapDispatchToProps)(TablesDetail);
