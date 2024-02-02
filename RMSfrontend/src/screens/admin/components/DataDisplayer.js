import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import adminStyles from "../styles/style";
import { useNavigation } from "@react-navigation/native";
import { Table, Row, Rows } from "react-native-table-component";

const DataDisplayer = ({
  dataTitle,
  modelLink,
  modelButtonText,
  widthArr,
  tableHead,
  tableData,
}) => {
  const navigation = useNavigation();
  return (
    <View style={adminStyles.theScreen}>
      <View style={adminStyles.dataViewerHeader}>
        <View>
          <Text style={adminStyles.dataTitle}>{dataTitle}</Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate(`${modelLink}`)}
          style={adminStyles.goToModelButton}
        >
          <Text style={adminStyles.goToModelButtonText}>{modelButtonText}</Text>
        </TouchableOpacity>
      </View>
      <View style={adminStyles.tablePosition}>
        <Table borderStyle={adminStyles.tableBorderStyle}>
          <Row
            widthArr={`${widthArr}`}
            data={`${tableHead}`}
            style={adminStyles.tableHead}
            textStyle={adminStyles.tableHeadText}
          />
          <Rows
            widthArr={`${widthArr}`}
            data={`${tableData}`}
            textStyle={adminStyles.tableDataText}
          />
        </Table>
      </View>
    </View>
  );
};

export default DataDisplayer;
