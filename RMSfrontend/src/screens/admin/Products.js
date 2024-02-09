import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import adminStyles from "./styles/style";
import { useNavigation } from "@react-navigation/native";
import { Table, Row } from "react-native-table-component";
import { connect } from "react-redux";
import { fetchProductData } from "../../redux/actions/productAction";
import { fetchCategoryData } from "../../redux/actions/categoryActions";
import { deleteProduct } from "../../redux/actions/productAction";

const Products = ({
  fetchProductData,
  productData,
  categoryData,
  fetchCategoryData,
  deleteProduct,
}) => {
  useEffect(() => {
    fetchProductData();
    fetchCategoryData();
  }, [fetchProductData, fetchCategoryData]);

  const navigation = useNavigation();

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

  const tableHead = ["Sr#No", "Image", "Name", "Category", "Price", "Actions"];
  const tableData = filteredProductData.map((product) => [
    serialNo++,
    <Image
      source={{
        uri: `http://localhost:8080/${product.img.replace(/\\/g, "/")}`,
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
      <TouchableOpacity onPress={() => deleteProduct(product._id)}>
        <Text>delete</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text>edit</Text>
      </TouchableOpacity>
    </View>,
  ]);

  const widthArr = [80, 120, 220, 180, 120, 120];

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
          <Text style={adminStyles.dataTitle}>All Menus</Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate("Add Product")}
          style={adminStyles.goToModelButton}
        >
          <Text style={adminStyles.goToModelButtonText}>Add Product</Text>
        </TouchableOpacity>
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
  };
};

const mapDispatchToProps = {
  fetchProductData,
  fetchCategoryData,
  deleteProduct,
};
export default connect(mapStateToProps, mapDispatchToProps)(Products);
