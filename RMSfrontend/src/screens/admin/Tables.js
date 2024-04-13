import { View, Text, TextInput, Pressable, ScrollView } from "react-native";
import React, { useEffect, useState, useContext } from "react";
import adminStyles from "../styles/adminStyles";
import { useNavigation } from "@react-navigation/native";
import { connect } from "react-redux";
import defaultStyles from "../../defaultStyles";
import { fetchTableData, deleteTable } from "../../redux/actions/tableActions";
import { fetchFloorData } from "../../redux/actions/floorActions";

import SocketContext from "../../context/socketContext";
import { changeViaSocket } from "../../socketConfig/socketFunctions";

import Loader from "../Loader";
import ErrorPage from "../ErrorPage";

const Tables = ({
  fetchTableData,
  tableData,
  fetchFloorData,
  floorData,
  deleteTable,
  isLoading,
  isError,
}) => {
  useEffect(() => {
    fetchTableData();
    fetchFloorData();
  }, [fetchTableData, fetchFloorData]);
  const navigation = useNavigation();
  const socket = useContext(SocketContext);
  const handleTableChanged = () => {
    fetchTableData(); // Wait for the data to be fetched
    console.log("Floor data fetched successfully");
  };
  const handleFloorChanged = () => {
    fetchFloorData(); // Wait for the data to be fetched
    console.log("Floor data fetched successfully");
  };
  useEffect(() => {
    changeViaSocket(socket, "productChanged", handleTableChanged);
    changeViaSocket(socket, "categoryChanged", handleFloorChanged);
  }, [socket]);

  const [searchText, setSearchText] = useState("");

  const filteredTables = tableData.filter(
    (table) =>
      table &&
      table.name &&
      table.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const goToUpdate = (tableId) => {
    navigation.navigate("Update Table", { tableId });
  };
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
          <Text style={adminStyles.dataTitle}>All Tables</Text>
        </View>
        <Pressable
          onPress={() => navigation.navigate("Add Table")}
          style={adminStyles.goToModelButton}
        >
          <Text style={adminStyles.goToModelButtonText}>Add Tables</Text>
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
        <View style={adminStyles.catTabPosition}>
          {filteredTables?.map((table) => {
            const floor = floorData.find((floor) => floor._id === table.floor);
            return (
              <View style={adminStyles.catTabBox} key={table._id}>
                <View>
                  <View>
                    <Text style={[defaultStyles.fWB, defaultStyles.fs16]}>
                      {table.name}
                    </Text>
                  </View>
                  <View>
                    <View>
                      <Text style={[defaultStyles.fWB, defaultStyles.fs20]}>
                        {floor ? floor.name : "NA"}
                      </Text>
                    </View>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "flex-end",
                      }}
                    >
                      <Pressable
                        onPress={() => {
                          goToUpdate(table._id);
                        }}
                      >
                        <Text>edit</Text>
                      </Pressable>
                      <Pressable onPress={() => deleteTable(table._id)}>
                        <Text>delete</Text>
                      </Pressable>
                    </View>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    tableData: state.tables.tableData,
    floorData: state.floors.floorData,
    isLoading: state.loadingErrors.isLoading,
    isError: state.loadingErrors.isError,
  };
};

const mapDispatchToProps = {
  fetchTableData,
  fetchFloorData,
  deleteTable,
};
export default connect(mapStateToProps, mapDispatchToProps)(Tables);
