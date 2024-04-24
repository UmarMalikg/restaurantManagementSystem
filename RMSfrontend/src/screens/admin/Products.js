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
import { fetchProductData } from "../../redux/actions/productAction";
import { fetchCategoryData } from "../../redux/actions/categoryActions";
import { deleteProduct } from "../../redux/actions/productAction";

import SocketContext from "../../context/socketContext";
import { changeViaSocket } from "../../socketConfig/socketFunctions";

import Loader from "../Loader";
import ErrorPage from "../ErrorPage";
import AdminDeleteIcon from "../common/AdminDeleteIcon";
import AdminEditIcon from "../common/AdminEditIcon";

const Products = ({
  fetchProductData,
  productData,
  categoryData,
  fetchCategoryData,
  deleteProduct,
  isLoading,
  isError,
}) => {
  useEffect(() => {
    fetchProductData();
    fetchCategoryData();
  }, [fetchProductData, fetchCategoryData]);

  const navigation = useNavigation();
  const socket = useContext(SocketContext);
  const handleProductChanged = () => {
    fetchProductData(); // Wait for the data to be fetched
    console.log("Floor data fetched successfully");
  };
  const handleCategoryChanged = () => {
    fetchProductData(); // Wait for the data to be fetched
    console.log("Floor data fetched successfully");
  };
  useEffect(() => {
    changeViaSocket(socket, "productChanged", handleProductChanged);
    changeViaSocket(socket, "categoryChanged", handleCategoryChanged);
  }, [socket]);

  const [searchText, setSearchText] = useState("");
  const filteredProductData = productData.filter(
    (product) =>
      product.name.toLowerCase().includes(searchText.toLowerCase()) ||
      categoryData
        .find((category) => category._id === product.category)
        ?.name.toLowerCase()
        .includes(searchText.toLowerCase())
  );

  let serialNo = 1;

  const goToUpdate = (productId) => {
    navigation.navigate("Update Product", { productId });
  };

  const tableHead = ["Sr#No", "Image", "Name", "Category", "Price", "Actions"];
  const tableData = filteredProductData.map((product) => [
    serialNo++,
    <Image
      source={{
        uri: `${product.img}`,
      }}
      style={{ width: 50, height: 50, borderRadius: 50 }}
    />,
    product.name,
    categoryData.find((category) => category._id === product.category)?.name ||
      "N/A",
    product.price,
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
      }}
    >
      <Pressable onPress={() => deleteProduct(product._id)}>
        <AdminDeleteIcon />
      </Pressable>
      <Pressable
        onPress={() => {
          goToUpdate(product._id);
        }}
      >
        <AdminEditIcon />
      </Pressable>
    </View>,
  ]);

  const widthArr = [80, 120, 270, 240, 200, 120];

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
          <Text style={adminStyles.dataTitle}>All Menus</Text>
        </View>
        <Pressable
          onPress={() => navigation.navigate("Add Product")}
          style={adminStyles.goToModelButton}
        >
          <Text style={adminStyles.goToModelButtonText}>Add Product</Text>
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
    productData: state.products.productData,
    categoryData: state.categories.categoryData,
    isLoading: state.loadingErrors.isLoading,
    isError: state.loadingErrors.isError,
  };
};

const mapDispatchToProps = {
  fetchProductData,
  fetchCategoryData,
  deleteProduct,
};
export default connect(mapStateToProps, mapDispatchToProps)(Products);
