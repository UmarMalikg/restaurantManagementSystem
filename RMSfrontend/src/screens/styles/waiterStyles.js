import { StyleSheet } from "react-native";
import {
  isWeb,
  fullLightGreen,
  fullDarkgreen,
  darkGreen,
  lightGreen,
  darkBlueGreen,
  navBarHeight,
} from "../../constants/stylesConstants";
import defaultStyles from "../../defaultStyles";

const waiterStyles = StyleSheet.create({
  // styles for sideBar
  container: {
    flex: 1,
    color: "#fff",
  },
  // styles for Header
  header: [
    defaultStyles.navBar,
    { backgroundColor: "#35454d", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" },
  ],
  headerEmployeeAction: [defaultStyles.rowFlex],

  headerEmployeeInfo: [defaultStyles.rowCenteredFlex],
  headerEmployeeImgBox: {
    height: 50,
    width: 50,
    marginHorizontal: 12,
  },
  headerEmployeeImg: {
    height: 50,
    width: 50,
    borderRadius: 50,
  },
  headerEmployeeNameAndRole: {
    display: "flex",
    justifyContent: "center",
  },
  headerEmployeeName: {
    // marginBottom: 10,
  },
  headerEmployeeNameText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  headerEmployeeRole: {
    // marginTop: 10,
  },
  headerEmployeeRoleText: {
    fontSize: 16,
    color: "#fff",
  },

  // styles for sideBar
  tables: [defaultStyles.container],
  tableBox: {
    position: "absolute",
    top: navBarHeight + 10,
    width: isWeb ? "70%" : "100%",
    bottom: 10,
    backgroundColor: "#e5e8ec",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  cancelButtonPosition: {
    position: "absolute",
    right: 0,
    top: 0,
  },
  cancelButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "#999",
  },
  sideSearchEngine: {
    borderRadius: 20,
    backgroundColor: "#fff",
    margin: 7,
    border: 0,
    fontSize: 10,
  },
  sideSearchInputEngine: {
    backgroundColor: "#fff",
    height: 10,
  },
  sideBarTables: {
    flex: 1 / 2,
    backgroundColor: "#f3f3f3",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    borderRadius: 10,
    alignItems: "center",
    padding: 10,
    marginHorizontal: 10,
    marginVertical: 3,
  },

  // styles for sideBar
  orderPlacement: {
    position: "absolute",
    top: navBarHeight,
    bottom: 0,
    right: 0,
    width: 370,
    backgroundColor: "#F0EEFF",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  orderCalculationsBox: {
    // position: "absolute",
    // left: 0,
    // right: 0,
    // bottom: 10,
    // borderBottomLeftRadius: 20,
    // borderBottomRightRadius: 20,
    // backgroundColor: "#d00",
  },
  orderActionButtons: [defaultStyles.rowSpacingFlex, defaultStyles.pad10],
  orderButtons: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 5,
  },
  orderButtonsText: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#fff",
  },
  orderPlaceButton: {
    backgroundColor: "#3ea381",
  },
  orderCancelButton: {
    backgroundColor: "#fb6068",
  },
  orderDraftButton: {
    backgroundColor: "#ff0",
  },

  orderTotal: [
    defaultStyles.rowSpacingFlex,
    {
      marginHorizontal: 10,
      marginBottom: 15,
      borderTopWidth: 1,
      paddingTop: 7,
    },
  ],
  orderTotalDesText: {
    fontWeight: "bold",
    fontSize: 18,
  },
  orderTotalPriceText: {
    fontSize: 14,
    fontWeight: "bold",
  },

  orderCharges: {
    marginHorizontal: 10,
    marginVertical: 10,
    borderTopWidth: 1,
    paddingTop: 12.5,
    borderStyle: "dashed",
    // borderColor: "#fff",
  },
  singleOrderCharge: [defaultStyles.rowSpacingFlex],
  orderChargesDesText: {
    fontWeight: "bold",
    fontSize: 15,
  },
  orderChargesPriceText: {
    fontWeight: "bold",
    fontSize: 13,
  },

  orderLeftCircle: [defaultStyles.orderCircles, { left: -12.5 }],
  orderRightCircle: [defaultStyles.orderCircles, { right: -12.5 }],

  // styling for order menu
  orderMenuBox: {
    marginHorizontal: 15,
    // borderTopWidth: 1,
    // paddingTop: 10,
  },
  singleOrderMenuBox: [defaultStyles.rowFlex],
  orderMenuImgBox: {
    height: 50,
    width: 50,
  },
  orderMenuImg: {
    height: 50,
    width: 50,
    borderRadius: 50,
  },
  orderMenuDetailsAndActionsBox: [
    defaultStyles.rowSpacingFlex,
    {
      flex: 1,
      justifyContent: "space-between",
      borderBottomWidth: 1,
      paddingVertical: 10,
    },
  ],
  orderMenuDesBox: {
    marginLeft: 20,
  },
  orderMenuName: {},
  orderMenuNameText: {
    fontWeight: "bold",
    fontSize: 18,
  },
  orderMenuPrice: {},
  orderMenuPriceText: {
    fontSize: 15,
  },
  orderMenuQty: [defaultStyles.rowFlex],
  orderMenuQtyActionBox: {
    backgroundColor: "#004346",
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  orderMenuQtyActionText: { fontSize: 18, fontWeight: "bold", color: "#fff" },
  orderMenuQtyTextBox: { marginHorizontal: 10 },
  orderMenuQtyText: {},
  orderMenuActionBox: {},

  // styling for table selection

  orderSelectTableBox: { margin: 10, borderBottomWidth: 1, paddingBottom: 20 },
  orderSelectTable: {
    textAlign: "center",
    paddingVertical: 5,
    borderRadius: 30,
    backgroundColor: "#3ea381",
  },
  orderSelectTableText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "#fff",
  },

  // styles for HomeSection
  homeSection: {
    position: "absolute",
    top: 70,
    left: 0,
    bottom: 0,
    right: 370,
    backgroundColor: "#fff",
  },
  //catagories buttons styling
  category: {
    position: "absolute",
    top: 20,
    left: 0,
    right: 0,
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
  },
  categoryButtons: {
    borderRadius: 20,
    margin: 10,
    backgroundColor: "#777",
    fontWeight: "bold",
    paddingVertical: 7,
    paddingHorizontal: 15,
    fontSize: 16,
  },

  selectedCategoryButtons: {
    backgroundColor: "#0f0",
    borderColor: "#0f0",
    borderWidth: 2,
  },

  products: {
    position: "absolute",
    top: 100,
    left: 0,
    right: 0,
    bottom: 0,
  },
  product: {
    flex: 1, // Use flex: 1 to distribute width evenly
    aspectRatio: "auto", // To maintain a square aspect ratio
    marginVertical: 15,
    marginHorizontal: 15,
    backgroundColor: "#e5e5e5", // Example background color
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    shadowColor: "rgba(d, d, d, 0.5)", // Shadow color and opacity
    shadowOffset: {
      width: 5, // Horizontal offset
      height: 5, // Vertical offset
    },
    shadowRadius: 5,
    elevation: 2,
    borderRadius: 10,
  },
  productImage: [
    defaultStyles.rowCenteredFlex,
    {
      width: "100%",
    },
  ],
  productDetail: {},
  productDetail: {},

  productName: {
    fontWeight: "bold",
    fontSize: 18,
  },

  productDetailItem: {
    flex: 1,
    margin: 5,
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  qtyButtons: {
    marginHorizontal: 10,
    paddingHorizontal: 6,
    borderRadius: 2,
    backgroundColor: darkBlueGreen,
  },

  productCartButton: {
    margin: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: darkBlueGreen,
    borderRadius: 15,
  },
  colorWhite: {
    color: "white",
    fontWeight: "bold",
    fontSize: 17,
  },
  orders: {
    position: "absolute",
    top: 70,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },

  // styles for order page
  singleOrder: {
    backgroundColor: "#e5e8ec",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    marginVertical: 10,
    padding: 10,
  },
  allItems: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
  },
  singleItem: {
    backgroundColor: "#f3f3f3",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    width: 150,
    height: 220,
    borderRadius: 10,
    margin: 10,
    paddingHorizontal: 10,
  },
  orderedImage: {
    width: "60%",
    aspectRatio: 1 / 1,
    borderRadius: 40,
  },
});

export default waiterStyles;
